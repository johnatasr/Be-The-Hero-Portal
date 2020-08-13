import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi'
import { Link , useHistory } from 'react-router-dom'
import Modal from '../../components/modal'
import api from '../../services/api';
import './styles.css'
import herosImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'

export default function Logon() {

    const [ alertModal, setAlertModal ] = useState('');
    const [ alertModalTitle, setAlertModalTitle ] = useState('');
    const [ showAlertModal, setShowAlertModal ] = useState(false);

    const [ username, setUser ] = useState('');
    const [ password, setPass ] = useState('');
    const history = useHistory('/');

    async function handleLogin(e) {
        e.preventDefault();

        const data = {
            username,
            password,
        }

        try {
            const response = await api.post("core/token/obtain/", data);
            api.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            history.push('/selectOng');
            
        } catch (err) {
            setShowAlertModal(true)
            setAlertModalTitle("Não foi possível fazer login!")
            setAlertModal("Verifique sua senha ou e-mail...")
        }
    };

    function handleCloseModal() {
        setShowAlertModal(false);
        setAlertModal('');
        setAlertModalTitle('');
    }

    return (
        <div className='logon-container'>
            <section className='form'>
                <img src={logo} alt='Be the hero' />

               <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder='Sua Usuário' 
                        value={username}
                        onChange={e => setUser(e.target.value)}
                    />
                     <input placeholder='Sua Senha'
                        value={password}
                        type="password"
                        onChange={e => setPass(e.target.value)}
                    />
                  
                    <button className='button' 
                        type='submit'
                        >Entrar</button>

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
                    

                    <Link className='buttton-back' to='/register'>
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link> 
                </form> 
                

            </section>
            <img src={herosImg} alt='Heroes' />
        </div>    
    );
}


