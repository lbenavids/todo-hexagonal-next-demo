import React from 'react';
import {initApp} from "@/todo/framework/config/InstancesManager";
import {MainTemplate} from "@/todo/framework/primary/ui/MainTemplate";
import {TodoUIDTO} from "@/todo/framework/primary/ui/TodoUIDTO";


const TodoPage = async ({searchParams}: { searchParams: Record<string, string> | null | undefined }) => {
    const {fetchAll} =  await initApp();
    const todos = (await fetchAll.findAll())?.map(TodoUIDTO.fromDomain) || [];
    return <MainTemplate todos={todos} showModal={searchParams?.modal === 'true'} error={searchParams?.error}/>;
};

export default TodoPage;