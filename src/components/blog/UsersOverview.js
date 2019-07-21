import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody, Button } from "shards-react";
import { Line } from 'react-chartjs-2';

class UsersOverview extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">Sales summary</h6>
        </CardHeader>
        <CardBody className="pt-0 mt-1">
          <Line legend={false} data={{
            labels: this.props.labels,
            datasets: [
              {
                label: "Sales",
                fill: "start",
                data: this.props.data,
                backgroundColor: "rgba(0,123,255,0.1)",
                borderColor: "rgba(0,123,255,1)",
                pointBackgroundColor: "#ffffff",
                pointHoverBackgroundColor: "rgb(0,123,255)",
                borderWidth: 1.5,
                pointRadius: 0,
                pointHoverRadius: 3
              },]}
          } />
        </CardBody>
      </Card>
    );
  }
}

export default UsersOverview;
