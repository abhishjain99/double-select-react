import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import store from './components/FunctionalComponent_RTK/todoStore';
// import store from './components/Typescript_FuncComp_RTK/todoStore';
// import { store } from './components/TFCRTK_express_jwt/FrontEnd/todoStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}> // Provider for Todo with redux
    <App />
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
