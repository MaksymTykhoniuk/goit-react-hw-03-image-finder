import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleInputChange = evt => {
    this.setState({ inputValue: evt.currentTarget.value });
  };

  handleSubmit = evt => {
    const { inputValue } = this.state;
    evt.preventDefault();

    if (inputValue.trim() === '') {
      toast.error('Search query can not bee empty.', {
        theme: 'dark',
      });
      return;
    }

    this.props.onSubmit(inputValue);
    this.clearForm();
  };

  clearForm = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch size="2em" />
          </SearchFormButton>
          <SearchFormInput
            value={inputValue}
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
