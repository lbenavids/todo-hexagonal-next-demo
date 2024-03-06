import {Todo} from "@/todo/domain/Todo";
import {ValidStatus} from "@/todo/domain/status/Status";
import React from "react";
import {DetailInfo} from "@/todo/framework/primary/ui/DetailInfo";
import {TodoTitle} from "@/todo/framework/primary/ui/TodoTitle";

export const ListItem = ({todo}: { todo: Todo }) => {


    const detailColor: { [key in ValidStatus]: string } = {
        pending: 'from-teal-500 to-teal-600',
        working: 'from-teal-600 to-teal-700',
        completed: 'from-teal-700 to-teal-800',
    }

    return <details className={'w-full rounded'}>
        <TodoTitle todo={todo}/>
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