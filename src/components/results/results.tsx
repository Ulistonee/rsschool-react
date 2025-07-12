import { Component } from 'react';
import Card from '../card/card.tsx';

type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birthYear: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

type State = {
  loading: boolean;
  error: string | null;
  data: Person[];
};

type Props = {
  query: string;
};

class Results extends Component<Props, State> {
  state: State = {
    loading: false,
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
    this.setState({ loading: true, error: null });

    const url = query
      ? `https://swapi.py4e.com/api/people/?search=${query}`
      : `https://swapi.py4e.com/api/people/`;

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const json = await response.json();

      this.setState({
        data: json.results || [],
        loading: false,
      });
    } catch (e) {
      if (e instanceof Error) {
        this.setState({ error: e.message, loading: false });
      } else {
        this.setState({ error: 'Unknown error', loading: false });
      }
    }
  };

  render() {
    const { loading, error, data } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div>
        {data.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            description={`Height: ${item.height} см, Year of birth: ${item.birthYear ? item.birthYear : 'unknown'}`}
          />
        ))}
      </div>
    );
  }
}

export default Results;
