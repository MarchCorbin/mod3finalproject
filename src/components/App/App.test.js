import React from 'react';
import '@testing-library/jest-dom';
import App from './App';
import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import {getOrders, placeOrder} from '../../apiCalls'
jest.mock('../../apiCalls.js')

describe('App', () => {
  it('should have all of the data presented on load', async() => { 
    let mockData = {
        "orders": [{
              "id": 1,
              "name": "Pat",
              "ingredients": [
                "beans",
                "lettuce",
                "carnitas",
                "queso fresco",
                "jalapeno"
              ]
            },
            {
              "id": 2,
              "name": "Sam",
              "ingredients": [
                "steak",
                "pico de gallo",
                "lettuce",
                "carnitas",
                "queso fresco",
                "jalapeno"
              ]
            }]
          }
    getOrders.mockResolvedValue(mockData)
    render(<BrowserRouter><App /></BrowserRouter>)
    const card1 = await waitFor(() => screen.getByText('Pat'))
    const card2 = await waitFor(() => screen.getByText('Sam'))
    expect(card1).toBeInTheDocument()
    expect(card2).toBeInTheDocument()
  })
  it('should have a name input and a submit button', () => {
    render(<BrowserRouter><App /></BrowserRouter>)
    const nameinput = screen.getByPlaceholderText('Name')
    expect(nameinput).toBeInTheDocument()
    const submitbtn =  screen.getByText('Submit Order')
    expect(submitbtn).toBeInTheDocument()
  })
  it('should be able to place a new order!', async() => {
     let mockData = {
        "orders": [{
              "id": 1,
              "name": "Pat",
              "ingredients": [
                "beans",
                "lettuce",
                "carnitas",
                "queso fresco",
                "jalapeno"
              ]
            },
            {
              "id": 2,
              "name": "Sam",
              "ingredients": [
                "steak",
                "pico de gallo",
                "lettuce",
                "carnitas",
                "queso fresco",
                "jalapeno"
              ]
            }]
          }

        let  mockDataNew = {
        "orders": [{
            "id": 1,
            "name": "Pat",
            "ingredients": [
              "beans",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
            ]
          },
          {
            "id": 2,
            "name": "Sam",
            "ingredients": [
              "steak",
              "pico de gallo",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
            ]
          },
         {
            "id": 7,
            "name": "new-burrito",
            "ingredients": ["steak"]
          }
        ]
      }   
    getOrders.mockResolvedValue(mockData)
    render(<BrowserRouter><App /></BrowserRouter>)
    const steakButton = screen.getByRole('button',{name: 'steak'})
    expect(steakButton).toBeInTheDocument()
    const nameinput = screen.getByPlaceholderText("Name");
    expect(nameinput).toBeInTheDocument();

    fireEvent.change(nameinput, {target: {name: "name", value: 'new-burrito'} })

    expect(nameinput.value).toBe('new-burrito')

    fireEvent.click(steakButton)

    let submitbtn = screen.getByText('Submit Order')
    expect(submitbtn).toBeInTheDocument()
    fireEvent.click(submitbtn)

    await waitFor(() => expect(nameinput.value).toBe(''))
    const newOrder = await waitFor(() => screen.getByText('new-burrito'))

    await waitFor(() => expect(newOrder).toBeInTheDocument())
  })
})