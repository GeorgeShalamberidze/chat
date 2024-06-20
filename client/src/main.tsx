import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/assets/styles/global.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<App />
		<ToastContainer />
	</React.StrictMode>
);
