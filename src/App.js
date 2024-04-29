import logo from './logo.svg';
import './App.css';
import CanvasApp from './Canvas';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link, HashRouter } from 'react-router-dom';

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
