import React, { useState, useEffect } from 'react';

import './App.css'

import DataTable from './datatable';

export default function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/client/rules')
    .then(response => response.json())
    .then(json => setData(json))
  }, []);

  function search (rows) {
    return rows.filter(row => row.Rule.toLowerCase().indexOf(filter) > -1);
  }

  return (
    <div>
      <form>
        <label for="search">Search Client Rules:</label>
        <input
          id="search"
          type="text"
          placeholder="weekdayAccess"
          value={filter}
          onChange={(e) => setFilter(e.target.value)} />
      </form>
      <div>
        <DataTable data={search(data)} />
      </div>
    </div>
  );
}
