import {Todo} from "@/todo/domain/Todo";
import {ValidStatus} from "@/todo/domain/status/Status";
import {updateStatus} from "@/todo/framework/config/InstancesManager";
import {revalidatePath} from "next/cache";
import React from "react";

export const TodoTitle = ({todo}: {
    todo: Todo
}) => {

    const titleColor: { [key in ValidStatus]: string } = {
        pending: 'bg-teal-500',
        working: 'bg-teal-600',
        completed: 'bg-teal-700',
    }

    const update = async () => {
        'use server'

        await updateStatus.updateTodoStatus({id: todo.id!})

        revalidatePath("/todos")
    }


    return <summary
        className={`${titleColor[todo.status.value]}  p-3 text-white  rounded-t text-3xl flex justify-between`}>{todo.title.value}
        {todo.status.value !== 'completed' && <form action={update}>
            <button className={" bg-gray-700 rounded px-3 text-lg"}>
                Update
            </button>
        </form>}
    </summary>;
};