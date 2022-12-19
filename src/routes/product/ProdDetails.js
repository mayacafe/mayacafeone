import React, { Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Col } from "reactstrap";
import IntlMessages from "Util/IntlMessages";
import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";

export default function ProdDetails(props) {
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
                <IntlMessages id=" Product Details" />
              </CardTitle>
              <div className="details-div">
                <Row>
                  <Col xs={12} sm={6} md={6} lg={4}>
                    <div className="detail-t1 detail ">
                      <ul>
                        <li>Product Name</li>
                        <li>Contact Number</li>
                        <li>Category</li>
                        <li>Subcategory</li>
                        <li>Systemrating</li>
                        <li>Massage</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={12} sm={6} md={6} lg={4}>
                    <div className="detail-t1">
                      <ul>
                        <li>Mutton Kabab21</li>
                        <li>8574254875</li>
                        <li>2</li>
                        <li>7</li>
                        <li>34.2</li>
                        <li>"Indori Samosa is one of the finest Samosa of the country.   only in Madhya Pradesh region.",</li>
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
