import { Input } from "./ui/input";
import { Label } from "./ui/label";

type InputFieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputField({
  id,
  label,
  type = "text",
  required = false,
  error,
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input required={required}  id={id} type={type} {...props} />
      {error && <p className="text-sm text-red-500">{label} é obrigatório</p>}
    </div>
  );
}
