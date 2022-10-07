import { Component } from "react";


export class ImageGalleryItem extends Component {
    render() {
        const images = this.props.images;
        return (
            <>
            {images.map(img => (<li class="gallery-item" key={img.id}>
                    <img src={img.webformatURL} alt={img.tags} width="40" heigth='40' />
                </li>) )}
            </>
        )
    }
}