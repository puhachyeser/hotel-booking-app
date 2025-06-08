//import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelPreviewList from './components/HotelPreviewList';
import HotelPage from './components/HotelPage';
import Register from './components/Register';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HotelPreviewList/>} />
          <Route path="/hotels/:id" element={<HotelPage/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
