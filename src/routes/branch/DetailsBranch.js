import React, { Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Col } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";

export default function DetailsBranch(props) {
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
                <IntlMessages id=" Branch Details" />
              </CardTitle>
              <div className="details-div">
                <Row>
                  <Col xs={12} sm={6} md={6} lg={4}>
                    <div className="detail-t1 detail ">
                      <ul>
                        <li>Cafe Name</li>
                        <li>Branch Type</li>
                        <li>Branch Phone Number</li>
                        <li>Branch Email</li>
                        <li>Country</li>
                        <li>Address</li>
                        <li>Dist</li>
                        <li>Block</li>
                        <li>Pincode</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={4}>
                     <div className="detail-t1">
                     <ul>
                        <li>Vijay Nagar Mayas</li>
                        <li>SUB</li>
                        <li>9876543212</li>
                        <li>vijaynagar@mayas.com</li>
                        <li>India</li>
                        <li>Scheme No. 54 ,Vijay Nagar</li>
                        <li>Indore</li>
                        <li>Vijay Nagar</li>
                        <li>200406</li>
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
  )
}
