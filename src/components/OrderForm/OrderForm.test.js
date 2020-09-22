import React from 'react';
import '@testing-library/jest-dom';
import OrderForm from './OrderForm';
import { screen, fireEvent, render, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

describe('OrderForm', () => {
  it('should have an input field', () => {
    render(<BrowserRouter><OrderForm /></BrowserRouter>)
    const nameinput = screen.getByPlaceholderText('Name')
    expect(nameinput).toBeInTheDocument()
  })
  it('should have 13 buttons', () => {
    render(<BrowserRouter><OrderForm /></BrowserRouter>)
    let allbuttons = screen.getAllByRole('button')
    expect(allbuttons.length).toBe(13)
  })
  it('should clear the input after clicking on an item entering a name and pressing submit', async() => {
    const updateState = jest.fn()
    render(<BrowserRouter><OrderForm updateState={updateState} /></BrowserRouter>)
    const steakButton = screen.getByText('steak')
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
  })
})





