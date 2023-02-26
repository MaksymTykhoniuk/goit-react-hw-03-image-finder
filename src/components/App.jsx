import { Component } from 'react';
import RingLoader from 'react-spinners/RingLoader';
import { fetchImage } from '../services/API';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    searchQuery: '',
    loadedImgs: [],
    isLoading: false,
    showModal: false,
    page: 1,
    error: false,
    queryLength: 0,
    modalImage: {
      link: '',
      alt: '',
    },
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;

    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });

        const images = await fetchImage(searchQuery, page);

        this.setState(state => ({
          loadedImgs: [...state.loadedImgs, ...images.hits],
          queryLength: images.totalHits,
        }));
        this.showNotification(images);
      } catch (error) {
        this.setState({ error: true });
        toast.error('Oooops something went wrong...');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  showNotification = images => {
    if (this.state.page === 1) {
      images.hits.length > 0
        ? toast.success(` Wow! We found ${images.total} results!`, {
            theme: 'colored',
          })
        : toast.warn(`Sorry, but there are no results for your query`, {
            theme: 'dark',
          });
    }
  };

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery !== searchQuery) {
      this.setState({ searchQuery, page: 1, loadedImgs: [] });
    }
  };

  handleLoadMoreBtnClick = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  handleImageClick = image => {
    const { largeImageURL, tags } = image;
    console.log('click');
    this.setState({
      isLoading: true,
      showModal: true,
      modalImage: {
        link: largeImageURL,
        alt: tags,
      },
    });
  };

  handleModalLoaded = () => {
    this.setState({ isLoading: false });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { loadedImgs, isLoading, showModal, modalImage, queryLength } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          onClick={this.handleImageClick}
          images={loadedImgs}
        ></ImageGallery>

        {isLoading && (
          <RingLoader
            color="#3f51b5"
            size="120px"
            aria-label="Loading Spinner"
            speedMultiplier={0.7}
            cssOverride={{
              display: 'block',
              margin: '50px auto ',
              borderColor: '#3f51b5',
            }}
          />
        )}

        <>
          {loadedImgs.length >= 12 &&
            isLoading === false &&
            loadedImgs.length !== queryLength && (
              <Button
                text="Load more"
                onClick={this.handleLoadMoreBtnClick}
              ></Button>
            )}
        </>

        {showModal && (
          <Modal
            image={modalImage}
            onLoad={this.handleModalLoaded}
            onClose={this.handleModalClose}
          ></Modal>
        )}
        <ToastContainer />
      </>
    );
  }
}
