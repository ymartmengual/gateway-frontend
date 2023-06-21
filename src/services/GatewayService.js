import axios from "axios";


const GATEWAY_BASE_REST_API_URL = "http://localhost:8080/api/gateway";

class GatewayService{

    getAllGateways(){
        return axios.get(GATEWAY_BASE_REST_API_URL + '/');
    }

    createGateway(gateway){
        return axios.post(GATEWAY_BASE_REST_API_URL + '/create', gateway);
    }
    
    getGatewayById(idGateway){
        return axios.get(GATEWAY_BASE_REST_API_URL + '/' + idGateway);
    }

    deleteDeviceFromGatewayByIdGatewayAndIdDevice(idGateway, idDevice){
        return axios.delete(GATEWAY_BASE_REST_API_URL + '/delete/' + idGateway + '/' + idDevice);
    }

    addDeviceToGatewayByIdGatewayAndIdDevice(idGateway, idDevice){
        return axios.put(GATEWAY_BASE_REST_API_URL + '/' + idGateway + '/add-device/' + idDevice);
    }

}

export default new GatewayService();