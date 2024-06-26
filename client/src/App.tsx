import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/router';

const App: React.FC = () => {
	console.log('text');
	return <RouterProvider router={router} />;
};

export default App;
