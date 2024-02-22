import React from "react";

export interface ErrorMessageProps {
    error?: string
}

export const ErrorMessage = ({error}: ErrorMessageProps) => {
    if (!error) return;

    return <div className={"bg-red-500 text-white rounded w-full mt-2 text-center "}>{error}</div>;
};