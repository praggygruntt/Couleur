import React from 'react';
import Palette from './Components/Palette';
import seedPalettes from './seedPalettes';

function App() {
  return (
    <div>
      <Palette {...seedPalettes[3]}/>
    </div>
  );
}

export default App;
