import './App.css';
import CanvasApp from './Canvas.tsx';
import {Routes, Route, HashRouter, BrowserRouter} from 'react-router-dom';

function App() {
  return (

    

    <div className="App">
      <header className="App-header">
        
        <BrowserRouter>
          <Routes>
            <Route path = "/:id" element = {<CanvasApp />}/>
            <Route path = "/" element = {<CanvasApp />}/>
          </Routes>
        </BrowserRouter>

        
        
      </header>
    </div>
  );
}

export default App;
