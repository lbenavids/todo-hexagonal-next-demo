export type ValidStatus = 'pending' | 'completed' | 'working';


export interface Status {
    readonly value: ValidStatus

    nextStatus(): Status;
}

export class Completed implements Status {
    readonly value = 'completed';

    nextStatus(): Status {
        return this;
    }
}

export class Working implements Status {
    readonly value = 'working';

    nextStatus(): Status {
        return new Completed();
    }
}

export class Pending implements Status {
    readonly value = 'pending';

    nextStatus(): Status {
        return new Working();
    }
}

