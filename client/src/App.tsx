import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './router';

class App extends Component {
  render() {
    return <>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </>
  }
}

export default App;
