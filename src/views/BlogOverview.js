import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import UsersOverview from "./../components/blog/UsersOverview";
import {Redirect} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import { appName } from "../global";
import { daily } from "../store/actions/dashboardActions";
import { connect } from "react-redux";

class BlogOverview extends React.Component {
  
  componentDidMount = () => {
    this.props.daily();
  }

  handleClickMe = () => {
    console.log('Halo');
  }

  render() {
    const sales = this.props.payload.data ? this.props.payload.data.sales : undefined;
    const expense_purchase = this.props.payload.data ? this.props.payload.data.expense_purchase : undefined;
    const net = this.props.payload.data ? this.props.payload.data.net : undefined;
    const labels = this.props.payload.sales ? this.props.payload.sales.key : [];
    const data = this.props.payload.sales ? this.props.payload.sales.data : [];

    if (!sessionStorage.getItem('token')) return (<Redirect to="/login" />)
  
    return (
      <Container fluid className="main-content-container px-4">
            <Helmet>
                <title>Dashboard | {appName} </title>
            </Helmet>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Daily Report" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        {/* Small Stats Blocks */}
        <Row>          
          <Col className="col-lg-4 mb-4" md="6" sm="6">
            <SmallStats
              variation="1"
              chartData={
                [
                  {
                    label: "Today",
                    fill: "start",
                    borderWidth: 1.5,
                    backgroundColor: sales && sales.rank === 'increase' ? "rgba(0, 184, 216, 0.1)" : "rgba(196, 24, 60, 0.1)",
                    borderColor: sales && sales.rank === 'increase' ? "rgba(0, 184, 216, 1)" : "rgba(196, 24, 60, 1)" ,
                    data: sales ? sales.data : []
                  }
                ]
              }
              chartLabels={[null, null, null, null, null, null, null]}
              label="Sales"
              value={ sales && sales.value }
              percentage={ sales && sales.percentage + '%' }
              increase={ sales && sales.rank === 'increase' ? true : false }
              decrease={ sales && sales.rank === 'decrease' ? true : false }
              />
          </Col>
            
          <Col className="col-lg-4 mb-4" md="6" sm="6">
            <SmallStats
                variation="1"
                chartData={
                  [
                    {
                      label: "Today",
                      fill: "start",
                      borderWidth: 1.5,
                      backgroundColor: expense_purchase && expense_purchase.rank === 'increase' ? "rgba(0, 184, 216, 0.1)" : "rgba(196, 24, 60, 0.1)",
                      borderColor: expense_purchase && expense_purchase.rank === 'increase' ? "rgba(0, 184, 216, 1)" : "rgba(196, 24, 60, 1)",
                      data: expense_purchase ? expense_purchase.data : []
                    }
                  ]
                }
                chartLabels={[null, null, null, null, null, null, null]}
                label="Expense and Purchase"
                value={ expense_purchase && expense_purchase.value }
                percentage={ expense_purchase && expense_purchase.percentage + '%' }
                increase={ expense_purchase && expense_purchase.rank === 'increase' ? true : false }
                decrease={ expense_purchase && expense_purchase.rank === 'decrease' ? true : false }
                />
          </Col>

          <Col className="col-lg-4 mb-4" md="6" sm="6">
            <SmallStats
                variation="1"
                chartData={
                  [
                    {
                      label: "Today",
                      fill: "start",
                      borderWidth: 1.5,
                      backgroundColor: net && net.rank === 'increase' ? "rgba(0, 184, 216, 0.1)" : "rgba(196, 24, 60, 0.1)",
                      borderColor: net && net.rank === 'increase' ? "rgba(0, 184, 216, 1)" : "rgba(196, 24, 60, 1)",
                      data: net ? net.data : []
                    }
                  ]
                }
                chartLabels={[null, null, null, null, null, null, null]}
                label="Net Income"
                value={ net && net.value }
                percentage={ net && net.percentage + '%' }
                increase={ net && net.rank === 'increase' ? true : false }
                decrease={ net && net.rank === 'decrease' ? true : false }
                />
          </Col>

        </Row>

        <Row>
          {/* Users Overview */}
          <Col lg="12" md="12" sm="12" className="mb-4">
            <UsersOverview labels={labels} data={data} />
          </Col>

          {/* Users by Device */}
          {/* <Col lg="4" md="6" sm="12" className="mb-4">
            <UsersByDevice />
          </Col> */}

          {/* <Col xs="4" className="mb-4">
            <TableDick />
          </Col>

          <Col xs="4" className="mb-4">
            <TableDick />
          </Col>

          <Col xs="4" className="mb-4">
            <TableDick />
          </Col> */}

          {/* <Col xs="8" className="mb-4">
            <UsersByDick />
          </Col> */}


        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    fetching: state.dashboard.fetching,
    fetched: state.dashboard.fetched,
    error: state.dashboard.error,
    payload: state.dashboard.payload,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    daily: () => dispatch(daily())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogOverview);
