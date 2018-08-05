const {isRealString} = require('./validation');

describe('isRealString', () => {
    test('if argument type is not string, it should return false', () => {
        expect(isRealString(78)).toBe(false);
    }); 
    
    test('if an empty string is passed, it should return false', () => {
        expect(isRealString('  ')).toBe(false);
        expect(isRealString('')).toBe(false);
    });

    test('if a valid string is passed, it should return true', () => {
        expect(isRealString('UserName102')).toBe(true);
        expect(isRealString('  UserName102  ')).toBe(true);
    }); 
});