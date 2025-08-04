import { useSearchParams } from 'react-router-dom';
import { StarWarsService } from '../../services/api';
import styles from './person-details.module.css';
import { useQuery } from '@tanstack/react-query';

const PersonDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('person');

  const {
    data: person,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['person', id],
    queryFn: () => {
      if (!id) throw new Error('No person ID');
      return StarWarsService.fetchPersonById(id);
    },
    enabled: Boolean(id),
  });

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('person');
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <section className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading person details...</p>
      </section>
    );
  }
  if (error) return <div>{error.message}</div>;
  if (!person) return null;
  if (!id) return null;

  return (
    <section>
      <div className={styles.detailsContainer}>
        <button onClick={handleClose} className={styles.closeButton}>
          Close
        </button>
        <h2>{person.name}</h2>
        <p>Height: {person.height}</p>
        <p>Birth year: {person.birth_year}</p>
      </div>
    </section>
  );
};

export default PersonDetails;
