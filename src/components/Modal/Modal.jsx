import { Component } from 'react';
import { ModalStyled, Overlay } from './Modal.styled';
// import PropTypes from 'prop-types';

export class Modal extends Component {
  render() {
    return (
      <Overlay>
        <ModalStyled></ModalStyled>
      </Overlay>
    );
  }
}
