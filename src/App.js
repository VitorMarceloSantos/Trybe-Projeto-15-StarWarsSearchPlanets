import { React, useState } from 'react';
import './App.css';
import DataContexProvider from './context/DataContexProvider';
import TablePlanets from './components/TablePlanets';
import Header from './components/Header';
import Intro from './introStarWars/Intro';

function App() {
  const [verifyIntro, setVerifyIntro] = useState(false);
  return (
    <DataContexProvider>
      <main>
        {verifyIntro === false ? (
          <Intro setVerifyIntro={ setVerifyIntro } />
        ) : (
          <div>
            <Header setVerifyIntro={ setVerifyIntro } />
            <TablePlanets />
          </div>
        )}
      </main>
    </DataContexProvider>
  );
}

export default App;
