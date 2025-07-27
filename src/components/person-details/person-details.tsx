import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StarWarsService } from '../../services/api';
import type { Person } from '../../types/person';
import styles from './person-details.module.css';

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // добавили состояние

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await StarWarsService.fetchPersonById(id);
        setPerson(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load details');
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [id]);

  const handleClose = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <section className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading person details...</p>
      </section>
    );
  }
  if (error) return <div>{error}</div>;
  if (!person) return null;

  return (
    <section className={styles.detailsContainer}>
      <button onClick={handleClose} className={styles.closeButton}>
        &larr; Back
      </button>
      <h2>{person.name}</h2>
      <p>Height: {person.height}</p>
      <p>Birth year: {person.birth_year}</p>
    </section>
  );
};

export default PersonDetails;
