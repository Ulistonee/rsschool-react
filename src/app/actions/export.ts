'use server';

import type { Person } from '../../types/person.ts';

export async function generateCsv(selectedPeople: Record<string, Person>) {
  const people = Object.values(selectedPeople);
  const csvRows = [
    ['Name', 'Height', 'Birth Year', 'URL'],
    ...people.map((person) => [
      person.name,
      person.height,
      person.birth_year,
      person.url,
    ]),
  ];

  const csvContent = csvRows.map((row) => row.join(',')).join('\n');
  console.log('test', csvContent);
  return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
}
