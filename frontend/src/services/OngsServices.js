import api from '../services/api'

export default class OngsService{

    constructor(){}

    async getOngs() {
        const data = await api.get('api/ongs/list_ongs/');
        return data
    }
    
    async createOng(dataOngCreation, type) {
        const response = await api.post('api/ongs/create_ong/', dataOngCreation);
        console.log(response)

        if ( response.status == 200){
            if ( type == 'log' ){
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
            }

            return true
        } 

        else {
            return false
        }
    }
}