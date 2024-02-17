import {Description} from './Description';

describe('Description Class', () => {
    it('Should throw an error when no value provided', () => {
        expect(() => new Description()).toThrow('Description is required');
    });

    it('Should throw an error when value less than 3 characters', () => {
        expect(() => new Description('ab')).toThrow('Description must be between 3 and 500 characters')
    });

    it('Should throw an error when value more than 500 characters', () => {
        let description = new Array(502).join('a');
        expect(() =>    new Description(description)).toThrow('Description must be between 3 and 500 characters')
    });

    it('Should create Description object for valid value', () => {
        let value = 'Valid Description';
        let expectedDescription = new Description(value);
        expect(expectedDescription.value).toBe(value);
    });
});
