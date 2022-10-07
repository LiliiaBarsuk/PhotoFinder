import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem";
import { Component } from "react";




export class ImageGallery extends Component {

    render() {
        const imagesArr = this.props.images;
        return (
            <ul class="gallery">
                <ImageGalleryItem images={imagesArr} /> 
            </ul>
        )
        
        
    }
}