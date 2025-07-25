import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StarWarsService } from '../../services/api';
import type { Person } from '../../types/person';

const PersonDetails = () => {
  const { id } = useParams();
  const [person, setPerson] = useState<Person | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const data = await StarWarsService.fetchPersonById(id);
        setPerson(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load details');
      }
    };
    void load();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!person) return <div>Loading...</div>;

  return (
    <div>
      <h2>{person.name}</h2>
      <p>Height: {person.height}</p>
      <p>Birth year: {person.birth_year}</p>
    </div>
  );
};

export default PersonDetails;
