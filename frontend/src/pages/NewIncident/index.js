import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import CurrencyInput from '../../components/currencyInput'
import IncidentService from '../../services/IncidentsService'

import './styles.css'
import logo from '../../assets/logo.svg'

export default function NewIncident() {

    const [ titulo, setTitulo ] = useState(''); 
    const [ descricao, setDescricao ] = useState(''); 
    const [ valor, setValor ] = useState(''); 

    const [ msg, setMsg ] = useState('');
    const [ msgColor , setMsgColor ] = useState('#fff');

    const incidentService = new IncidentService();

    async function handleNewIncident(e) {
        e.preventDefault();
        try {
            const data = {
                title: titulo,
                description: descricao,
                value: valor,
                ong: localStorage.getItem('id_ong')
            }

            let response = await incidentService.createIncident(data);

            if ( response == true ) {
                setMsg("Incidente salvo com sucesso !");
                setMsgColor('#119a15');
                setTitulo('');
                setDescricao('');
                setValor('');

            } else {
                alert(`Error em criar novo incidente: ${error}`)
                setMsg('Erro ao salvar, tente outra hora !');
                setMsgColor('#F03131');
                setTitulo('');
                setDescricao('');
                setValor('');
            }
            
        }
        catch (error) {
            alert(`Error em criar novo incidente: ${error}`)
            setMsg('Erro ao salvar, tente outra hora !');
            setMsgColor('#F03131');
        }

    }

    return (
        <div className='new-incident-container'>
            <div className='new-incident-content'>
                <section>
                    <img src={logo} alt='Be the hero' />
                    <h1>Cadastro novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói que resolva isso</p>

                    <Link className='buttton-back' to='/profiles'>
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Titulo do caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />
                    <textarea 
                        style={{fontFamily: 'sans-serif'}}
                        placeholder="Descrição" 
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />

                    <CurrencyInput placeholder="R$0.00" type="text" onChange={e => setValor(e.target.value)}/>
                 
                    <button className='button' type='submit'>Cadastrar</button>

                    <span id="span-msg" style={{ background: msgColor }}>{msg}</span>

                </form>
            </div>
        </div>
    );
} 