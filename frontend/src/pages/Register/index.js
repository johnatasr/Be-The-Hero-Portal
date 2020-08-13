import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import { Carousel } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import axios from 'axios'
import Modal from '../../components/modal'
import OngServices from '../../services/OngsServices'
import api from '../../services/api'
import './styles.css'
import logo from '../../assets/logo.svg'

export default function Register() {

    const ongService = new OngServices();


    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ password2, setPassword2 ] = useState('');
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ cidade, setCidade ] = useState('');
    const [ uf, setUf ] = useState('');

    const [ alertModal, setAlertModal ] = useState('');
    const [ alertModalTitle, setAlertModalTitle ] = useState('');
    const [ showAlertModal, setShowAlertModal ] = useState(false);

    const [ spanAlert, setSpanAlert ] = useState(false)
    const [ spanAlertMessage, setSpanAlertMessage ] = useState('')
    

    const history = useHistory('/');

    async function handleRegister(e){
        e.preventDefault();

        if ( password != password2 ) {
            setSpanAlert(true)
            setSpanAlertMessage('Senhas devem ser iguais') 
        } else {

            setSpanAlert(false)
            setSpanAlertMessage('')
            
            const dataUserCreation = {
                "email": email,
                "username": user,
                "password": password
            }
           
            const dataOngCreation = {
                name,
                email,
                whatsapp,
                cidade,
                uf
            };
    
            try {          
                let createUserResponse = await axios.post('http://192.168.0.47:8000/core/user/create/', dataUserCreation)
    
                if ( createUserResponse.data != null || createUserResponse.data != undefined || 
                    createUserResponse.status == 200 || createUserResponse.status == 201) {
                    let response = await api.post("core/token/obtain/", { username: user , password: password });
                    
                    api.defaults.headers['Authorization'] = "JWT " + response.data.access;
                    
                    localStorage.setItem('access_token', response.data.access);
                    localStorage.setItem('refresh_token', response.data.refresh);
                    
                    let createOngResponse = await ongService.createOng(dataOngCreation, 'ong');
                    
                    if ( createOngResponse == true ){
                        history.push('/');
                    } else {
                        setShowAlertModal(true)
                        setAlertModalTitle("Não foi possível salvar a ONG!")
                        setAlertModal("Algo não ocorreu como esperado...")
                    }           
                }
             
            } catch (err) {
                setShowAlertModal(true)
                setAlertModalTitle("Não foi possível salvar!")
                setAlertModal("Possivelmente exista um e-mail cadastrado...")
            }      
        }       
    };

    function handleCloseModal() {
        setShowAlertModal(false);
        setAlertModal('');
        setAlertModalTitle('');
    }


    return (
        <div className='register-container'>
            <div className='register-content'>
                <section>
                    <img src={logo} alt='Be the hero' />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className='buttton-back' to='/'>
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para Logon
                    </Link>
                </section>

                { showAlertModal ? 
                    <Modal 
                        title={alertModalTitle}
                        body={alertModal}
                        handleShow={showAlertModal}
                        handleClose={handleCloseModal}
                        handleFunction={null}
                        arg={false} />
                    : <div></div>
                }


                <div></div>
                <form onSubmit={handleRegister}>
                    <Carousel wrap={false} interval={null}>
                        <Carousel.Item>
                            <input placeholder="Usuário" 
                                    value={user}
                                    onChange={e=> setUser(e.target.value)}
                            />
                            <input placeholder="E-mail" 
                                value={email}
                                onChange={e=> setEmail(e.target.value)}
                            />
                            <input placeholder="Senha" 
                                value={password}
                                onChange={e=> setPassword(e.target.value)}
                                type="password"
                            />
                            <input placeholder="Confirme Senha" 
                                value={password2}
                                onChange={e=> setPassword2(e.target.value)}
                                type="password"
                            />

                            {
                                spanAlert ?
                                    <div className='password-alert'><span>{spanAlertMessage}</span></div>
                                    :
                                    <div></div>
                            }
                            
                        </Carousel.Item>
                        <Carousel.Item>
                            <input placeholder="Nome da ONG" 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                            
                            <InputMask mask="(99)99999-9999"
                                placeholder="Whatsapp" 
                                value={whatsapp}
                                onChange={e=> setWhatsapp(e.target.value)}/>
                           
                            <div className='input-container'>
                                <input placeholder="Cidade" 
                                    value={cidade}
                                    onChange={e=> setCidade(e.target.value)}
                                />    
                                <input placeholder="UF" 
                                    style={{ width: 80 }} 
                                    value={uf}
                                    onChange={e => setUf(e.target.value)}
                                />
                            </div>

                            <button className='button' onClick={handleRegister} type='submit'>Cadastrar</button>

                            {
                                spanAlert ?
                                    <div className='password-alert'><span>{spanAlertMessage}</span></div>
                                    :
                                    <div></div>
                            }
                        </Carousel.Item>
                    </Carousel>
       
                </form>
            </div>         
        </div>
    );
}


