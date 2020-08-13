import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import InputMask from 'react-input-mask'
import Modal from '../../components/modal'
import OngServices from '../../services/OngsServices'

import './styles.css'
import logo from '../../assets/logo.svg'

export default function NewOng() {

    const ongService = new OngServices();

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ cidade, setCidade ] = useState('');
    const [ uf, setUf ] = useState('');

    const [ alertModal, setAlertModal ] = useState('');
    const [ alertModalTitle, setAlertModalTitle ] = useState('');
    const [ showAlertModal, setShowAlertModal ] = useState(false);
    
    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const dataOngCreation = {
            name,
            email,
            whatsapp,
            cidade,
            uf
        };

        try {                     
            let createOngResponse = await ongService.createOng(dataOngCreation, 'ong');
            console.log(createOngResponse)
            if ( createOngResponse == true ){
                history.push('/selectOng');
            } else {
                setShowAlertModal(true)
                setAlertModalTitle("Não foi possível salvar a ONG!")
                setAlertModal("Algo não ocorreu como esperado...")
            }
                    
        } catch (err) {
            setShowAlertModal(true)
            setAlertModalTitle("Não foi possível salvar!")
            setAlertModal("Possivelmente exista um e-mail cadastrado...")
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

                    <Link className='buttton-back' to='/selectOng'>
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para seleção de ONGs
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
                    <input placeholder="Nome da ONG" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input placeholder="E-mail" 
                        value={email}
                        onChange={e=> setEmail(e.target.value)}
                    />
                    
                    <InputMask mask="(99)99999-9999" 
                        placeholder="Whatsapp" 
                        value={whatsapp}
                        onChange={e=> setWhatsapp(e.target.value)} />
    
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
                  
                </form>
            </div>           
        </div>
    );
}


