import logo from './logo.svg';
import './App.css';
import CanvasApp from './Canvas';
import {Routes, Route, HashRouter } from 'react-router-dom';
import { Resizable } from 'react-resizable';

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
