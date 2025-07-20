import { Component } from 'react';
import Card from '../card/card.tsx';
import type { Person } from '../../types/person.ts';

type State = {
  isLoading: boolean;
  error: string | null;
  data: Person[];
};

type Props = {
  query: string;
};

class Results extends Component<Props, State> {
  state: State = {
    isLoading: false,
    error: null,
    data: [],
  };

  componentDidMount() {
    void this.fetchData(this.props.query);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.query !== this.props.query) {
      void this.fetchData(this.props.query);
    }
  }

  fetchData = async (query: string) => {
    this.setState({ isLoading: true, error: null });

    const url = query
      ? `https://swapi.py4e.com/api/people/?search=${query}`
      : `https://swapi.py4e.com/api/people/`;

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const json = await response.json();

      this.setState({
        data: json.results || [],
        isLoading: false,
      });
    } catch (e) {
      if (e instanceof Error) {
        this.setState({ error: e.message, isLoading: false });
      } else {
        this.setState({ error: 'Unknown error', isLoading: false });
      }
    }
  };

  render() {
    const { isLoading, error, data } = this.state;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <section data-testid="results">
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <Card
                name={item.name}
                description={`Height: ${item.height} см, Year of birth: ${item.birth_year}`}
              />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default Results;
