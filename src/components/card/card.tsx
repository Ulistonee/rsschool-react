import styles from './card.module.css';

type Props = {
  name: string;
  description: string;
};

const Card = ({ name, description }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default Card;
