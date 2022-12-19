import React, { useState, Fragment } from "react";
import Select from "react-select";
import {
  Row,
  // Card,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Input,
  // CardBody,
  Label,
} from "reactstrap";
import CustomSelectInput from "Components/CustomSelectInput";
// import ReactTable from "react-table";
// import DataTablePagination from "Components/DataTables/pagination";

import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import IntlMessages from "Util/IntlMessages";

import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
// import Pagination from "Components/List/Pagination";
// import productcategory from "Data/productcategory.json";
// npm i react-table@7.0.0-alpha.2



import styled from 'styled-components'
import matchSorter from 'match-sorter'
import makeData from './makeData'





const Styles = styled.div`

  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(globalFilter)
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <span>
      Search:{' '}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: '1.1rem',
          border: '0',
        }}
      />
    </span>
  )
}

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}





function SliderColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the min and max
  // using the preFilteredRows

  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={filterValue || min}
        onChange={e => {
          setFilter(parseInt(e.target.value, 10))
        }}
      />
      <button onClick={() => setFilter(undefined)}>Off</button>
    </div>
  )
}

function NumberRangeColumnFilter({
  column: { filterValue = [], preFilteredRows, setFilter, id },
}) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0
    preFilteredRows.forEach(row => {
      min = Math.min(row.values[id], min)
      max = Math.max(row.values[id], max)
    })
    return [min, max]
  }, [id, preFilteredRows])

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <input
        value={filterValue[0] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]])
        }}
        placeholder={`Min (${min})`}
        style={{
          width: '70px',
          marginRight: '0.5rem',
        }}
      />
      to
      <input
        value={filterValue[1] || ''}
        type="number"
        onChange={e => {
          const val = e.target.value
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined])
        }}
        placeholder={`Max (${max})`}
        style={{
          width: '70px',
          marginLeft: '0.5rem',
        }}
      />
    </div>
  )
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = val => !val

// Our table component
function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  )

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10)

  return (
    <Fragment>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: 'left',
              }}
            >
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </Fragment>
  )
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

filterGreaterThan.autoRemove = val => typeof val !== 'number'

function Companydetails(props) {
  // const categoryTableData = productcategory.categoryData;
  const data = React.useMemo(() => makeData(100000), [])
  // const dataTableColumns = [
  //   {
  //     Header: "CategoryName",
  //     accessor: "categoryname",
  //     // Cell: props => <p className="list-item-heading">{props.value}</p>
  //   },
  //   {
  //     Header: "CategoryType",
  //     accessor: "categorytype",
  //     // Cell: props => <p className="text-muted">{props.value}</p>
  //   },
  //   {
  //     Header: "Status",
  //     accessor: "status",
  //     // Cell: props => <p className="text-muted">{props.value}</p>
  //   },
  //   {
  //     Header: "UpdateCategory",
  //     accessor: "updatecategory",
  //     // Cell: props => <p className="text-muted">{props.value}</p>
  //   }
  // ];



  const [isActive, setActive] = useState(false);

  const [dropdownSplitOpen, setdropdownSplitOpen] = useState(false);

  // const [handleChangeSelectAlls , sethandleChangeSelectAlls] = useState(false)

  const toggleModal = () => {
    setActive(!isActive);
  };

  const toggleSplit = (prevState) => {
    setdropdownSplitOpen(!prevState.dropdownSplitOpen);
  };

  // const handleCheckChange = (event, id) => {
  //   if (
  //     event.target.tagName == "A" ||
  //     (event.target.parentElement &&
  //       event.target.parentElement.tagName == "A")
  //   ) {
  //     return true;
  //   }
  //   if (this.state.lastChecked == null) {
  //     this.setState({
  //       lastChecked: id
  //     });
  //   }

  //   let selectedItems = this.state.selectedItems;
  //   if (selectedItems.includes(id)) {
  //     selectedItems = selectedItems.filter(x => x !== id);
  //   } else {
  //     selectedItems.push(id);
  //   }
  //   this.setState({
  //     selectedItems
  //   });

  //   if (event.shiftKey) {
  //     var items = this.state.items;
  //     var start = this.getIndex(id, items, "id");
  //     var end = this.getIndex(this.state.lastChecked, items, "id");
  //     items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
  //     selectedItems.push(
  //       ...items.map(item => {
  //         return item.id;
  //       })
  //     );
  //     selectedItems = Array.from(new Set(selectedItems));
  //     this.setState({
  //       selectedItems
  //     });
  //   }
  //   document.activeElement.blur();
  // }
  // const handleChangeSelectAll = (isToggle) => {
  //   if (handleChangeSelectAlls.length >= items.length) {
  //     if (isToggle) {
  //       sethandleChangeSelectAlls(
  //         handleChangeSelectAlls=[]
  //       );
  //     }
  //   } else {
  //     sethandleChangeSelectAlls(
  //       selectedItems = items.map(x => x.id)
  //     );
  //   }
  //   // document.activeElement.blur();
  //   // return false;
  // }
  
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            // Use our custom `fuzzyText` filter on this column
            filter: 'fuzzyText',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            Filter: SliderColumnFilter,
            filter: 'equals',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            Filter: NumberRangeColumnFilter,
            filter: 'between',
          },
          {
            Header: 'Status',
            accessor: 'status',
            Filter: SelectColumnFilter,
            filter: 'includes',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
            Filter: SliderColumnFilter,
            filter: filterGreaterThan,
          },
        ],
      },
    ],
    []
  )

 // const data = React.useMemo(() => makeData(100000), [])

  return (
    <Fragment>
      <Row>
        <Colxx xxs="12">
          <h1>
            <IntlMessages id="menu.product-list" />
          </h1>
          <div className="float-sm-right">
            <Button
              color="primary"
              size="lg"
              className="top-right-button"
              onClick={toggleModal}
            >
              <IntlMessages id="layouts.add-new" />
            </Button>
            {/* {"  "} */}

            <Modal
              isOpen={isActive}
              toggle={toggleModal}
              wrapClassName="modal-right"
              backdrop="static"
            >
              <ModalHeader toggle={toggleModal}>
                <IntlMessages id="layouts.add-new-modal-title" />
              </ModalHeader>
              <ModalBody>
                <Label>
                  <IntlMessages id="layouts.product-name" />
                </Label>
                <Input />
                <Label className="mt-4">
                  <IntlMessages id="layouts.category" />
                </Label>
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name"
                  // options={this.state.categories}
                />
                <Label className="mt-4">
                  <IntlMessages id="layouts.description" />
                </Label>
                <Input type="textarea" name="text" id="exampleText" />
                <Label className="mt-4">
                  <IntlMessages id="layouts.status" />
                </Label>
                <CustomInput
                  type="radio"
                  id="exCustomRadio"
                  name="customRadio"
                  label="ON HOLD"
                />
                <CustomInput
                  type="radio"
                  id="exCustomRadio2"
                  name="customRadio"
                  label="PROCESSED"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" outline onClick={toggleModal}>
                  <IntlMessages id="layouts.cancel" />
                </Button>
                <Button color="primary" onClick={toggleModal}>
                  <IntlMessages id="layouts.submit" />
                </Button>{" "}
              </ModalFooter>
            </Modal>
            <ButtonDropdown isOpen={dropdownSplitOpen} toggle={toggleSplit}>
              <div className="btn btn-primary pl-4 pr-0 check-button">
                <Label
                  for="checkAll"
                  className="custom-control custom-checkbox mb-0 d-inline-block"
                >
                  <Input
                    className="custom-control-input"
                    type="checkbox"
                    id="checkAll"
                  />
                  <span
                    className={`custom-control-label`}
                    //  ${
                    //   this.state.selectedItems.length > 0 &&
                    //   this.state.selectedItems.length <
                    //     this.state.items.length
                    //     ? "indeterminate"
                    //     : ""
                    // }
                  />
                </Label>
              </div>
              <DropdownToggle
                caret
                color="primary"
                className="dropdown-toggle-split pl-2 pr-2"
              />
              <DropdownMenu right>
                <DropdownItem>
                  <IntlMessages id="layouts.delete" />
                </DropdownItem>
                <DropdownItem>
                  <IntlMessages id="layouts.another-action" />
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <BreadcrumbContainer
            // heading={<IntlMessages id="AddBranches" />}
            match={props.match}
          />
          <Separator className="mb-5" />
        </Colxx>
      </Row>

      {/* <Row>
      <Colxx lg="12" xl="12" className="mb-4">
            <Card>
              <CardBody>
                <ReactTable
                  defaultPageSize={6}
                  data={categoryTableData}
                  columns={dataTableColumns}
                  minRows={0}
                  PaginationComponent={DataTablePagination}
                />
              </CardBody>
            </Card>
          </Colxx>
      </Row>
 */}

<Styles>
      <Table columns={columns} data={data} />
    </Styles>
    </Fragment>
  );
}
export default Companydetails;
