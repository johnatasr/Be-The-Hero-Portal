import api from '../services/api'

export default class IncidentsService{

    constructor(){}

    async getIncidents(id, page) {
        const data = await api.get(`api/incidents/listIncidents/`, { 
            params: {
                page: page,
                id: id
            }});      
        return data
    }

    async searchIncidents(id, title) {
        const data = await api.get(`api/incidents/searchIncidents/`, { 
            params: {
                title: title,
                id: id
            }});      
        return data
    }

  
    async deleteIncident(id, ong){
        await api.delete('api/incidents/delete_incident/', { 
            params: {
                ong: ong,
                id: id
            }});   
    }
    
    async createIncident(payload){
        const url = `api/incidents/createIncident/`;
        let response = await api.post(url, payload);
        
        if (response.status == 200 || response.status == 201) {
            return true
        }
        else {
            return false
        }
    }
  
}