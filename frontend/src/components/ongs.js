import React, { Component } from 'react';
import OngsServices from '../services/OngsServices'
import '../pages/Logon/styles.css'
import herosImg from '../assets/heroes.png'
import logo from '../assets/logo.svg'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'


class SelectOng extends Component {
    constructor () {
        super();
        this.state ={
            options : [],
            selectedOption: '',
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selecionaOng = this.selecionaOng.bind(this);
    };

    selecionaOng(e){
        e.preventDefault();
        localStorage.setItem('id_ong', this.state.selectedOption);
        this.props.history.push("/profiles");
    }


    async componentDidMount () {
        const ongsServices = new OngsServices();
        const response =  await ongsServices.getOngs();
        let options = response.data.lista_ongs.map(function (option) {
            return { value: option.id, label: option.name };
        })
        this.setState({options : options})
    }

    handleChange(e) {
        this.setState({selectedOption: e.target.value})
    }

    render() {

        const ongs = this.state.options ; 

        return (
                <div className='logon-container'>   
                    <img src={herosImg} alt='Heroes' />
                    <section className='form'>
                        <img src={logo} alt='Be the hero' />
                        
                        <form onSubmit={this.selecionaOng}>
                            <h1>Selecione uma de suas ONGs cadastradas: </h1>

                            <select style={{width: '100%', height: '55px', borderRadius: '8px', border: '5px'}} value={this.state.selectedOption} onChange={this.handleChange}>
                                <option value="">Selecione</option>
                                {
                                    ongs && ongs.map(function (ong) {
                                        return <option key={ong.value} value={ong.value}>{ong.label}</option>
                                    })
                                }

                            </select>
                                                                         
                            <button className='button' 
                            type='submit'
                            >Entrar</button>
                            
            
                            <Link className='buttton-back' to='/newOng'>
                                <FiLogIn size={16} color="#E02041"/>
                                Não tenho nenhuma ONG
                            </Link>
                        </form>
            
                    </section> 
                </div>    
            );

    }
}

export default SelectOng;



