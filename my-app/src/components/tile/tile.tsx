import styles from './tile.module.css';
import type { FormData } from '../../store/formsSlice.ts';

type Props = {
  data: FormData[];
  highlightIndex?: number | null;
};

export const Tile = ({ data, highlightIndex }: Props) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.tilesHeading}>Uncontrolled Form Data</h4>
        {data.map((item, i) => (
          <div
            key={i}
            className={`${styles.tile} ${highlightIndex === i ? styles.highlight : ''}`}
          >
            <p>Name: </p><p>{item.name}</p>
            <p>Age: </p><p>{item.age}</p>
            <p>Email: </p><p>{item.email}</p>
            <p>Gender: </p><p>{item.gender}</p>
            <p>Country: </p><p>{item.country}</p>
          </div>
        ))}
    </div>
  );
};
