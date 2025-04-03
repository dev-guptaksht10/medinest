import React from 'react';
import { Route, Routes } from 'react-router-dom';

const App_ = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='app' element={<Home />} />
        <Route path='app/:restaurant_id' element={<RestaurantPage />} />
      </Routes>
    </div>
  )
}

export default App_