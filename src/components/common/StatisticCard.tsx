import * as React from "react";

export interface IStatisticCardProps {
  title?: string;
  value: string | number;
  icon: string | number | React.ReactElement;
  postfix: string;
}

export function StatisticCard({
  title,
  value,
  icon,
  postfix,
}: IStatisticCardProps) {
  return (
    <div className="p-8 rounded-lg shadow-md">
      {title ? <h4 className="mb-6 text-2xl font-medium">{title}</h4> : <></>}
      <div className="flex items-center justify-between">
        <div className="text-5xl">{icon}</div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-3xl font-medium text-neutral-800">{value}</p>
          <span className="font-medium text-neutral-400">{postfix}</span>
        </div>
      </div>
    </div>
  );
}
