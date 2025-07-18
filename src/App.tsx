import './App.css';
import { Component } from 'react';
import Search from './components/search/search.tsx';
import Results from './components/results/results.tsx';
import ErrorThrower from './components/error-thrower/error-thrower.tsx';

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('search') || '',
  };

  handleSearch = (value: string) => {
    const trimmed = value.trim();
    localStorage.setItem('search', trimmed);
    this.setState({ searchTerm: trimmed });
  };

  render() {
    return (
      <>
        <Search
          defaultValue={this.state.searchTerm}
          onSearch={this.handleSearch}
        />
        <Results query={this.state.searchTerm} />
        <ErrorThrower />
      </>
    );
  }
}

export default App;
