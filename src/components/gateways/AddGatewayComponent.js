
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import DeviceService from '../../services/DeviceService';
import GatewayService from '../../services/GatewayService';

export const AddGatewayComponent = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [devicesList, setDevicesList] = useState([]);
    const [devices, setDevices] = useState([]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    
    const onSubmit = (data) =>{
        const gateway = {serialNumber:data.serialNumber, name:data.name, address:data.address, devices };
        saveGateway(gateway);        
    }

    const saveGateway = (gateway) => {        
        GatewayService.createGateway(gateway).then(() => {
            navigate('/gateway');
        }).catch(error => {
            setErrorMessage(error.response.data?.description); 
        });
    }

    const handleChange = (e) => {
        setDevices(Array.from(e.target.selectedOptions, option => devicesList.find(dev => dev.idDevice == option.value)));
    }

    useEffect(() => {
        DeviceService.getAllDevices().then((response) => {
            setDevicesList(response.data);
        }).catch(error => {
            setErrorMessage(error.response.data?.description); 
        })  
    },[]);

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3 form-save-update'>
                    <div className='card-head'>Create Gateway</div>
                    <div className='card-body'>
                        <form onSubmit={ handleSubmit(onSubmit)} >    
                            <span className='text-danger text-small d-block mb-2'>
                                {errorMessage && errorMessage }
                            </span>
                            <div className='form-group'>
                                <label className='form-label' htmlFor='serialNumber'>Serial Number</label>
                                <input id='serialNumber'
                                    type='text'
                                    className='form-control'  
                                    maxLength='100'                                 
                                    {...register('serialNumber', { required: true, pattern: /^[A-Za-z0-9]+$/i })}
                                    aria-invalid={errors.serialNumber ? "true" : "false"}
                                />
                                <span className='text-danger text-small d-block mb-2'>
                                    {errors.serialNumber?.type === 'required' && 'Field Serial Number is required'}                                    
                                    {errors.serialNumber?.type === 'pattern' && 'Value not valid, only numbers and letters'} 
                                </span>
                            </div>
                            <div className='form-group'>
                                <label className='form-label' htmlFor='name'>Name</label>
                                <input id='name'
                                    type='text'
                                    className='form-control'  
                                    maxLength='100'                                  
                                    {...register('name', { required: true, pattern: /^[A-Za-z0-9]+$/i })}
                                    aria-invalid={errors.name ? "true" : "false"}
                                />
                                <span className='text-danger text-small d-block mb-2'>
                                    {errors.name?.type === 'required' && 'Field Name is required'}                                    
                                    {errors.name?.type === 'pattern' && 'Value not valid, only numbers and letters'} 
                                </span>
                            </div>
                            <div className='form-group'>
                                <label className='form-label' htmlFor='address'>Addres IPv4</label>
                                <input id='address'
                                    type='text'
                                    className='form-control'      
                                    maxLength='100'                        
                                    {...register('address', { required: true, pattern: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/i })}
                                />
                                <span className='text-danger text-small d-block mb-2'>
                                    {errors.address?.type === 'required' && 'Field Address IPv4 is required'}                                    
                                    {errors.address?.type === 'pattern' && 'Value not valid, allowed only IPv4 address'} 
                                </span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="devices">Devices</label>
                                <select id='devices' className='form-control' multiple={true} onChange={ handleChange }>
                                    {devicesList.map(device => (
                                        <option key={device.idDevice} value={device.idDevice}>
                                            {device.uid}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className='btn btn-success'>Save</button>
                            &nbsp;&nbsp;
                            <Link to='/gateway' className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>                
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddGatewayComponent;