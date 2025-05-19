// Unit tests for username validation logic in main.js
// Uses Jest for testing

function validateUsername(username) {
    // regex to check if username has at least 1 capital letter, 1 special character, 1 number, and is at least 8 characters long
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return regex.test(username);
}

describe('validateUsername', () => {
    it('should return true for valid usernames', () => {
        expect(validateUsername('Password1!')).toBe(true);
        expect(validateUsername('A1b2c3d4!')).toBe(true);
        expect(validateUsername('TestUser9@')).toBe(true);
    });

    it('should return false for usernames shorter than 8 characters', () => {
        expect(validateUsername('A1b!')).toBe(false);
        expect(validateUsername('Abc1!')).toBe(false);
    });

    it('should return false for usernames without a capital letter', () => {
        expect(validateUsername('password1!')).toBe(false);
        expect(validateUsername('testuser9@')).toBe(false);
    });

    it('should return false for usernames without a number', () => {
        expect(validateUsername('Password!')).toBe(false);
        expect(validateUsername('TestUser!')).toBe(false);
    });

    it('should return false for usernames without a special character', () => {
        expect(validateUsername('Password1')).toBe(false);
        expect(validateUsername('TestUser9')).toBe(false);
    });

    it('should return false for usernames with invalid characters', () => {
        expect(validateUsername('Password1! ')).toBe(false); // space
        expect(validateUsername('Password1!_')).toBe(false); // underscore
    });
});
