import { Component } from 'react';
import Card from '../card/card.tsx';

type Props = {
  query: string;
};

class Results extends Component<Props> {
  state = {
    loading: false,
    error: null,
    data: [],
  };

  componentDidMount() {
    this.fetchData(this.props.query);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.fetchData(this.props.query);
    }
  }

  fetchData = async (query) => {
    this.setState({ loading: true, error: null });

    const url = query
      ? `https://swapi.py4e.com/api/people/?search=${query}`
      : `https://swapi.py4e.com/api/people/`;

    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

      const json = await response.json();

      this.setState({
        data: json.results || [],
        loading: false,
      });
    } catch (e) {
      this.setState({ error: e.message, loading: false });
    }
  };

  render() {
    const { loading, error, data } = this.state;

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div>
        {data.map((item, index) => (
          <Card
            key={index}
            name={item.name}
            description={`Рост: ${item.height} см, Год рождения: ${item.birth_year}`}
          />
        ))}
      </div>
    );
  }
}

export default Results;
