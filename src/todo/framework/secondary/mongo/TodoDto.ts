import {ValidStatus} from "@/todo/domain/status/Status";
import {ObjectId} from "mongodb";

export interface TodoDto {
    readonly title: string,
    readonly description: string,
    readonly status: ValidStatus,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly id?: ObjectId,

}