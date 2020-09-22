import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';
import {removingOrder} from '../../apiCalls'

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
    }
  }

  componentDidMount() {
    getOrders()
    .then(data => this.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  updateState = (newOrder) => {
    console.log(newOrder, 'neworder')
    this.setState({orders: [...this.state.orders, newOrder]})
  }

    // removeOrder = (id) => {
    //   let filtered = this.state.orders.filter(order => order.id !== id)
    //   this.setState({orders: filtered})
    // }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm updateState={this.updateState} />
        </header>
        <Orders removeOrder={this.removeOrder} orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
