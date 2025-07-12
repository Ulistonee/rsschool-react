import './App.css';
import { Component } from 'react';
import Search from './components/search/search.tsx';
import Results from './components/results/results.tsx';
import ErrorButton from './components/error-button/error-button.tsx';

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('search') || '',
    query: '',
    throwError: false,
  };

  handleSearch = (value) => {
    const trimmed = value.trim();
    localStorage.setItem('search', trimmed);
    this.setState({ query: trimmed });
  };

  render() {
    return (
      <>
        <Search
          defaultValue={this.state.searchTerm}
          onSearch={this.handleSearch}
        />
        <Results query={this.state.query} />
        <ErrorButton />
      </>
    );
  }
}

export default App;
