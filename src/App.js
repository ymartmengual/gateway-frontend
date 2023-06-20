
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import { ListGatewaysComponent } from './components/ListGatewaysComponent';
import ListDevicesComponent from './components/ListDevicesComponent';
import AddDeviceComponent from './components/AddDeviceComponent';

function App() {
  return (
    <div >
      <BrowserRouter >
        <HeaderComponent />
        <div>
        <Routes>
            <Route exact path='/' element={ <ListGatewaysComponent /> }></Route>
            <Route exact path='/devices' element={ <ListDevicesComponent /> }></Route>
            <Route path='/add-device' element={ <AddDeviceComponent /> }></Route>
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
