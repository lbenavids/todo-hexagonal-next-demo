import React from 'react';
import {fetchAll} from "@/todo/framework/config/InstancesManager";
import {StatusColumn} from "@/todo/framework/primary/ui/StatusColumn";

const TodoPage = async () => {

    const todos = await fetchAll.findAll();

    if (todos.length === 0) return <p> There is nothing to show here :(</p>


    return (
        <div className={"flex gap-3 grid-cols-3 w-screen px-20 my-5"}>
            <StatusColumn todos={todos} status={'pending'}/>
            <StatusColumn todos={todos} status={'working'}/>
            <StatusColumn todos={todos} status={'completed'}/>
        </div>
    );
};

export default TodoPage;