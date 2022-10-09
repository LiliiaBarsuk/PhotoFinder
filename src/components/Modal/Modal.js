import { Component } from "react";
import { createPortal } from "react-dom";
import { ModalStyled, Overlay } from "./Modal.styled";
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.closeByKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.closeByKeyDown)
    }
    
    closeByKeyDown = (e) => {
        if(e.code === 'Escape') {
            this.props.onCloseModal();
         } 
    }

    render() {
        
        return createPortal(
            <Overlay onClick={this.props.onCloseModal}>
                <ModalStyled>
                    <img src={this.props.image.url} alt={this.props.image.alt} />
                </ModalStyled>
            </Overlay>,
            modalRoot
        )
    }
};

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    image: PropTypes.object.isRequired,
}
