import { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
// import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  render() {
    return (
      <Header>
        <SearchForm>
          <SearchFormButton type="submit">
            <FcSearch size="2em" />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autocomplete="off"
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Header>
    );
  }
}
