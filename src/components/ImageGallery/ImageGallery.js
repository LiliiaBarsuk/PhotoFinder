import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import { ImageGalleryStyled } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

export class ImageGallery extends Component {

    render() {
        const imagesArr = this.props.images;
        return (
            <ImageGalleryStyled>
                <ImageGalleryItem images={imagesArr} openModal={this.props.openModal} /> 
            </ImageGalleryStyled>
        )     
    }
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
}