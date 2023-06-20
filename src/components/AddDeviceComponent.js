import React, { useEffect, useState } from 'react'
import DeviceService from '../services/DeviceService';
import { Link, useNavigate } from 'react-router-dom';

export const AddDeviceComponent = () => {

    const [uid, setUid] = useState('');
    const [vendor, setVendor] = useState('');
    const [status, setStatus] = useState(false);
    const navigate = useNavigate();

    const saveDevice = (e) => {
        e.preventDefault();
        const device = { uid, vendor, status};
        DeviceService.createDevice(device).then((response) =>{
            console.log(response.data);            
            navigate('/devices');
        }).catch(error => {
            //todo make a popup
            console.log(error);
        });        
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <div className='card-head'>Add Device</div>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>UID</label>
                                <input 
                                    type='text'
                                    placeholder=''
                                    name='uid'
                                    className='form-control'
                                    value={uid}
                                    onChange={ (e) => setUid(e.target.value) }
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Vendor</label>
                                <input 
                                    type='text'
                                    placeholder=''
                                    name='vendor'
                                    className='form-control'
                                    value={vendor}
                                    onChange={ (e) => setVendor(e.target.value) }
                                />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Online</label>
                                <input 
                                    type='checkbox'
                                    name='status'
                                    className='form-control'
                                    value={status}
                                    onChange={ (e) => setStatus(e.target.checked) }
                                />
                            </div>
                            <button className='btn btn-success' onClick={ (e) => saveDevice(e) }>Save</button>
                            &nbsp;&nbsp;
                            <Link to='/devices' className='btn btn-danger'>Cancel</Link>
                        </form>
                    </div>
                
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddDeviceComponent;
