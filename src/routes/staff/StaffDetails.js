import React, { Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Col } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";

export default function StaffDetails(props) {
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
                <IntlMessages id=" Staff Details" />
              </CardTitle>
              <div className="details-div">
                <Row>
                  <Col xs={12} sm={6} md={6} lg={4}>
                    <div className="detail-t1 detail ">
                      <ul>
                        <li>User Name</li>
                        <li>Phone Number</li>
                        <li>Address</li>
                        <li>Parmanent Address</li>
                        <li>Role</li>
                        <li>Access Type</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={4}>
                    <div className="detail-t1">
                      <ul>
                        <li>Siyakamlesh</li>
                        <li>8574254875</li>
                        <li>Indore Madhya Pradesh</li>
                        <li>Devas Madhya Pradesh</li>
                        <li>BranchAdmin</li>
                        <li>RW</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </Fragment>
  );
}
