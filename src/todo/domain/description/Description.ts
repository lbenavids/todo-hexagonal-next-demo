export class Description {
    constructor(readonly value?: string) {
        if (!value || value.trim().length === 0) {
            throw new Error('Description is required');
        }


        if (value.length < 3 || value.length > 500) {
            throw new Error('Description must be between 3 and 500 characters');
        }
    }
}