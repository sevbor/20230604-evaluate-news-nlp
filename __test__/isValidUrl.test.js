import { isValidUrl } from "../src/client/js/isValidUrl"; // Replace 'your-file' with the actual file path

describe('isValidUrl', () => {
  it('should return true for valid URLs starting with "http:"', () => {
    const validHttpUrl = 'http://www.example.com';
    expect(isValidUrl(validHttpUrl)).toBe(true);
  });

  it('should return true for valid URLs starting with "https:"', () => {
    const validHttpsUrl = 'https://www.example.com';
    expect(isValidUrl(validHttpsUrl)).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    const invalidUrl = 'not-a-valid-url';
    expect(isValidUrl(invalidUrl)).toBe(false);
  });

  it('should return false for non-http/https URLs', () => {
    const nonHttpUrl = 'ftp://www.example.com';
    expect(isValidUrl(nonHttpUrl)).toBe(false);
  });
});