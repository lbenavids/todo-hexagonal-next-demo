import { useCaseFactory} from "@/todo/framework/config/UseCaseFactory";





export const initApp = async () => {
    await useCaseFactory.createFetchAll()
    await useCaseFactory.createNewTodo()
    await useCaseFactory.createUpdateStatus()
}
