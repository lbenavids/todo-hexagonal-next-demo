import {ValidStatus} from "@/todo/domain/status/Status";
import {revalidatePath} from "next/cache";
import React from "react";
import {TodoUIDTO} from "@/todo/framework/primary/ui/TodoUIDTO";
import {useCaseFactory} from "@/todo/framework/config/UseCaseFactory";

export const TodoTitle = ({todo}: {
    todo: TodoUIDTO
}) => {

    const titleColor: { [key in ValidStatus]: string } = {
        pending: 'bg-teal-500',
        working: 'bg-teal-600',
        completed: 'bg-teal-700',
    }

    const update = async () => {
        'use server'
        const updateStatus = await useCaseFactory.createUpdateStatus();
        await updateStatus?.updateTodoStatus({id: todo.id!})

        revalidatePath("/todos")
    }


    return <summary
        className={`${titleColor[todo.status]}  p-3 text-white  rounded-t text-3xl flex justify-between`}>{todo.title}
        {!todo.isCompleted && <form action={update}>
            <button className={" bg-gray-700 rounded px-3 text-lg"}>
                Update
            </button>
        </form>}
    </summary>;
};