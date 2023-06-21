import { useEffect, useState } from "react";
import DeviceService from "../../services/DeviceService";
import { Link } from "react-router-dom";


export const ListDevicesComponent = () => {

    const [devices, setDevices] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        listDevices();
    },[]);

    const listDevices = () => {
        DeviceService.getAllDevices().then(response => {
            setDevices(response.data);
        }).catch(error => {
            setErrorMessage(error.response.data?.description); 
        });
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Devices</h2>
            <span className='text-danger text-small d-block mb-2'>
                {errorMessage && errorMessage }
            </span>  
            <Link to='/device/add' className='btn btn-primary mb-2'>Add Device</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UID</th>
                        <th>Vendor</th>
                        <th>Created</th>
                        <th>Status</th>
                    </tr>                
                </thead>
                <tbody>
                    {
                        devices.map(
                            device =>
                            <tr key={device.idDevice}>
                                <td>{device.idDevice}</td>
                                <td>{device.uid}</td>
                                <td>{device.vendor}</td>
                                <td>{device.createdAt}</td>
                                <td>{device.status ? 'Online' : 'Offline'}</td>
                            </tr>
                        )
                    }
                </tbody>    
            </table>
        </div>
      )
}

export default ListDevicesComponent;