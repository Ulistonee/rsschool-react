import styles from './tile.module.css';
import type { FormData } from '../../store/formsSlice.ts';

type Props = {
  data: FormData[]
}

export const Tile = ({ data }: Props) => {
  return (
    <>
      <h3 className={styles.tilesHeading}>Uncontrolled Form Data</h3>
      <div className={styles.tilesGrid}>
        {data.map((item, i) => (
          <div key={i} className={styles.tile}>
            <p>
              <b>{item.name}</b>
            </p>
            <p>{item.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};
