
import React, { useEffect, useState } from 'react'
import GatewayService from '../../services/GatewayService';
import { Link } from 'react-router-dom';

export const ListGatewaysComponent = () => {

    const [gateways, setGateways] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        listGateways();
    },[]);

    const listGateways = () => {
        GatewayService.getAllGateways().then(response => {
            setGateways(response.data);
        }).catch(error => {
            setErrorMessage(error.response.data?.description); 
        });
    }


  return (
    <div className='container'>
        <h2 className='text-center'>Gateways</h2>
        <span className='text-danger text-small d-block mb-2'>
            {errorMessage && errorMessage }
        </span>        
        <Link to='/gateway/add' className='btn btn-primary mb-2'>Add Gateway</Link>
        <table className='table table-bordered table-striped'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Serial Number</th>
                    <th>Name</th>
                    <th>Address IPv4</th>
                    <th>Actions</th>
                </tr>                
            </thead>
            <tbody>
                {
                    gateways.map(
                        gateway =>
                        <tr key={gateway.idGateway}>
                            <td>{gateway.idGateway}</td>
                            <td>{gateway.serialNumber}</td>
                            <td>{gateway.name}</td>
                            <td>{gateway.address}</td>
                            <td>
                                <Link className='btn btn-info' to={ `/gateway/detail/${gateway.idGateway}` }>Detail</Link>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListGatewaysComponent;
