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
            name: 'long URL with port',
            input: 'https://example.com:3232/otoban-kenarinda-ebegumeci-toplayan-yurdumun-cefak--160792',
            expected: 'https://example.com:3232/…an-yurdumun-cefak--160792'
        },
        {
            name: 'long URL + long hostname',
            input: 'https://example.example.example.com/otoban-kenarinda-ebegumeci-toplayan-yurdumun-cefak--160792',
            expected: 'https://example.example.example.com/…-cefak--160792'
        },
        {
            name: 'long URL + long hostname + port',
            input: 'https://example.example.example.com:8080/otoban-kenarinda-ebegumeci-toplayan-yurdumun-cefak--160792',
            expected: 'https://example.example.example.com:8080/…k--160792'
        },
        {
            name: 'long URL with very long hostname',
            input: 'https://example.example.example.example.example.com/otoban-kenarinda-ebegumeci-toplayan-yurdumun-cefak--160792',
            expected: 'https://example.example.example.example.example.com/…'
        },
        {
            name: 'invalid URL',
            input: 'http://|',
            expected: 'http://|'
        }
    ];
    testCases.forEach(({ name, input, expected }) => {
        it(`should handle ${name} shortening correctly`, () => {
            const result = shortenUrlDisplay(input);
            expect(result).toEqual(expected);
        });
    });
});
