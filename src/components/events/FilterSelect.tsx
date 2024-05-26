import { Select, Tag } from "antd";
import { DefaultOptionType, SelectProps } from "antd/es/select";
import React from "react";

export interface IFilterSelectProps {
  options: DefaultOptionType[];
  onChange?: (
    value: any,
    option: DefaultOptionType | DefaultOptionType[]
  ) => void;
  title: string;
  multiple?: boolean;
}

export function FilterSelect({
  options,
  onChange,
  title,
  multiple = false,
}: IFilterSelectProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium">{title}: </span>
      <Select
        style={{ width: !multiple ? 140 : 300 }}
        defaultValue={options[0].value}
        options={options}
        onChange={onChange}
        {...(multiple && {
          mode: "multiple",
          tagRender: tagRender,
          virtual: false,
          defaultValue: null,
        })}
      />
    </div>
  );
}

type TagRender = SelectProps["tagRender"];

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value?.split("_")[1]}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};
