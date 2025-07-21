import { Component } from 'react';
import Card from '../card/card.tsx';
import type { Person } from '../../types/person.ts';
import { StarWarsService } from '../../services/api.ts';

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
    void this.loadData(this.props.query);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.query !== this.props.query) {
      void this.loadData(this.props.query);
    }
  }

  loadData = async (query: string) => {
    this.setState({ isLoading: true, error: null });

    try {
      const data = await StarWarsService.fetchPeople(query);
      this.setState({ data, isLoading: false });
    } catch (e) {
      this.setState({
        error: e instanceof Error ? e.message : 'Unknown error',
        isLoading: false,
      });
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
