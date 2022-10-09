import { Component } from 'react';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';
import { AppStyled } from './App.styled';

 
const KEY = '29505818-5cb88c7f65aac8c7d69f01816';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
    LOADING: 'loading',
};

export class App extends Component {
  state = {
    images: [],
    status: Status.IDLE,
    searchValue: '',
    error: null,
    page: 1,
    showModal: false,
    largeImg: {
      url: null,
      alt: null,
    },
  }

  saveSearchValue = searchValue => {
    this.setState({ searchValue, page: 1});
  };
  
  async componentDidUpdate(_, prevState) { 
    const URL = `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=15`;
    
    
    if (this.state.searchValue !== prevState.searchValue) {

        this.setState({ images: [], status: Status.PENDING });
        try {
          const imgArray = await fetch(URL)
          .then(response =>  response.json()).then(data => data.hits)
           
            if (imgArray.length === 0) {
            throw new Error("No images with this name");
            }
              
            this.setState({ images: imgArray, status: Status.RESOLVED })
        } catch(error) {
          this.setState({ error, status: Status.REJECTED })
          console.log(error.name);
        }
        return; 
    }

    if (this.state.searchValue === prevState.searchValue && this.state.page !== prevState.page) {

      this.setState({ status: Status.LOADING });
      try {
        const imgArray = await fetch(URL)
        .then(response =>  response.json()).then(data => data.hits)
         
          if (imgArray.length === 0) {
          throw new Error("No images with this name");
          }
            
          this.setState(prevState => ({ images: [...prevState.images, ...imgArray], status: Status.RESOLVED }))
      } catch(error) {
        this.setState({ error, status: Status.REJECTED })
        console.log(error.name);
      }  
    }

  }

  clickLoadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1}))
  }

  changeShowModal = (url, alt) => {
    this.setState({ largeImg: {url, alt} })
  }

  closeModal = () => {
    this.setState( {largeImg: {url: null, alt: null} })
  }

  render() {
    const {images, status} = this.state;
    return (

      <AppStyled>
        <Searchbar onSubmit={this.saveSearchValue}/>
        
        <div>

        {status === 'pending' && <Loader />}

        {status === 'rejected' && <h2>Error</h2>}

        {this.state.images.length > 0 && <ImageGallery images={images} openModal={this.changeShowModal} />}

        
        </div>
        {status === 'loading' && <Loader />}
        {this.state.images.length > 0 && <Button onClickButton={this.clickLoadMore}/>}
        {this.state.largeImg.url && <Modal image={this.state.largeImg} onCloseModal={this.closeModal}/>}

        
      </AppStyled>
    );
  }
};
