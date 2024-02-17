import {statusFactory} from './statusFactory';
import {Completed, Pending, Working} from "@/todo/domain/status/Status";

describe('statusFactory function', () => {
    it('returns Pending instance when status is pending', () => {
        const pendingInstance = statusFactory('pending');
        expect(pendingInstance).toBeInstanceOf(Pending);
    });

    it('returns Completed instance when status is completed', () => {
        const completedInstance = statusFactory('completed');
        expect(completedInstance).toBeInstanceOf(Completed);
    });

    it('returns Working instance when status is working', () => {
        const workingInstance = statusFactory('working');
        expect(workingInstance).toBeInstanceOf(Working);
    });

    it('returns Pending instance by default', () => {
        const defaultInstance = statusFactory();
        expect(defaultInstance).toBeInstanceOf(Pending);
    });
});