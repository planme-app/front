import { TextField } from '@mui/material';

export default function TextFiled({
  value,
  tftype,
  password,
  name,
  message,
  change
}: {
  change: (arg0: string) => void;
  value: string;
  tftype: boolean;
  password: boolean;
  name: string;
  message: string;
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    change(e.target.value);
  };

  return (
    <TextField
      color={value.length != 0 && tftype ? 'success' : 'primary'}
      focused={value.length != 0 && tftype ? true : false}
      type={password ? 'password' : ''}
      error={value.length != 0 && !tftype}
      name={name}
      label={name}
      value={value}
      onChange={onChange}
      helperText={value.length != 0 && !tftype ? message : ' '}
    />
  );
}
