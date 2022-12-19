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
  companyname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("company name is Required"),
  mass: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required(" massage is Required"),
  contactnumber: Yup.string().required("PhoneNumber is Required"),
  category: Yup.string().required(" category is  Required"),
  subcategory: Yup.string().required(" subcategory is Required"),
  systemrating: Yup.string().required(" systemrating is Required"),
});

function Companydetails(props) {
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
                <IntlMessages id="Add Product Details" />
              </CardTitle>

              <Formik
                initialValues={{
                  companyname: "",
                  contactnumber: "",
                  category: "",
                  subcategory: "",
                  systemrating: "",
                  mass: "",
                }}
                validationSchema={schema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                  <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <Label>Product Name</Label>
                        <Input
                          type="text"
                          name="companyname"
                          value={values.companyname}
                          onChange={handleChange}
                        />
                        {errors.companyname && touched.companyname ? (
                          <div className="form-err">{errors.companyname} *</div>
                        ) : null}
                      </Col>
                      <Col md={6} sm={6} col={12}>
                        <Label>Contact Number</Label>
                        <Input
                          type="number"
                          name="contactnumber"
                          value={values.contactnumber}
                          onChange={handleChange}
                        />
                        {errors.contactnumber && touched.contactnumber ? (
                          <div className="form-err">
                            {errors.contactnumber} *
                          </div>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={12} sm={12} col={12} lg={12}>
                        <div className="select-text">
                          <Label> Category</Label>
                        </div>
                        <select className="new-control-form" name="category">
                          <option>select</option>
                          <option value="1">Advertising and marketing</option>
                          <option value="2">Aerospace</option>
                          <option value="3">Agriculture</option>
                          <option value="4"> Computer and technology</option>
                          <option value="5">Construction</option>
                          <option value="6">Education</option>
                        </select>
                        {errors.category && touched.category ? (
                          <div className="form-err">{errors.category} *</div>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <div>
                          <Label>Sub Category</Label>
                        </div>
                        <select className="new-control-form" name="subcategory">
                          <option>select</option>
                          <option value="1">Advertising and marketing</option>
                          <option value="2">Aerospace</option>
                          <option value="3">Agriculture</option>
                          <option value="4"> Computer and technology</option>
                          <option value="5">Construction</option>
                          <option value="6">Education</option>
                        </select>
                        {errors.subcategory && touched.subcategory ? (
                          <div className="form-err">{errors.subcategory} *</div>
                        ) : null}
                      </Col>
                      <Col md={6} sm={6} col={12}>
                        <Label>System Rating</Label>
                        <Input
                          type="text"
                          name="systemrating"
                          value={values.systemrating}
                          onChange={handleChange}
                        />
                        {errors.systemrating && touched.systemrating ? (
                          <div className="form-err">
                            {errors.systemrating} *
                          </div>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <Label>Product Desc</Label>
                        <Input type="textarea" rows="4" name="mass" />
                        {errors.mass && touched.mass ? (
                          <div className="form-err">{errors.mass} *</div>
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
export default Companydetails;
