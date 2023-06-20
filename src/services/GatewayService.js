import axios from "axios";


const GATEWAY_BASE_REST_API_URL = "http://localhost:8080/api/gateway";

class GatewayService{

    getAllGateways(){
        console.log('dio clic en all gateways')
        return axios.get(GATEWAY_BASE_REST_API_URL + '/');
    }


    

}

export default new GatewayService();