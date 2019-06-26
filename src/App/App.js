import React from 'react';
import './App.css';
import TransactionStatusPage from '../TransactionStatusPage/TransactionStatusPage'

function App() {
	var data = window.data1;
  return (
    <div className="App">
      <TransactionStatusPage data={data}></TransactionStatusPage>
    </div>
  );
}

export default App;
