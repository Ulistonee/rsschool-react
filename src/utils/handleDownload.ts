import { saveAs } from 'file-saver';
import type { Person } from '../types/person.ts';

export const handleDownload = (selectedPeople: Record<string, Person>) => {
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
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const fileName = `${people.length}_person.csv`;
  saveAs(blob, fileName);
};
