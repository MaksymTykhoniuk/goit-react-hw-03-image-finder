import { Component } from 'react';
import { ImageGalleryItem, ImageGalleryItemImage } from './ImageGallery.styled';
// import PropTypes from 'prop-types';

export class ImageGallery extends Component {
  render() {
    return (
      <ImageGalleryItem>
        <ImageGalleryItemImage src="" alt="" />
      </ImageGalleryItem>
    );
  }
}
