import React, { useRef } from 'react';
import BingoAnimation from './components/BingoAnimation';
import BingoHeader from './components/BingoHeader';
import BingoFooter from './components/BingoFooter';
import BingoGrid from './components/BingoGrid';

import './App.scss';

function App() {
  const boxReference = useRef([])
  return (
    <div className="App">
      <div className="board">
        <BingoHeader boxReference={boxReference} />
        <BingoAnimation />
        <BingoGrid boxReference={boxReference} />
        <BingoFooter />
      </div>
    </div>
  );
}

export default App;
