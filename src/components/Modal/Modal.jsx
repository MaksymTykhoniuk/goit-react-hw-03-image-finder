import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalStyled, Overlay } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    image: PropTypes.shape({
      link: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
    onLoad: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscapeKeyCloseModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscapeKeyCloseModal);
  }

  handleEscapeKeyCloseModal = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClickCloseModal = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { link, alt } = this.props.image;

    return createPortal(
      <Overlay onClick={this.handleBackdropClickCloseModal}>
        <ModalStyled>
          <img
            src={link}
            alt={alt}
            onLoad={() => {
              this.props.onLoad();
            }}
          />
        </ModalStyled>
      </Overlay>,
      modalRoot
    );
  }
}
