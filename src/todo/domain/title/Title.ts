export class Title {
    constructor(readonly value?: string) {

        if (!value || value.trim().length === 0) {
            throw new Error('Title is required');
        }

        if (value.length < 3 || value.length > 50) {
            throw new Error('Title must be between 3 and 50 characters');
        }
    }
}