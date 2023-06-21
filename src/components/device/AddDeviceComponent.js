import React, { useState } from 'react'
import DeviceService from '../../services/DeviceService';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const AddDeviceComponent = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();    
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const saveDevice = (data) => {
        const device = { uid:data.uid, vendor:data.vendor, status:data.status};
        DeviceService.createDevice(device).then(() =>{      
            navigate('/device');
        }).catch(error => {
            setErrorMessage(error.response.data?.description); 
        });        
    }

    const onSubmit = (data) => {
        saveDevice(data)
    } 

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3 form-save-update'>                    
                    <div className='card-head'>Add Device</div>
                    <div className='card-body'>
                        <form onSubmit={ handleSubmit(onSubmit)} >
                            <span className='text-danger text-small d-block mb-2'>
                                {errorMessage && errorMessage }
                            </span>                        
                            <div className='form-group'>
                                <label className='form-label'>UID</label>
                                <input id='uid'
                                    type='text'
                                    className='form-control'  
                                    maxLength='20'                                  
                                    {...register('uid', { required: true, pattern: /^[0-9]+$/i })}
                                    aria-invalid={errors.uid ? "true" : "false"}
                                />
                                <span className='text-danger text-small d-block mb-2'>
                                    {errors.uid?.type === 'required' && 'UID is required'}                                    
                                    {errors.uid?.type === 'pattern' && 'Only numbers'} 
                                </span>
                            </div>
                            <div className='form-group'>
                                <label className='form-label' htmlFor='vendor'>Vendor</label>
                                <input id='vendor'
                                    type='text'
                                    className='form-control'      
                                    maxLength='100'                        
                                    {...register('vendor', { required: true, pattern: /^[A-Za-z0-9]+$/i })}
                                />
                                <span className='text-danger text-small d-block mb-2'>
                                    {errors.vendor?.type === 'required' && 'Vendor is required'}                                    
                                    {errors.vendor?.type === 'pattern' && 'Only Letters and numbers'} 
                                </span>
                            </div>
                            <div className="form-group form-check">
                                <input type='checkbox' className='form-check-input'
                                    {...register('status') }
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">Online</label>
                            </div>
                            <button className='btn btn-success'>Save</button>
                            &nbsp;&nbsp;
                            <Link to='/device' className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddDeviceComponent;
