import { TextField } from '@mui/material';

export default function TextFiled(props: {
  onChange: (arg0: string) => void;
  value: string;
  tftype: boolean;
  password: boolean;
  name: string;
  message: string;
}) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  return (
    <TextField
      color={props.value.length != 0 && props.tftype ? 'success' : 'primary'}
      focused={props.value.length != 0 && props.tftype ? true : false}
      type={props.password ? 'password' : ''}
      error={props.value.length != 0 && !props.tftype}
      name={props.name}
      label={props.name}
      value={props.value}
      onChange={onChange}
      helperText={
        props.value.length != 0 && !props.tftype ? props.message : ' '
      }
    />
  );
}
