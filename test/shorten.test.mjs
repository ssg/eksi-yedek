import { shortenUrlDisplay } from '../src/utils/shorten';

describe('Shorten Url Display', () => {
    const testCases = [
        {
            name: 'short URL',
            input: 'https://example.com/',
            expected: 'https://example.com/'
        },
        {
            name: 'exact limit URL',
            input: 'https://example.com/long/path/but/not/too/long/one',
            expected: 'https://example.com/long/path/but/not/too/long/one'
        },
        {
            name: 'long URL',
            input: 'https://example.com/otoban-kenarinda-ebegumeci-toplayan-yurdumun-cefak--160792',
            expected: 'https://example.com/…oplayan-yurdumun-cefak--160792'
        },        
        {
            name: 'invalid URL',
            input: 'http://-',
            expected: 'http://-'
        }
    ];
    testCases.forEach(({ name, input, expected }) => {
        it(`should handle ${name} shortening correctly`, () => {
            const result = shortenUrlDisplay(input);
            expect(result).toEqual(expected);
        });
    });
});
