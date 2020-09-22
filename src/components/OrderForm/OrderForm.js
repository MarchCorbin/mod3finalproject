import React, { Component } from 'react';
import {placeOrder, getOrders} from '../../apiCalls.js'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if(this.state.ingredients !== [] && this.state.name !== ''){
      let title = this.state.name
      let ingres = [...new Set(this.state.ingredients)]
      let newOrder = {
        id: Date.now(),
        name: title,
        ingredients: ingres
      }
      placeOrder(title, ingres);
      this.props.updateState(newOrder)
      console.log(newOrder, 'newordering')
      this.clearInputs();
    }
  }

  handleNameChange = e => {
    this.setState({ name: e.target.value})
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange = (e) => {
    e.preventDefault()
    let allIngredients = [...this.state.ingredients]
   allIngredients.push(e.target.name)
    this.setState({ingredients: allIngredients})
    console.log(allIngredients, 'allingredients')
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
