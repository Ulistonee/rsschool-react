import styles from './tile.module.css';
import type { FormData } from '../../store/formsSlice.ts';

type Props = {
  data: FormData[]
}

export const Tile = ({ data }: Props) => {
  return (
    <>
      <h4 className={styles.tilesHeading}>Uncontrolled Form Data</h4>
      <div className={styles.tilesGrid}>
        {data.map((item, i) => (
          <div key={i} className={styles.tile}>
            <p>{item.name}</p>
            <p>{item.age}</p>
            <p>{item.email}</p>
            <p>{item.gender}</p>
            <p>{item.country}</p>
          </div>
        ))}
      </div>
    </>
  );
};
