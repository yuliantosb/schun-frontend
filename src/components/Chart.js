import React from "react";
import { Line, Pie } from "react-chartjs-2";

class Chart extends React.Component {
  render() {
    const {type} = this.props;
    const data = {
      labels: [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          data: [350, 420, 280, 530, 360, 640, 570, 540, 210, 630, 620, 530],
          borderColor: "#2d9cdb",
          backgroundColor: ["rgba(255, 99, 132, 0)"]
        }
      ]
    };

    const dataPie = {
      labels: [
        'Banana',
        'Dougnut',
        'Pie'
      ],
      datasets: [
        {
          data: [10, 20, 15],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ]
        }
      ]
    }

    const MyChart = (type === 'line') ?       
        <Line
          data={data}
          options={{
            legend: {
              display: false
            },
            tooltips: {
              titleFontColor: "#828282",
              backgroundColor: "#fff",
              bodyFontColor: "#2d9cdb",
              displayColors: false,
              xPadding: 10,
              yPadding: 10
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)"
                  }
                }
              ]
            }
          }}
        />
       : (
      <Pie
        data={dataPie}
        options={{
          legend: {
              display: false
            },
        }}
       />
    );

    return (
      <div>{MyChart}</div>
    )

  }
}

export default Chart;
