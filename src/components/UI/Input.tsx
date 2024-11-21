import { InputHTMLAttributes, PropsWithoutRef } from "react";

type InputProps = {
  label: string;
} & Omit<
  PropsWithoutRef<InputHTMLAttributes<HTMLInputElement>>,
  "className" | "placeholder"
>;

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="relative">
      <input
        {...props}
        placeholder=" "
        className="peer w-full rounded-md border-2 p-2 pt-5 text-base focus:border-gray-300 focus:outline-none focus:ring-1"
      />
      <label className="absolute left-2 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500">
        {label}
      </label>
    </div>
  );
}
