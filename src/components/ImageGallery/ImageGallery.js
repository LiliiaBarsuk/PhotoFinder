import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";
import { ImageGalleryStyled } from "./ImageGallery.styled";




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