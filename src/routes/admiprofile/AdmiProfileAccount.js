import React, { Fragment, useState } from "react";
import {
  CCollapse,
  CButton,
  CCard,
  CCardBody,
  // CCardTitle,
} from "@coreui/react";
// import IntlMessages from "Util/IntlMessages";
import {
  Row,
  Card,
  //   FormLabel,
  //   FormControl,
  CardBody,
  Input,
  // CardTitle,
  FormGroup,
  Label,
  //   CustomInput,
  Button,
  //   Table,
  //   FormText,
  Form,
  Col,
  //   Modal,
  //   ModalHeader,
  //   ModalBody,
  //   ModalFooter,
  //   CardSubtitle,
} from "reactstrap";
// import "antd/dist/antd.css";
import { Upload, message } from "antd";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phonenumber: Yup.string().required("Required"),
  company: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const SchemaTow = Yup.object().shape({
  oldpassword: Yup.string().required("This field is required"),
  newpassword: Yup.string().required("This field is required"),
  confirmpassword: Yup.string().when("newpassword", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("newpassword")],
      "newpassword and confirm password must match"
    ),
  }),
});

// const SchemaThree = Yup.object().shape({
//   file: Yup.mixed().required(),

// });

const props = {
  headers: {
    authorization: "authorization-text",
  },
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  name: "file",
};

