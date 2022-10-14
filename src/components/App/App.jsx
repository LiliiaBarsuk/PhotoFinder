import { Component } from 'react';
import { Button } from '../Button/Button';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { Searchbar } from '../Searchbar/Searchbar';
import { AppStyled } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { fetchData } from 'services/api';

 
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

async componentDidUpdate(_, prevState) { 
    const URL = `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=15`;
    
    if (this.state.searchValue !== prevState.searchValue) {
      this.setState({ images: [], status: Status.PENDING });

      try {
        const imgArray = await fetchData(URL);
           
            if (imgArray.length === 0) {
            throw new Error("No images with this name");
            }
              
            this.setState({ images: imgArray, status: Status.RESOLVED })
            toast.success("Images found.")
        } catch(error) {
          this.setState({ error, status: Status.REJECTED })
          toast.error("No images with this title.")
        }
        return; 
    }

    if (this.state.searchValue === prevState.searchValue && this.state.page !== prevState.page) {

      this.setState({ status: Status.LOADING });
      try {
        const imgArray = await fetchData(URL);
         
          if (imgArray.length === 0) {
          throw new Error("No more images with this title.");
          }
            
          this.setState(prevState => ({ images: [...prevState.images, ...imgArray], status: Status.RESOLVED }))
      } catch(error) {
        this.setState({ error, status: Status.REJECTED })
        toast.error("No more images with this title.")
      }  
    }

  }

  saveSearchValue = searchValue => {
    if (searchValue === '') {
      toast.error("Please enter a search query.")
    }
    
    this.setState({ searchValue, page: 1});
  };

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
    const {images, status, largeImg} = this.state;
    return (
      <AppStyled>
        <Searchbar onSubmit={this.saveSearchValue}/>
        
        <div>
          {status === 'pending' && <Loader />}

          {images.length > 0 && <ImageGallery images={images} openModal={this.changeShowModal} />} 
        </div>

        {status === 'loading' && <Loader />}

        {images.length > 0 && <Button onClickButton={this.clickLoadMore}/>}

        {largeImg.url && <Modal image={largeImg} onCloseModal={this.closeModal}/>}
        <Toaster position="top-right" reverseOrder={false} toastOptions={{duration: 5000}}/>
      </AppStyled>
    );
  }
};
