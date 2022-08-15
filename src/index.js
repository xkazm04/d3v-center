
import './index.css';
import App from './App';
import React from 'react';
import './fonts/postnobillscolombo-bold.ttf';
import ReactDOM from 'react-dom';


import { BrowserRouter } from 'react-router-dom';
import LogRocket from 'logrocket';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
LogRocket.init('gad5sa/d3v-center');

Sentry.init({
  dsn: "https://4e68a9a9765940e9994ac4f08102cb5f@o1223284.ingest.sentry.io/6367480",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <BrowserRouter>

         <App />

      </BrowserRouter>
  ,
  document.getElementById('root')
);

