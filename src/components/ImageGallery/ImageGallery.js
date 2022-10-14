import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { ImageGalleryStyled } from "./ImageGallery.styled";
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, openModal }) => {

        return (
            <ImageGalleryStyled>
                <ImageGalleryItem images={images} openModal={openModal} /> 
            </ImageGalleryStyled>
        )     
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
}