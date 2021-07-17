import React, {Component, Fragment} from 'react';
import Button from 'react-bootstrap/lib/Button'
import CustomerDetails from './CustomerDetails/CustomerDetails'
import axios from 'axios';
import './Customers.css';
import Flip from '../pluggable-components/flip/flip';
import Modal from '../pluggable-components/modal/modal';


export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1,
      showCustomerDetails: false
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  //Function to get the Customer Data from json
  getCustomerData() {
    axios.get('assets/samplejson/customerlist.json').then(response => {
      this.setState({customerList: response})
    })
  };

  render() {
    if (!this.state.customerList)
      return (<p>Loading data</p>)
    return (<div className="addmargin row customers-list">
      <div className="col-md-12">
        {

          this.state.customerList.data.map(customer => 
          <div className="col-md-4 col-12 customer" key={customer.id+customer.name}>

            <Flip 
              front={<div class="title">
                {customer.name}
              </div> }
              back={
                <Fragment>
                  <div className="details"> 
                    <span>{customer.email}</span>
                    <span>{customer.phone}</span>
                  </div>
                  <Button bsStyle="info" onClick={() => {
                    this.setState({
                      selectedCustomer: customer.id,
                      showCustomerDetails: true
                    })
                  }}>
                    Click to View Details
                </Button>
                </Fragment>
              }
            >
            </Flip>

          </div>
         )
        }
      </div>
      <Modal show={this.state.showCustomerDetails} onHide={() => this.setState({
        showCustomerDetails: false
      })} heading="Customer Details" body={
        <CustomerDetails val={this.state.selectedCustomer}/>
      }/>
      
    </div>)
  }

}
