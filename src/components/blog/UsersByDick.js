import React from 'react';
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../utils/chart";

class UsersByDick extends React.Component {
    constructor(props) {
      super(props);
  
      this.canvasRef = React.createRef();
    }
  
    componentDidMount() {
      const chartOptions = {
        ...{
          responsive: true,
          legend: {
            position: "top"
          },
          scales: {
            xAxes: [{
              barPercentage: 1,
              categoryPercentage: 0.6
            }],
            yAxes: [{
              id: "y-axis-stock-in"
            }, {
              id: "y-axis-stock-out"
            }]
          },
        },
        ...this.props.chartOptions
      };
  
      const BlogUsersOverview = new Chart(this.canvasRef.current, {
        type: "bar",
        data: this.props.chartData,
        options: chartOptions
      });
  
      // They can still be triggered on hover.
      const buoMeta = BlogUsersOverview.getDatasetMeta(0);
      buoMeta.data[0]._model.radius = 0;
      buoMeta.data[
        this.props.chartData.datasets[0].data.length - 1
      ]._model.radius = 0;
  
      // Render the chart.
      BlogUsersOverview.render();
    }
  
    render() {
      const { title } = this.props;
      return (
        <Card small className="h-100">
          <CardHeader className="border-bottom">
            <h6 className="m-0">{title}</h6>
          </CardHeader>
          <CardBody className="pt-0">
            <Row className="border-bottom py-2 bg-light">
              <Col sm="6" className="d-flex mb-2 mb-sm-0">
                <RangeDatePicker />
              </Col>
              <Col>
                <Button
                  size="sm"
                  className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
                >
                  View Full Report &rarr;
                </Button>
              </Col>
            </Row>
            <canvas
              height="120"
              ref={this.canvasRef}
              style={{ maxWidth: "100% !important" }}
            />
          </CardBody>
        </Card>
      );
    }
  }
  
  UsersByDick.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The chart dataset.
     */
    chartData: PropTypes.object,
    /**
     * The Chart.js options.
     */
    chartOptions: PropTypes.object
  };
  
  UsersByDick.defaultProps = {
    title: "Inventory Stock Material",
    chartData: {
        labels: ["Sand", "Concrete", "Gravel", "Cement"],
        datasets: [
            {
                label: 'Stock In',
                data: [5427, 5243, 5514, 3789],
                backgroundColor: 'rgba(0, 99, 132, 0.6)',
                borderWidth: 0,
                yAxisID: "y-axis-stock-in"
            },
            {
                label: 'Stock Out',
                data: [3971, 6209, 4898, 3137],
                backgroundColor: 'rgba(99, 132, 0, 0.6)',
                borderWidth: 0,
                yAxisID: "y-axis-stock-out"
            }        
        ]
    }
  };
  
  export default UsersByDick;
  