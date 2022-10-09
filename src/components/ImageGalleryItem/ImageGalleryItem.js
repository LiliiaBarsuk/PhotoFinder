import { Component } from "react";
import { ImageGalleryImg, ImageGalleryItemStyled } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
    render() {
        const images = this.props.images;
        return (
            <>
            {images.map(img => (
                <ImageGalleryItemStyled key={img.id} onClick={() => this.props.openModal(img.largeImageURL, img.tags)}>
                    <ImageGalleryImg src={img.webformatURL} alt={img.tags} width="40" heigth='40' />
                </ImageGalleryItemStyled>) )}
            </>
        )
    }
};

ImageGalleryItem.propTypes = {
    images: PropTypes.array.isRequired,
}