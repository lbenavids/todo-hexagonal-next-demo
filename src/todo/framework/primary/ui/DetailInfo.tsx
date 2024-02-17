import React from "react";

export const DetailInfo = ({title, value}: { title: string, value: string }) => <div>
    <dt className="font-bold underline">{title}</dt>
    <dd>{value}</dd>
</div>;