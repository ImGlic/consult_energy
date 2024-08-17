import React, { ChangeEvent } from "react";

type InputProps = {
  label: string;
  id: string;
  type: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void; // Tipagem para onChange
};

const TextArea: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block mb-2 text-sm font-medium text-blue-900 dark:text-white"
      >
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.onChange} 
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default TextArea;
