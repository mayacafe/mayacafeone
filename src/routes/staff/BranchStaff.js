import React, { Fragment } from "react";
import {
  Row,
  Card,
  CardBody,
  Input,
  CardTitle,
  FormGroup,
  Label,
  Button,
  Form,
  Col,
} from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("UserName is Required"),
  accessType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required(" AccessType is Required"),
  PhoneNumber: Yup.string().required("PhoneNumber is Required"),
  role: Yup.string().required("Role is  Required"),
  parmanentAddress: Yup.string().required(" Parmanent Address is Required"),
  address: Yup.string().required(" Address is Required"),
});
export default function StaffBranch(props) {
  return (
    <Fragment>
      <Row>
        <Colxx xxs="12">
          <BreadcrumbContainer match={props.match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row className="mb-4">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <CardTitle>
                <IntlMessages id="Add Branch Staff Details" />
              </CardTitle>

              <Formik
                initialValues={{
                  username: "",
                  accessType: "",
                  PhoneNumber: "",
                  role: "",
                  address: "",
                  parmanentAddress: "",
                }}
                validationSchema={schema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <Label>User Name</Label>
                        <Input
                          type="text"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                        />
                        {errors.username && touched.username ? (
                          <div className="form-err">{errors.username} *</div>
                        ) : null}
                      </Col>

                      <Col md={6} sm={6} col={12}>
                        <Label> Phone Number</Label>
                        <Input
                          type="number"
                          name="PhoneNumber"
                          value={values.PhoneNumber}
                          onChange={handleChange}
                        />
                        {errors.PhoneNumber && touched.PhoneNumber ? (
                          <div className="form-err">{errors.PhoneNumber} *</div>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <Label>Address</Label>
                        <Input
                          type="text"
                          name="address"
                          value={values.address}
                          onChange={handleChange}
                        />
                        {errors.address && touched.address ? (
                          <div className="form-err">{errors.address} *</div>
                        ) : null}
                      </Col>
                      <Col md={6} sm={6} col={12}>
                        <Label>Parmanent Address</Label>
                        <Input
                          type="text"
                          name="parmanentAddress"
                          value={values.parmanentAddress}
                          onChange={handleChange}
                        />
                        {errors.parmanentAddress && touched.parmanentAddress ? (
                          <div className="form-err">
                            {errors.parmanentAddress} *
                          </div>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <Label>Role</Label>
                        <select className="new-control-form" name="role">
                      <option>select</option>
                      <option value="1">Advertising and marketing</option>
                      <option value="2">Aerospace</option>
                      <option value="3">Agriculture</option>
                      <option value="4"> Computer and technology</option>
                      <option value="5">Construction</option>
                      <option value="6">Education</option>
                    </select>
                        {errors.role && touched.role ? (
                          <div className="form-err">{errors.role} *</div>
                        ) : null}
                      </Col>
                      <Col md={6} sm={6} col={12}>
                        <Label>Access Type</Label>
                        <select className="new-control-form" name="accessType">
                      <option>select</option>
                      <option value="1">Advertising and marketing</option>
                      <option value="2">Aerospace</option>
                      <option value="3">Agriculture</option>
                      <option value="4"> Computer and technology</option>
                      <option value="5">Construction</option>
                      <option value="6">Education</option>
                    </select>
                        {errors.accessType && touched.accessType ? (
                          <div className="form-err">{errors.accessType} *</div>
                        ) : null}
                      </Col>
                    </FormGroup>
                    

                    <FormGroup row>
                      <Col md={12} sm={12} col={12}>
                        <div className="comoany-text">
                          <Button type="submit" className="new_btn" outline>
                            Add
                          </Button>
                        </div>
                      </Col>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </Fragment>
  );
}
