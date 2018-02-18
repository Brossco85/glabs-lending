import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchReturnedDebits } from '../actions';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class ReturnedDebitsIndex extends Component {

  componentDidMount() {
    this.props.fetchReturnedDebits();
  }

  renderReturnedDebits() {
    return _.map(this.props.returnedDebits, returnedDebit => {
      return (
        <ListGroupItem key={returnedDebit._id}>
        <h3>Payer: {returnedDebit.PayerAccount.name}</h3>
        <h3>Company: {returnedDebit.originatingAccountRecord.name}</h3>
        <p>Reason for Return: {returnedDebit.returnDescription}</p>
          <p>Debit value: £{returnedDebit.valueOf.substring(1)}</p>
          <p>Debit Reference: {returnedDebit.ref}</p>
          <p>Debit transaction Code: {returnedDebit.transCode}</p>
          <p>Debit Return Code: {returnedDebit.returnCode}</p>
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
