import { ImageGalleryImg, ImageGalleryItemStyled } from "./ImageGalleryItem.styled";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, openModal }) => {

        return (
            <>
            {images.map(img => (
                <ImageGalleryItemStyled key={img.id} onClick={() => openModal(img.largeImageURL)}>
                    <ImageGalleryImg src={img.webformatURL} alt={img.tags} width="40" heigth='40' />
                </ImageGalleryItemStyled>) )}
            </>
        )
};

ImageGalleryItem.propTypes = {
    images: PropTypes.array.isRequired,
}