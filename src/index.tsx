import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';
import { AxiosError } from 'axios';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        onError: (error: AxiosError) => {
          console.error(error.message);
        },
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
