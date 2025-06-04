//import React, {useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelPreviewList from './components/HotelPreviewList';
import HotelPage from './components/HotelPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HotelPreviewList/>} />
          <Route path="/hotels/:id" element={<HotelPage/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
