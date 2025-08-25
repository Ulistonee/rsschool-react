import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fileToBase64 } from '../src/utils/fileToBase64';

describe('fileToBase64', () => {
  let fileReaderMock: Partial<FileReader>;

  beforeEach(() => {
    fileReaderMock = {
      readAsDataURL: vi.fn(),
      onload: null,
      onerror: null,
      result: 'data:text/plain;base64,dGVzdA==',
    };

    vi.stubGlobal('FileReader', vi.fn(() => fileReaderMock));
  });

  it('resolves with Base64 string', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });

    const promise = fileToBase64(file);

    (fileReaderMock.onload as () => void)?.();

    const result = await promise;
    expect(result).toBe('data:text/plain;base64,dGVzdA==');
    expect(fileReaderMock.readAsDataURL).toHaveBeenCalledWith(file);
  });

  it('rejects on error', async () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const promise = fileToBase64(file);

    const error = new Error('read error');
    (fileReaderMock.onerror as (e: any) => void)?.(error);

    await expect(promise).rejects.toThrow(error);
  });
});
