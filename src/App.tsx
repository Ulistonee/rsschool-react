import './App.css';
import { Component } from 'react';
import Search from './components/search/search.tsx';
import Results from './components/results/results.tsx';
import Thrower from './components/thrower/thrower.tsx';
import ErrorBoundary from './components/error-boundary/error-boundary.tsx';

class App extends Component {
  state = {
    searchTerm: localStorage.getItem('search') || '',
    query: localStorage.getItem('search') || '',
    throwError: false,
  };

  handleSearch = (value: string) => {
    const trimmed = value.trim();
    localStorage.setItem('search', trimmed);
    this.setState({ query: trimmed });
  };

  render() {
    if (this.state.throwError) {
      throw new Error('Manual error');
    }
    return (
      <ErrorBoundary>
        <Search
          defaultValue={this.state.searchTerm}
          onSearch={this.handleSearch}
        />
        <Results query={this.state.query} />
        <Thrower />
      </ErrorBoundary>
    );
  }
}

export default App;
