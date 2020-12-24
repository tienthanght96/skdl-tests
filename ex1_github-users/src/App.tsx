import './App.css'

import React from 'react'

import { SearchForm } from './components/SearchForm'
import { TableUsers } from './components/TableUsers'

function App() {
  return (
    <div className="app">
      <h1 className="text-center app__title">
        <span>Github Users</span>
      </h1>
      <SearchForm />
      <TableUsers />
    </div>
  )
}

export default App
