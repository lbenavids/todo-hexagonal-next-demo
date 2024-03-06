import {Todo} from "@/todo/domain/Todo";
import {ValidStatus} from "@/todo/domain/status/Status";
import React from "react";
import {DetailInfo} from "@/todo/framework/primary/ui/DetailInfo";
import {updateStatus} from "@/todo/framework/config/InstancesManager";
import {revalidatePath} from "next/cache";

export const ListItem = ({todo}: { todo: Todo }) => {

    const titleColor: { [key in ValidStatus]: string } = {
        pending: 'bg-teal-500',
        working: 'bg-teal-600',
        completed: 'bg-teal-700',
    }
    const detailColor: { [key in ValidStatus]: string } = {
        pending: 'from-teal-500 to-teal-600',
        working: 'from-teal-600 to-teal-700',
        completed: 'from-teal-700 to-teal-800',
    }

    const update = async () => {
        'use server'

        await updateStatus.updateTodoStatus({id: todo.id!})

        revalidatePath("/todos")
    }

    return <details className={'w-full rounded'}>
        <summary
            className={`${titleColor[todo.status.value]}  p-3 text-white  rounded-t text-3xl flex justify-between`}>{todo.title.value}
            {todo.status.value !== 'completed' && <form action={update}>
                <button className={" bg-black rounded px-3 text-lg"}
                    >Update
                </button>
            </form>}
        </summary>
        <div
            className={`bg-gradient-to-b  ${detailColor[todo.status.value]} text-white rounded-b p-5 flex flex-col  gap-2.5 content-center border-t-2 border-white`}>
            <p className={"text-2xl self-center"}>{todo.description.value}</p>
            <dl className={'flex justify-around'}>
                <DetailInfo value={todo.createdAt.toDateString()} title={"Created At"}/>
                <DetailInfo value={todo.updatedAt.toDateString()} title={"Updated At"}/>
            </dl>
        </div>
    </details>;
};