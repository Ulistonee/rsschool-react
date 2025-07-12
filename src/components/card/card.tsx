import { Component } from 'react';

type Props = {
  name: string;
  description: string;
};

class Card extends Component<Props> {
  render() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Card;
