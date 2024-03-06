import {Todo} from "@/todo/domain/Todo";
import {ValidStatus} from "@/todo/domain/status/Status";
import {ListItem} from "@/todo/framework/primary/ui/ListItem";
import React from "react";

export const StatusColumn = ({todos, status}: { todos: Todo[], status: ValidStatus }) => {

    const renderTodos = todos
        .filter(t => t.status.value === status)
        .map(t => <ListItem todo={t} key={t.id}/>)

    const title = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()


    const backgrounds: {[key in ValidStatus]: string}= {
        pending:'bg-teal-500',
        working:"bg-teal-600",
        completed: "bg-teal-700"
    }


    return <div className={"flex flex-col gap-5 w-full "}>
        <p className={`text-6xl  ${backgrounds[status]}  p-3 rounded-md text-white`}>{title}</p>
        {renderTodos}
    </div>;
};