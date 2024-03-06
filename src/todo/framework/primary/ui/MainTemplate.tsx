import {StatusColumn} from "@/todo/framework/primary/ui/StatusColumn";
import Link from "next/link";
import {NewTodoModal} from "@/todo/framework/primary/ui/NewTodoModal";
import React from "react";
import {TodoUIDTO} from "@/todo/framework/primary/ui/TodoUIDTO";

interface MainTemplateProps {
    todos: TodoUIDTO[],
    error?: string | undefined,
    showModal?: boolean
}

export const MainTemplate = ({todos, error, showModal}: MainTemplateProps) => {
    const body = todos.length === 0 ? <p> There is nothing to show here :(</p> : (
        <>
            <StatusColumn todos={todos} status={'pending'}/>
            <StatusColumn todos={todos} status={'working'}/>
            <StatusColumn todos={todos} status={'completed'}/>
        </>
    )

    return (
        <div className={"flex gap-3 grid-cols-3 w-screen px-20 my-5"}>
            {body}
            <Link
                className={"bg-teal-400 absolute right-5 bottom-20 mb-5 pb-1 rounded-full  w-20 h-20 flex justify-center items-center  text-5xl"}
                href={"/todos?modal=true"}>+</Link>
            {showModal && <NewTodoModal error={error}/>}
        </div>
    );
};