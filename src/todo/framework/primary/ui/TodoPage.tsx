import React from 'react';
import {MainTemplate} from "@/todo/framework/primary/ui/MainTemplate";
import {TodoUIDTO} from "@/todo/framework/primary/ui/TodoUIDTO";
import {useCaseFactory} from "@/todo/framework/config/UseCaseFactory";


const TodoPage = async ({searchParams}: { searchParams: Record<string, string> | null | undefined }) => {
    const fetchAll =  await useCaseFactory.createFetchAll();
    const todos = (await fetchAll.findAll())?.map(TodoUIDTO.fromDomain) || [];
    return <MainTemplate todos={todos} showModal={searchParams?.modal === 'true'} error={searchParams?.error}/>;
};

export default TodoPage;