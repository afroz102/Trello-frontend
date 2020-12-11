import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import store from './redux/store';
import "./index.css";
import '@fortawesome/fontawesome-free/js/all';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #FAFBFC;
    box-sizing: border-box;
    transition: all 0.5s ease-in;
  }
`;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);