
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import GatewayService from '../../services/GatewayService';
import DeviceService from '../../services/DeviceService';

export const DetailGatewayComponent = () => {
    
    const [serialNumber, setSerialNumber] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [devices, setDevices] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const {id} = useParams();
    const [errorMessage, setErrorMessage] = useState("");

    const deleteDeviceFromGateway = (idDevice) => {
        GatewayService.deleteDeviceFromGatewayByIdGatewayAndIdDevice(id, idDevice).then((response) => {
            setDevices(response.data.devices);
        }).catch((error) => {
            setErrorMessage(error.response.data?.description); 
        });
    }

    const listDevices = () => {
        DeviceService.getAllDevices().then(response => {
            setDeviceList(response.data);
        }).catch(error => {
            setErrorMessage(error.response.data?.description); 
        });
    }

    const addDeviceToGateway = (idD) =>{
        GatewayService.addDeviceToGatewayByIdGatewayAndIdDevice(id, idD).then((response) => {
            setDevices(response.data.devices);
        }).catch((error) => {
            setErrorMessage(error.response.data?.description); 
        });
    }

    const exist = (idD) => {
        if(devices.find(auxDevice => auxDevice.idDevice == idD)){
            return <button className='btn btn-danger' onClick={ () => deleteDeviceFromGateway(idD) }>Delete</button>
        }else{
            return <button className='btn btn-success' onClick={ () => addDeviceToGateway(idD) }>Add</button>;
        }
    }    

    useEffect (() => {
        if(id){
            GatewayService.getGatewayById(id).then((response) => {
                setSerialNumber(response.data.serialNumber);
                setName(response.data.name);
                setAddress(response.data.address);
                setDevices(response.data.devices);
            }).catch((error) => {
                setErrorMessage(error.response.data?.description); 
            });
        }
        listDevices();
    },[]);

  return (
    <div className='container'>           
        <span className='text-danger text-small d-block mb-2'>
            {errorMessage && errorMessage }
        </span>
        <div className='row'>
            <div className='card col-md-5  form-save-update'>
                <div className='card-head'><h2>Detail Gateway</h2></div>
                <div className='card-body'>
                    <h5 className="card-title">Id: { id }</h5>
                    <p className="card-text">Serial Number: { serialNumber }</p>
                    <p className="card-text">Name: { name }</p>
                    <p className="card-text">Address IPv4: { address }</p>
                    <Link to='/gateway' className='btn btn-danger'>Close</Link>
                </div>
            </div>
        </div>
        <div className='row'>
            <div className='card col-md-12 form-save-update'>
                <div className='card-head'>Devices</div>
                <div className='card-body'>
                    <table className='table table-bordered table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>UID</th>
                                <th>Vendor</th>
                                <th>Created</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>                
                        </thead>
                        <tbody>
                            {
                                deviceList.map(
                                    devic =>
                                    <tr key={devic.idDevice}>
                                        <td>{devic.idDevice}</td>
                                        <td>{devic.uid}</td>
                                        <td>{devic.vendor}</td>
                                        <td>{devic.createdAt}</td>
                                        <td>{devic.status ? 'Online' : 'Offline'}</td>
                                        <td className='text-center'>
                                            {exist(devic.idDevice)}                                            
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>    
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailGatewayComponent;
