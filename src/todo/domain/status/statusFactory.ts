import {Completed, Pending, Status, ValidStatus, Working} from "@/todo/domain/status/Status";


const constructors: { [key in ValidStatus]: Status } = {
    completed: new Completed(),
    working: new Working(),
    pending: new Pending()
}


export const statusFactory = (status: ValidStatus = 'pending') => {
    return constructors[status];
}