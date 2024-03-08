import React from "react";
import Link from "next/link";
import {redirect} from "next/navigation";
import {TextField} from "@/todo/framework/primary/ui/TextField";
import {ErrorMessage, ErrorMessageProps} from "@/todo/framework/primary/ui/ErrorMessage";
import {Modal} from "@/todo/framework/primary/ui/Modal";
import {useCaseFactory} from "@/todo/framework/config/UseCaseFactory";


interface NewTodoModalProps extends ErrorMessageProps {

}

export const NewTodoModal = ({error}: NewTodoModalProps) => {

    const summit = async (formData: FormData) => {
        "use server"

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        let nextStep: string
        try {
            const newTodo = await useCaseFactory.createNewTodo();
            await newTodo.create({title, description})
            nextStep = "/todos?modal=false"
        } catch (e: any) {
            nextStep = `/todos?modal=true&error=${e.message}`
        }
        redirect(nextStep)
    }


    return <Modal>
        <form
            action={summit}
            className="inline-block align-bottom bg-gray-200 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        New Todo
                    </h3>
                </div>
                <div className="mt-2">
                    <TextField label={"Title"} id={"title"} name={"title"} required/>
                    <TextField label={"Description"} id={"description"} name={"description"} required/>
                </div>
                <ErrorMessage error={error}/>
            </div>


            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                    Save
                </button>
                <Link href={"/todos?modal=false"}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                </Link>
            </div>
        </form>
    </Modal>
}