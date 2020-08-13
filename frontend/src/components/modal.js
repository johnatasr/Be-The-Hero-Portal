import React from 'react';
import { Modal, Button } from 'react-bootstrap'

const buttonStyles = {
  "background-color": "#e02041"
}


export default function ModalComp({title, body, handleShow, handleClose, handleFunction, arg }) {
   
    return (
      <>
        <Modal show={handleShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
          <Modal.Footer>
            {
              arg == false && handleFunction == null ?
                <div></div>
                : arg === false ?
                  <Button style={buttonStyles} onClick={() => handleFunction()}>
                    Sim
                  </Button>
                  :
                  <Button style={buttonStyles} onClick={() => handleFunction(arg)}>
                    Sim
                  </Button>
            }
            
            <Button style={buttonStyles} onClick={handleClose}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }