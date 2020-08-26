import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

function App() {
  return (
	// BEM naving convention
    <div className="app">
	  <div className="app_body">
	  	{/* SIDE BAR */}
		  <Sidebar />
		  <Chat />

	  </div>
    </div>
  );
}

export default App;
