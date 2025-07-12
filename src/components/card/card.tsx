import { Component } from 'react';
import styles from './card.module.css';

type Props = {
  name: string;
  description: string;
};

class Card extends Component<Props> {
  render() {
    return (
      <div className={styles.cardContainer}>
        <h3>{this.props.name}</h3>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

export default Card;
