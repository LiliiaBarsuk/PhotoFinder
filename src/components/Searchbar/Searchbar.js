import { Component } from "react";
import { SearchbarStyled, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";
import {BiSearchAlt2} from 'react-icons/bi'
export class Searchbar extends Component {
    state = {
        searchValue: '',
    }

    saveInputValue = e => {
        this.setState({ searchValue: e.currentTarget.value.toLowerCase() });
    };

    submitForm = e => {
        e.preventDefault();
        if (this.state.searchValue.trim() === '') {
            console.log('Error');
        }

        this.props.onSubmit(this.state.searchValue);
    }

    render() {
        return (
            <SearchbarStyled>
                <SearchForm onSubmit={this.submitForm}>
                    <SearchFormButton type="submit" >
                        <span>
                            <BiSearchAlt2 size="100%"/>
                        </span>
                    </SearchFormButton>
                    <SearchFormInput
                    value={this.state.searchValue}
                    onChange={this.saveInputValue}
                    type="text"
                    autoComplete="off"
                    placeholder="Search images and photos"
                    />
                </SearchForm>
            </SearchbarStyled>
        )
    }
}