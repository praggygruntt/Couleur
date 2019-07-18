import React from 'react';
import Palette from './Components/Palette';
import seedPalettes from './seedPalettes';

function App() {
  return (
    <div>
      {/* generates a Palette using only the first element of the seedPalettes array */}
      <Palette {...seedPalettes[2]}/>
    </div>
  );
}

export default App;
