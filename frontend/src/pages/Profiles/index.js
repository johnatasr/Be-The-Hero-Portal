import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiSearch } from 'react-icons/fi'

import Pagination from '../../components/pagination'
import Footer from '../../components/footer'
import Modal from '../../components/modal'

import './styles.css'
import logo from '../../assets/logo.svg'

import IncidentService from '../../services/IncidentsService';

export default function Profile() {

    const history = useHistory();

    const [ incidents, setIncidents ] = useState([]); 
    const [ idIncident, setIdIncident ] = useState('');
    const [ listIncidentsSearch, setlistIncidentsSearch ] = useState([]);
    const [ activeListSearch, setActiveListSearch ] = useState(false);
    const [ titleSearch, setTitleSearch ] = useState('');
    const [ page , setPage ] = useState('1');
    const [ loaded, setLoaded ] = useState(false);
    const [ incidentsPerPage ] = useState(8);
    const [ name, setName ] = useState('Anônimo');
    const [ total, setTotal ] = useState('0');
    const [ totalSearch, setTotalSearch ] = useState('0');
    const [ msgAlert, setMsgAlert ] = useState('');
    const [ alert, setAlert ] = useState(false);
    const [ active, setActive ] = useState(1);

    const [ showLogout, setShowLogout ] = useState(false);
    const [ showDelete, setShowDelete ] = useState(false);


    const incidentService = new IncidentService();
    let id = localStorage.getItem('id_ong');

    useEffect(() => {
        async function searchIncidentsStart() {

            if ( loaded != true ) {
                try {
                    setAlert(true);
                    setMsgAlert("Carregando ...");
                    const response = await incidentService.getIncidents(id, page);
                    
                    setAlert(false);
                    setMsgAlert("");

                    if ( response.data.total > 0 ) {
                        setIncidents(response.data.incidents);
                        setName(response.data.ong);
                        setTotal(response.data.total);
                        setLoaded(true);
                    } else {
                        setName(response.data.ong);
                        setAlert(true);
                        setMsgAlert("Ong não possui nenhum incidente !");
                    }
                    
                }
                catch (error) {
                    setAlert(true);
                    setMsgAlert("Erro ao carregar incidentes :(");
                    history.push('/');
                    localStorage.clear();
                }
            }     
        }
    
        searchIncidentsStart();
    
    }, [localStorage.getItem('id_ong')])

    
    async function handleDeleteIncident (id){
        try {
            const ongId = localStorage.getItem('id_ong')
            await incidentService.deleteIncident(id, ongId)

            setIncidents(incidents.filter(incident => incident.id !== id ));
            setTotal(total - 1);
            setShowDelete(false)
    
            await searchIncidentsStart()
        }
        catch (error){
            alert(`Erro em deletar incidente: ${error}`);
            history.push('/');
            localStorage.clear();
        }
    }


    function deleteIncident (id){
        try {
            setShowDelete(true)
            setIdIncident(id)
        }
        catch (error){
            console.log(error)
        }
    }

    async function paginateIncidents(numberPage) {
        try {
            
            setActive(numberPage);
            const response = await incidentService.getIncidents(id, numberPage);
    
            if ( response.data.total > 0 ) {
                setIncidents(response.data.incidents);
                setPage(numberPage);
            } else {
                setAlert(true);
                setMsgAlert("Ong não possui nenhum incidente !");
            }      
        }
        catch (error) {
            setAlert(true);
            setMsgAlert("Erro ao carregar incidentes :(");
            history.push('/');
            localStorage.clear();
        }
    }


    function paginateWithoutReq(number) {
        setPage(number)
        setActive(number)
    }

    async function searchIncidents() {
        try {  
            if ( titleSearch != '' | titleSearch != undefined ){
                const response = await incidentService.searchIncidents(id, titleSearch);
                console.log(response)

                if ( response.data.incidents.length > 0 ) {
                    setAlert(false);
                    setActiveListSearch(true);
                    setlistIncidentsSearch(response.data.incidents);
                    setTotalSearch(response.data.total);
                    
                } else {
                    setAlert(true);
                    setMsgAlert(`Não foi possivel encontrar títulos com "${titleSearch}"`);
                }    
            }        
        }
        catch (error) {
            setAlert(true);
            setMsgAlert("Não foi possível concluir a pesquisa :(");
            history.push('/');
            localStorage.clear();
        }
    }

    function handleChangeSearch(e){

        if ( e.target.value === undefined || e.target.value === "" || e.target.value === null ) {
            setActiveListSearch(false)
            setTitleSearch('')
        } else {
            setTitleSearch(e.target.value)
        }
    }

    function logout() {
        setShowLogout(true)
    }

    function handleLogout() {
        setIncidents([]);
        setlistIncidentsSearch([]);
        id = '';
        localStorage.clear();
        history.push('/');
    }

    function backToSelectOngs() {
        history.push('/selectOng')
    }

    function handleCloseModal() {
        setShowDelete(false)
        setShowLogout(false)
    }


    const indexOfLastIncident = parseInt(page) * incidentsPerPage;
    const indexOfFirstIncident = indexOfLastIncident - incidentsPerPage;
    const currentIncidents = listIncidentsSearch.slice(indexOfFirstIncident, indexOfLastIncident);


    return (
        <>
            <div className='profile-container'>
                <header>
                    <img src={logo} alt='Be the hero' />
                    <span>Bem vindo(a), <b>{name}</b> </span>

                    <span>Total de Incidentes: <b>{total}</b> </span>

                    <Link className='button' to='/newincident'>Cadastrar novo caso</Link>
                    <button type='button' onClick={logout}>
                        <FiPower size={18} color='#e02041'/>
                    </button>
                </header>
        
                     
                <div className="sub-header">
                    <h1>Casos Cadastrados</h1>
                    <buttom type="button" onClick={backToSelectOngs} className="selecionar-ongs">Selecionar outra ONG</buttom>
                </div>
                

                <div className='search-bar'>
                    <label>Procure aqui o caso</label>
                    <input type='text' onChange={ e => handleChangeSearch(e)}></input>
                    <button onClick={searchIncidents} className="button-search">
                        <FiSearch size={30} color="#fff"/>
                    </button>                      
                
                </div>

                { 
                    showDelete ?
                        <Modal 
                            title="Deseja deletar o incidente ? "
                            body="Não será possível recupera-lo"
                            handleShow={showDelete}
                            handleClose={handleCloseModal}
                            handleFunction={handleDeleteIncident}
                            arg={idIncident}
                             />
                        : <div></div>

                }


                { 
                    showLogout ?
                        <Modal 
                            title="Deseja sair ? "
                            body="Não quer ficar mais um pouco ?"
                            handleShow={showLogout}
                            handleClose={handleCloseModal}
                            handleFunction={handleLogout}
                            arg={false} />
                        : <div></div>

                }


                {
                    alert ? 
                        <div className='error-message-main'>
                            <h2>{msgAlert}</h2>
                        </div>
                        :
                        <>  
                            <ul>
                                { 
                                    activeListSearch ?
                                        currentIncidents.map( incident => (
                                            <li key={incident.id}>
                                                <strong>CASO:</strong>
                                                <p>{incident.title}</p>
                        
                                                <strong>DESCRIÇÃO:</strong>
                                                <p>{incident.description}</p>
                                            
                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <div>
                                                        <strong>QUANTO PRECISAMOS:</strong>
                                                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                                                    </div>
                                                    
                                                    <div style={{ marginLeft: 130, backgroundColor: '#e02041', padding: 15, borderRadius: 8}}>
                                                        <strong style={{ color: "#fff" }}>QUANTO TEMOS:</strong>
                                                        <p style={{ fontSize: 25, color: '#fff' }}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value_total)}</p>
                                                    </div>
                                                </div>
                                                
                                                <button onClick={() => {deleteIncident(incident.id)}} type='button'><FiTrash2 size={20} color="#a8a8b3"/></button>
                                            </li>
                                        ))
                                        : 
                                          
                                        incidents.map( incident => (
                                            <li key={incident.id}>
                                                <strong>CASO:</strong>
                                                <p>{incident.title}</p>
                        
                                                <strong>DESCRIÇÃO:</strong>
                                                <p>{incident.description}</p>

                                                <div style={{display: 'flex', flexDirection: 'row'}}>
                                                    <div>
                                                        <strong>QUANTO PRECISAMOS:</strong>
                                                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                                                    </div>
                                                    
                                                    <div style={{ marginLeft: 130, backgroundColor: '#e02041', padding: 15, borderRadius: 8}}>
                                                        <strong style={{ color: "#fff" }}>QUANTO TEMOS:</strong>
                                                        <p style={{ fontSize: 25, color: '#fff' }}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value_total)}</p>
                                                    </div>
                                                </div>
                                                
                                                <button onClick={() => {deleteIncident(incident.id)}} type='button'><FiTrash2 size={20} color="#a8a8b3"/></button>
                                            </li>
                                        ))       
                                }             
                            </ul>
                        </>           
                }
                                         
            </div>

            { alert ? 
                    <div></div>
                : activeListSearch ?
                    <div className="pagination-bottom">
                        <Pagination
                            incidentsPerPage={incidentsPerPage}
                            totalIncidents={totalSearch}
                            paginate={paginateWithoutReq}
                            active={active}                          
                        />
                    </div> 
                    :
                    <div className="pagination-bottom">
                        <Pagination
                            incidentsPerPage={incidentsPerPage}
                            totalIncidents={total}
                            paginate={paginateIncidents}
                            active={active}
                        />
                    </div>
            }       
            
            <Footer />
          
        </>
    );
}





