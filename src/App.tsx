import './App.css';
import CanvasApp from './Canvas.tsx';
import {Routes, Route, HashRouter } from 'react-router-dom';

function App() {
  return (

    

    <div className="App">
      <header className="App-header">
        
        <HashRouter>
          <Routes>
            <Route path = "/:id" element = {<CanvasApp />}/>
            <Route path = "/" element = {<CanvasApp />}/>
          </Routes>
        </HashRouter>

        
        
      </header>
    </div>
  );
}

export default App;
