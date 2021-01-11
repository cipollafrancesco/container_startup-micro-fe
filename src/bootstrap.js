import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// We don't need special behaviour for dev environment
ReactDOM.render(<App/>, document.querySelector('#root'))

console.log('Container works!')
