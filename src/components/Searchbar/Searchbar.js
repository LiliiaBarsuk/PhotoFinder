import { Component } from "react";

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
            <header class="searchbar">
                <form class="form" onSubmit={this.submitForm}>
                    <button type="submit" class="button" >
                        <span class="button-label">Search</span>
                    </button>
                    <input
                    value={this.state.searchValue}
                    onChange={this.saveInputValue}
                    class="input"
                    type="text"
                    autoComplete="off"
                    placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}