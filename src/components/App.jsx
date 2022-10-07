import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
 
const KEY = '29505818-5cb88c7f65aac8c7d69f01816';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    images: [],
    status: Status.IDLE,
    searchValue: '',
    error: null,
    page: 1,
  }

  saveSearchValue = searchValue => {
    this.setState({ searchValue, page: 1});
  };
  
  async componentDidUpdate(_, prevState) { 
    const URL = `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;
    
    
    if (this.state.searchValue !== prevState.searchValue) {

        this.setState({ status: Status.PENDING });
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

      this.setState({ status: Status.PENDING });
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

  render() {
    const {images, status} = this.state;
    return (

      <div>
        <Searchbar onSubmit={this.saveSearchValue}/>
        
        <div>

        {status === 'pending' && <h1>Loading</h1>}

        {status === 'rejected' && <h2>Error</h2>}

        {this.state.images.length > 0 && <ImageGallery images={images} />}
        {this.state.images.length > 0 && <Button onClickButton={this.clickLoadMore}/>}
        </div>
        

        
      </div>
    );
  }
};