export default function AdmiProfileAccount(props) {
  const [visible, setVisible] = useState(false);
  const [Changevisible, setChangeVisible] = useState(false);
  const [Avatarvisible, setAvatarVisible] = useState(false);

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
              <div class="text-center img-div">
                <img
                  src="/assets/img/userprofile.png"
                  class="rounded-img"
                  alt="..."
                />
              </div>
              <br />
              <br />

              <div>
                <CButton
                  onClick={() => setVisible(!visible)}
                  style={{ width: "100%" }}
                  className="collapse-div"
                >
                  <i className="iconsmind-Edit"></i>
                  Edit
                </CButton>

                <CCollapse visible={visible}>
                  <CCard className="mt-3">
                    <CCardBody>
                      <Formik
                        initialValues={{
                          firstname: "",
                          lastname: "",
                          phonenumber: "",
                          company: "",
                        }}
                        validationSchema={schema}
                        onSubmit={(values) => {
                          console.log(values);
                        }}
                      >
                        {({
                          handleSubmit,
                          handleChange,
                          values,
                          touched,
                          errors,
                        }) => (
                          <Form noValidate onSubmit={handleSubmit}>
                            <FormGroup row>
                              <Col md={6} sm={6} col={12}>
                                <Label>First Name</Label>
                                <Input
                                  type="text"
                                  name="firstname"
                                  value={values.firstname}
                                  onChange={handleChange}
                                />
                                {errors.firstname && touched.firstname ? (
                                  <div className="form-err">
                                    {errors.firstname} *
                                  </div>
                                ) : null}
                              </Col>

                              <Col md={6} sm={6} col={12}>
                                <Label>Last Name</Label>
                                <Input
                                  type="text"
                                  name="lastname"
                                  value={values.lastname}
                                  onChange={handleChange}
                                />
                                {errors.lastname && touched.lastname ? (
                                  <div className="form-err">
                                    {errors.lastname} *
                                  </div>
                                ) : null}
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md={6} sm={6} col={12}>
                                <Label>Phone Number</Label>
                                <Input
                                  type="number"
                                  name="phonenumber"
                                  value={values.phonenumber}
                                  onChange={handleChange}
                                />
                                {errors.phonenumber && touched.phonenumber ? (
                                  <div className="form-err">
                                    {errors.phonenumber} *
                                  </div>
                                ) : null}
                              </Col>
                              <Col md={6} sm={6} col={12}>
                                <Label>Company</Label>
                                <Input
                                  type="text"
                                  name="company"
                                  value={values.company}
                                  onChange={handleChange}
                                />
                                {errors.company && touched.company ? (
                                  <div className="form-err">
                                    {errors.company} *
                                  </div>
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
                                  <option value="1">Male</option>
                                  <option value="2">Female</option>
                                </select>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Col md={12} sm={12} col={12}>
                                <div className="comoany-text">
                                  <Button
                                    type="submit"
                                    className="new_btn"
                                    outline
                                  >
                                    Update
                                  </Button>
                                </div>
                              </Col>
                            </FormGroup>
                          </Form>
                        )}
                      </Formik>
                    </CCardBody>
                  </CCard>
                </CCollapse>

                <CButton
                  onClick={() => setChangeVisible(!Changevisible)}
                  style={{ width: "100%" }}
                  className="collapse-div"
                >
                  <i className="iconsmind-Mail-Password"></i>
                  Change Password
                </CButton>
                <CCollapse visible={Changevisible}>
                  <CCard className="mt-3">
                    <CCardBody>
                      <Formik
                        initialValues={{
                          oldpassword: "",
                          newpassword: "",
                          confirmpassword: "",
                        }}
                        validationSchema={SchemaTow}
                        onSubmit={() => {}}
                      >
                        {({
                          values,
                          errors,
                          handleSubmit,
                          handleChange,
                          handleBlur,
                          touched,
                        }) => {
                          return (
                            <Form onSubmit={handleSubmit}>
                              <FormGroup row>
                                <Col md={6} sm={6} col={12}>
                                  <Label>Old Password</Label>
                                  <Input
                                    type="password"
                                    name="oldpassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.oldpassword}
                                  />
                                  {errors.oldpassword && touched.oldpassword ? (
                                    <div className="form-err">
                                      {errors.oldpassword} *
                                    </div>
                                  ) : null}
                                </Col>
                                <Col md={6} sm={6} col={12}>
                                  <Label>New Password</Label>
                                  <Input
                                    type="password"
                                    name="newpassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.newpassword}
                                  />
                                  {errors.newpassword && touched.newpassword ? (
                                    <div className="form-err">
                                      {errors.newpassword} *
                                    </div>
                                  ) : null}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col md={6} sm={6} col={12}>
                                  <Label>Confirm Password</Label>
                                  <Input
                                    type="password"
                                    name="confirmpassword"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.confirmpassword}
                                  />
                                  {errors.confirmpassword &&
                                  touched.confirmpassword ? (
                                    <div className="form-err">
                                      {errors.confirmpassword} *
                                    </div>
                                  ) : null}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col md={12} sm={12} col={12}>
                                  <div className="comoany-text">
                                    <Button
                                      type="submit"
                                      className="new_btn"
                                      outline
                                    >
                                      Change Password
                                    </Button>
                                  </div>
                                </Col>
                              </FormGroup>
                            </Form>
                          );
                        }}
                      </Formik>
                    </CCardBody>
                  </CCard>
                </CCollapse>
              </div>

              <div>
                <CButton
                  onClick={() => setAvatarVisible(!Avatarvisible)}
                  style={{ width: "100%" }}
                  className="collapse-div"
                >
                  <i className="iconsmind-Mp3-File"></i>
                  Avater
                </CButton>
                <CCollapse visible={Avatarvisible}>
                  <CCard className="mt-3">
                    <CCardBody>
                      {/* <Formik
                        initialValues={{
                          file: null,
                        }}
                        validationSchema={SchemaThree}
                        onSubmit={(values) => {
                          console.log(values)
                        }}
                      >
                        {({
                          setFieldValue,
                          handleSubmit,
                          values,
                        }) => {
                          return (
                       <Form onSubmit={handleSubmit}>
                       <FormGroup row>
                                <Col md={6} sm={6} col={12}>
                                  <Label>Change Avatar</Label>
                                  <div className="input-div-file">
                                  <Input
                                    type="file"
                                    name="file"
                                    onChange={(event)=>{
                                      setFieldValue("file", event.target.files[0])
                                    }}
                                  />
                                  </div>
                                  <div>file={values.file}</div>
                                   {errors.confirmpassword && touched.confirmpassword ? (
                                  <div className="form-err">
                                    {errors.confirmpassword} *
                                  </div>
                                ) : null}
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col md={12} sm={12} col={12}>
                                  <div className="comoany-text">
                                    <Button type="submit" className="new_btn" outline>
                                      Update Avatar
                                    </Button>
                                  </div>
                                </Col>
                              </FormGroup>
                              </Form>
                          );
                        }}
                      </Formik> */}

                      <div
                        style={{
                          display: "block",
                          width: 700,
                          padding: 30,
                        }}
                      >
                        <h4>ReactJS Ant-Design Upload Component</h4>
                        <Fragment>
                          <Upload
                            {...props}
                            onChange={(response) => {
                              if (response.file.status !== "uploading") {
                                console.log(response.file, response.fileList);
                              }
                              if (response.file.status === "done") {
                                message.success(`${response.file.name} 
                               file uploaded successfully`);
                              } else if (response.file.status === "error") {
                                message.error(`${response.file.name} 
                             file upload failed.`);
                              }
                            }}
                          >
                            <Button>Upload File</Button>
                          </Upload>
                        </Fragment>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCollapse>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </Fragment>
  );
}
