import React from 'react'
import ReactDOM from 'react-dom'
import '@babel/polyfill'
import App from './App'
import DefaultErrorBoundry from './DefaultErrorBoundry'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  const axe = require('react-axe')
  axe(React, ReactDOM, 1000)
}

ReactDOM.render(
  <React.StrictMode>
    <DefaultErrorBoundry>
      <App />
    </DefaultErrorBoundry>
  </React.StrictMode>,
  document.getElementById('app')
)
