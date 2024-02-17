import {Todo} from "@/todo/domain/Todo";
import {ValidStatus} from "@/todo/domain/status/Status";
import React from "react";
import {DetailInfo} from "@/todo/framework/primary/ui/DetailInfo";

export const ListItem = ({todo}: { todo: Todo }) => {

    const titleColor: { [key in ValidStatus]: string } = {
        pending: 'from-lime-200 to-lime-400',
        working: 'from-green-200 to-green-400',
        completed: 'from-emerald-200 to-emerald-400',
    }
    const detailColor: { [key in ValidStatus]: string } = {
        pending: 'from-lime-500 to-lime-600',
        working: 'from-green-500 to-green-600',
        completed: 'from-emerald-500 to-emerald-600',
    }

    return <details className={'w-full rounded'}>
        <summary
            className={`bg-gradient-to-b ${titleColor[todo.status.value]}  p-3 text-white  rounded text-3xl`}>{todo.title.value}</summary>
        <div
            className={`bg-gradient-to-b  ${detailColor[todo.status.value]} text-white rounded p-5 flex flex-col  gap-2.5 content-center`}>
            <p className={"text-2xl self-center"}>{todo.description.value}</p>
            <dl className={'flex justify-around'}>
                <DetailInfo value={todo.createdAt.toDateString()} title={"Created At"}/>
                <DetailInfo value={todo.updatedAt.toDateString()} title={"Updated At"}/>
            </dl>
        </div>
    </details>;
};