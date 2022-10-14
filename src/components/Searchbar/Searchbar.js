import { useState } from "react";
import { SearchbarStyled, SearchForm, SearchFormButton, SearchFormInput } from "./Searchbar.styled";
import {BiSearchAlt2} from 'react-icons/bi';


export const Searchbar = ({ onSubmit }) => {
    const [searchValue, setSearchValue] = useState('')

    const saveInputValue = e => {
        setSearchValue(e.currentTarget.value.toLowerCase());
    
    };

    const submitForm = e => {
        e.preventDefault();
        onSubmit(searchValue);
    }
    
        return (
            <SearchbarStyled>
                <SearchForm onSubmit={submitForm}>
                    <SearchFormButton type="submit" >
                        <span>
                            <BiSearchAlt2 size="100%"/>
                        </span>
                    </SearchFormButton>
                    <SearchFormInput
                        value={searchValue}
                        onChange={saveInputValue}
                        type="text"
                        autoComplete="off"
                        placeholder="Search images and photos"
                    />
                </SearchForm>
            </SearchbarStyled>
        )
    
}