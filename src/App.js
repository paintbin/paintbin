import logo from './logo.svg';
import './App.css';
import CanvasApp from './Canvas';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (

    

    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Router>
          <Routes>
            <Route path = "/:id" element = {<CanvasApp />}/>
            <Route path = "/" element = {<CanvasApp />}/>
          </Routes>
        </Router>
        
      </header>
    </div>
  );
}

export default App;
