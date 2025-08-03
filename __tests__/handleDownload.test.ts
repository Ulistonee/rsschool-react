import { describe, it, expect, vi, MockedFunction, afterEach } from 'vitest';
import { saveAs } from 'file-saver';
import type { Person } from '../src/types/person';
import { handleDownload } from '../src/utils/handleDownload';

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

const mockSaveAs = saveAs as MockedFunction<typeof saveAs>;

function readBlob(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(blob);
  });
}

describe('handleDownload', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should correctly create a CSV file with data', async () => {
    const selectedPeople: Record<string, Person> = {
      '1': {
        name: 'Luke Skywalker',
        height: '172',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/1/',
      },
      '2': {
        name: 'Leia Organa',
        height: '150',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/5/',
      },
    };

    const expectedCSV = [
      'Name,Height,Birth Year,URL',
      'Luke Skywalker,172,19BBY,https://swapi.dev/api/people/1/',
      'Leia Organa,150,19BBY,https://swapi.dev/api/people/5/',
    ].join('\n');

    handleDownload(selectedPeople);

    expect(mockSaveAs).toHaveBeenCalledTimes(1);

    const [blob, filename] = mockSaveAs.mock.calls[0];

    expect(filename).toBe('2_person.csv');
    expect(blob.type).toBe('text/csv;charset=utf-8;');

    const blobContent = await readBlob(blob);
    expect(blobContent).toEqual(expectedCSV);
  });

  it('should create a correct file with empty data', async () => {
    handleDownload({});

    const [blob, filename] = mockSaveAs.mock.calls[0];

    expect(filename).toBe('0_person.csv');

    const content = await readBlob(blob);
    expect(content).toBe('Name,Height,Birth Year,URL');
  });
});
