
import './index.css';
import App from './App';
import React,{ StrictMode } from 'react';
import { render } from 'react-dom';

  

const rootElement = document.getElementById('root');
render(
	<StrictMode>
		<App />
	</StrictMode>,
	rootElement
);