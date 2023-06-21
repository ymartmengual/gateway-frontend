
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import ListDevicesComponent from './components/device/ListDevicesComponent';
import AddDeviceComponent from './components/device/AddDeviceComponent';
import AddGatewayComponent from './components/gateways/AddGatewayComponent';
import ListGatewaysComponent from './components/gateways/ListGatewaysComponent';
import DetailGatewayComponent from './components/gateways/DetailGatewayComponent';

function App() {
  return (
    <div >
      <BrowserRouter >
        <HeaderComponent />
        <div>
        <Routes>
            <Route exact path='/gateway' element={ <ListGatewaysComponent /> }></Route>
            <Route exact path='/device' element={ <ListDevicesComponent /> }></Route>
            <Route path='/device/add' element={ <AddDeviceComponent /> }></Route>
            <Route path='/gateway/add' element={ <AddGatewayComponent /> }></Route>
            <Route path='/gateway/detail/:id' element={ <DetailGatewayComponent /> }></Route>
          </Routes>
        </div>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
