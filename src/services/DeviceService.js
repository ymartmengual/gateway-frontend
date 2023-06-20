import axios from "axios";

const DEVICE_BASE_REST_API_URL = "http://localhost:8080/api/device";

class DeviceService{

    getAllDevices(){
        return axios.get(DEVICE_BASE_REST_API_URL + '/');
    }
    
    createDevice(device){
        return axios.post(DEVICE_BASE_REST_API_URL + '/create', device);
    }

}

export default new DeviceService();