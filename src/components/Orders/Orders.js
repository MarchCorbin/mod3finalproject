import React from 'react';
import './Orders.css';
import {removeOrder} from '../../apiCalls'

const Orders = (props) => {
  const orderEls = props.orders.map(order => {
    return (
      <div className="order">
        <h3>{order.name}</h3>
        
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li>{ingredient}</li>
          })}
        </ul>
        <button onClick={() => props.removeOrder(order.id)}>Delete</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;