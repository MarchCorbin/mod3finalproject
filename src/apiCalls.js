export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}


export const placeOrder = (title, ingres) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "name": title,
        "ingredients": ingres
      })
    })
    .then(response => response.json())
  }


export const removingOrder = (id) => {
  console.log(id)
  return fetch(`http://localhost:3001/api/v1/orders/${id}`, {
    method: 'DELETE',
    headers: {
      "content-type": 'application/json'
    }
  })
  .catch(err => console.error(err.message))
}


