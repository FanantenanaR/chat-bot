import { lazy, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
const Chat = lazy(() => import("./pages/Chat"));

function App() {
	return (
		<BrowserRouter> 
			<Routes>
				<Route path="/" element={<Chat />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
