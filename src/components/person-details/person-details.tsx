'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import styles from './person-details.module.css';
import { usePersonById } from '../../services/hooks/usePersonById';
import { useTranslations } from 'next-intl';

const PersonDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get('person');

  const { data: person, isFetching, error } = usePersonById(id ?? '');

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('person');
    router.push(`?${params.toString()}`);
  };

  const t = useTranslations('Details');

  if (!id) return null;
  if (isFetching) {
    return (
      <section className={styles.loadingContainer}>
        <div className={styles.spinner} />
        <p>Loading person details...</p>
      </section>
    );
  }
  if (error) return <div>{error.message}</div>;
  if (!person) return null;

  return (
    <section>
      <div className={styles.detailsContainer}>
        <button onClick={handleClose} className={styles.closeButton}>
          {t('button')}
        </button>
        <h2>{person.name}</h2>
        <p>Height: {person.height}</p>
        <p>Birth year: {person.birth_year}</p>
      </div>
    </section>
  );
};

export default PersonDetails;
