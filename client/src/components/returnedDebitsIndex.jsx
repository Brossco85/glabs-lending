import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchReturnedDebits } from '../actions';
import { Image, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';

class ReturnedDebitsIndex extends Component {

  componentDidMount() {
    this.props.fetchReturnedDebits();
  }

  renderReturnedDebits() {
    return _.map(this.props.returnedDebits, returnedDebit => {
      return (
        <ListGroupItem key={returnedDebit._id}>
          <h1>{returnedDebit.ref}</h1>
          <h1>{returnedDebit.transCode}</h1>
          <h1>{returnedDebit.returnCode}</h1>
        </ListGroupItem>
        );
    });
  }

  render() {
    return  (
      <div>
      <h3>Returned Debits List</h3>
      <ListGroup>
        {this.renderReturnedDebits()}
      </ListGroup>
    </div>
   );
  }
}

function mapStateToProps(state) {
  return { returnedDebits: state.returnedDebits };
}

export default connect(mapStateToProps, { fetchReturnedDebits })(ReturnedDebitsIndex);