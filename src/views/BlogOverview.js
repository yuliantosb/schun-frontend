import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import UsersByDevice from "./../components/blog/UsersByDevice";
import UsersByDick from "./../components/blog/UsersByDick";
import TableDick from './../components/blog/TableDick';
import {Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { appName } from "../global";

class BlogOverview extends React.Component {
  render() {
    if (!sessionStorage.getItem('token')) return (<Redirect to="/login" />)
    const { smallStats } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
            <Helmet>
                <title>Dashboard | {appName} </title>
            </Helmet>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Production Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>
          {smallStats.map((stats, idx) => (
            <Col className="col-lg-6 mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>

        <Row>
          {/* Users Overview */}
          <Col lg="8" md="12" sm="12" className="mb-4">
            <UsersOverview />
          </Col>

          {/* Users by Device */}
          <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col>

          <Col xs="12" className="mb-4">
            <UsersByDick />
          </Col>

          <Col xs="12" className="mb-4">
            <TableDick />
          </Col>

        </Row>
      </Container>
    );
  }
}

BlogOverview.propTypes = {
  /**
   * The small stats dataset.
   */
  smallStats: PropTypes.array
};

BlogOverview.defaultProps = {
  smallStats: [
    {
      label: "Fabricated",
      value: "2,390 m3",
      percentage: "4.7%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 1, 3, 5, 4, 7]
        }
      ]
    },
    {
      label: "Invoiced",
      value: "182 m3",
      percentage: "12.4%",
      increase: true,
      chartLabels: [null, null, null, null, null, null, null],
      attrs: { md: "6", sm: "6" },
      datasets: [
        {
          label: "Today",
          fill: "start",
          borderWidth: 1.5,
          backgroundColor: "rgba(0, 184, 216, 0.1)",
          borderColor: "rgb(0, 184, 216)",
          data: [1, 2, 3, 3, 3, 4, 4]
        }
      ]
    },
  ]
};

export default BlogOverview;
