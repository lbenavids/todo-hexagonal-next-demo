import { Title } from './Title';
import { describe, it, expect } from '@jest/globals';

describe('Title Class', () => {

    it('should instantiate without throwing an error if a valid title is provided', () => {
        const validTitle = 'Workout at dawn';
        const title = () => new Title(validTitle);
        expect(title).not.toThrowError();
    });

    it('should throw error when title is undefined', () => {
        const title = () => new Title();
        expect(title).toThrowError('Title is required');
    });

    it('should throw error when title is empty', () => {
        const title = () => new Title('');
        expect(title).toThrowError('Title is required');
    });

    it('should throw error when title length is less than 3 characters', () => {
        const title = () => new Title('ab');
        expect(title).toThrowError('Title must be between 3 and 50 characters');
    });

    it('should throw error when title length is more than 50 characters', () => {
        const longTitle = 'a'.repeat(51);
        const title = () => new Title(longTitle);
        expect(title).toThrowError('Title must be between 3 and 50 characters');
    });
});