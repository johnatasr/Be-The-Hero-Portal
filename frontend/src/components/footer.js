import React from 'react';
import { Row, Col } from 'react-bootstrap'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

const footerStyle = {
    "margin-top": "60px",
    "background-color": "#41414d",
    "height": "200px",
    "position": "absolute",
    "width": "100%",
    "display": "block"
}

const colRol1Center = {
    "padding-left": "150px",
    "padding-right": "150px",
    "margin-top": "20px"
}

const colRol2Center = { 
    "margin-top": "25px",
    "align-items": "center",
    "padding-left": "180px",
    "color": "#fff"
}

const githubIcon = {
    "margin-left": "140px",
    "margin-top": "20px",
    "width": "150px",
    "color": "#fff",
    "height": "80px"
}

const linkedinIcon = {
    "margin-left": "80px",
    "margin-top": "20px",
    "width": "150px",
    "color": "#fff",
    "height": "80px"
}



const Footer = () => {
 
  return (
    <div style={footerStyle}>
        <Row>
            <Col></Col>
            <Col style={colRol1Center} xs={6}>
                <AiFillGithub style={githubIcon} 
                    onMouseOver={({target})=>target.style.color='#e02041'} 
                    onMouseOut={({target})=>target.style.color='#fff'} 
                    onClick={event =>  window.location.href='https://github.com/johnatasr'} />
                <AiFillLinkedin style={linkedinIcon}
                    onMouseOver={({target})=>target.style.color='#e02041'} 
                    onMouseOut={({target})=>target.style.color='#fff'} 
                    onClick={event =>  window.location.href='https://www.linkedin.com/in/johnatas-rabelo-690579117/'} />
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col></Col>
            <Col style={colRol2Center} xs={5}>2020 - Projeto desenvolvido pela Rocketseat, com melhorias por Johnatas</Col>
            <Col></Col>
        </Row>
    </div>    
  );
};

export default Footer;