import { Component } from 'react';
import styles from './search.module.css';
import * as React from 'react';

type Props = {
  defaultValue?: string;
  onSearch: (value: string) => void;
};

class Search extends Component<Props> {
  state = {
    value: this.props.defaultValue || '',
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  handleClick = () => {
    this.props.onSearch(this.state.value);
  };

  render() {
    return (
      <div className={styles.searchContainer}>
        <input
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="search..."
          className={styles.searchInput}
        />
        <button onClick={this.handleClick}>search</button>
      </div>
    );
  }
}

export default Search;
