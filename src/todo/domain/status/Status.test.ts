import {Completed, Pending, Status, ValidStatus, Working} from './Status';
import {statusFactory} from "@/todo/domain/status/statusFactory";
import commander from "commander";

describe('Status', () => {

    describe("pending", () => {
            let status = new Pending();
        test("when a  pending state instance is created should return 'pending' as value", () => {
            expect(status.value).toBe('pending')
        })
        test("when update status is called should return an instance of Working", () => {
            expect(status.nextStatus()).toBeInstanceOf(Working)
        })
    })
    describe("working", () => {
            let status = new Working();
        test("when a  working state instance is created should return 'working' as value", () => {
            expect(status.value).toBe('working')
        })
        test("when update status is called should return an instance of Completed", () => {
            expect(status.nextStatus()).toBeInstanceOf(Completed)
        })
    })
    describe("completed", () => {
            let status = new Completed();
        test("when a  completed state instance is created should return 'completed' as value", () => {
            expect(status.value).toBe('completed')
        })
        test("when update status is called should return an instance of Completed", () => {
            expect(status.nextStatus()).toBeInstanceOf(Completed)
        })
    })

});