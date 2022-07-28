import './App.css';
import { Routes, Route } from "react-router-dom";

import { useContext } from 'react';
import { AuthProvider } from './context/AuthContext';

import PrivateRoute from './utils/PrivateRoute';

import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Tasks from './pages/Tasks';


function App() {
	return (
		<div className="App">

			<AuthProvider>
				<Navbar />

				<Routes>
					<Route path="register/" element={<Register />} />
					<Route path="login/" element={<Login />} />

					<Route exact element={<PrivateRoute />}>
						<Route path='/' element={<Tasks />} />
					</Route>

				</Routes>

			</AuthProvider>

		</div>
	);
}

export default App;
