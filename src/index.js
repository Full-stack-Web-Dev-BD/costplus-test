import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter } from "react-router-dom"; 
import "./scss/volt.scss";
import  { Toaster } from 'react-hot-toast';
import "react-datetime/css/react-datetime.css";
import "./custom.css"
import "./DLMode.css"

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Toaster/>
      <ScrollToTop />
      <HomePage />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
