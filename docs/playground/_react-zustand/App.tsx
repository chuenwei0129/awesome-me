import React from 'react';
import BearBox from './pages/BearBox';
import CatBox1 from './pages/CatBox1';
import CatBox2 from './pages/CatBox2';
import CatBox3 from './pages/CatBox3';
import CatBox4 from './pages/CatBox4';
import FoodBox from './pages/FoodBox';

import './App.css';

function App() {
  return (
    <div className="container">
      <h1>Zustand Demo</h1>
      <div>
        <BearBox />
        <FoodBox />
      </div>
      <div>
        <CatBox1 />
        <CatBox2 />
        <CatBox3 />
        <CatBox4 />
      </div>
    </div>
  );
}

export default App;
