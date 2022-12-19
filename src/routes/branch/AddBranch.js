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
  cafename: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  branchType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  branchPhoneNumber: Yup.string().required("Required"),
  branchemail: Yup.string().email("Invalid email").required("Required"),
  country: Yup.string().required("Required"),
  dist: Yup.string().required("Required"),
  block: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});

function BranchDetaliAdd(props) {
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
                <IntlMessages id="menu.Add Branch Details" />
              </CardTitle>

              <Formik
                initialValues={{
                  cafename: "",
                  branchType: "",
                  branchPhoneNumber: "",
                  branchemail: "",
                  country: "",
                  address: "",
                  dist: "",
                  block: "",
                  pincode: "",
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
                        <Label>Cafe Name</Label>
                        <Input
                          type="text"
                          name="cafename"
                          value={values.cafename}
                          onChange={handleChange}
                        />
                        {errors.cafename && touched.cafename ? (
                          <div className="form-err">{errors.cafename} *</div>
                        ) : null}
                      </Col>

                      <Col md={6} sm={6} col={12}>
                        <Label>Branch Phone Number</Label>
                        <Input
                          type="number"
                          name="branchPhoneNumber"
                          value={values.branchPhoneNumber}
                          onChange={handleChange}
                        />
                        {errors.branchPhoneNumber &&
                        touched.branchPhoneNumber ? (
                          <div className="form-err">
                            {errors.branchPhoneNumber} *
                          </div>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <Label>Branch Email</Label>
                        <Input
                          type="email"
                          name="branchemail"
                          value={values.branchemail}
                          onChange={handleChange}
                        />
                        {errors.branchemail && touched.branchemail ? (
                          <div className="form-err">{errors.branchemail} *</div>
                        ) : null}
                      </Col>
                      <Col md={6} sm={6} col={12}>
                        <Label>Branch Type</Label>
                        <Input
                          type="text"
                          name="branchType"
                          value={values.branchType}
                          onChange={handleChange}
                        />
                        {errors.branchType && touched.branchType ? (
                          <div className="form-err">{errors.branchType} *</div>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <div>
                          <Label>State</Label>
                        </div>
                        <select className="new-control-form">
                          <option>select</option>
                          <option value="1">Advertising and marketing</option>
                          <option value="2">Aerospace</option>
                          <option value="3">Agriculture</option>
                          <option value="4"> Computer and technology</option>
                          <option value="5">Construction</option>
                          <option value="6">Education</option>
                        </select>
                      </Col>
                      <Col md={6} sm={6} col={12}>
                        <Label>Country</Label>
                        <Input
                          type="text"
                          name="country"
                          value={values.country}
                          onChange={handleChange}
                        />
                        {errors.country && touched.country ? (
                          <div className="form-err">{errors.country} *</div>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <Label>Dist</Label>
                        <Input
                          type="text"
                          name="dist"
                          value={values.dist}
                          onChange={handleChange}
                        />
                        {errors.dist && touched.dist ? (
                          <div className="form-err">{errors.dist} *</div>
                        ) : null}
                      </Col>
                      <Col md={6} sm={6} col={12}>
                        <Label>Block</Label>
                        <Input
                          type="text"
                          name="block"
                          value={values.block}
                          onChange={handleChange}
                        />
                        {errors.block && touched.block ? (
                          <div className="form-err">{errors.block} *</div>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col md={6} sm={6} col={12}>
                        <Label>Pincode</Label>
                        <Input
                          type="number"
                          name="pincode"
                          value={values.pincode}
                          onChange={handleChange}
                        />
                        {errors.pincode && touched.pincode ? (
                          <div className="form-err">{errors.pincode} *</div>
                        ) : null}
                      </Col>
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
export default BranchDetaliAdd;
