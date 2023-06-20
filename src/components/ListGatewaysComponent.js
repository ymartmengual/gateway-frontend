
import React, { useEffect, useState } from 'react'
import GatewayService from '../services/GatewayService';

export const ListGatewaysComponent = () => {

    const [gateways, setGateways] = useState([]);

    useEffect(() => {
        listGateways();
    },[]);

    const listGateways = () => {
        GatewayService.getAllGateways().then(response => {
            setGateways(response.data);
        }).catch(error => {
            console.log(error);
        });
    }


  return (
    <div className='container'>
        <h2 className='text-center'>Gateways</h2>
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
                            </td>
                        </tr>
                    )
                }
            </tbody>

        </table>
    </div>
  )
}
