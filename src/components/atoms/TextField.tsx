import { TextField } from '@mui/material';

export default function TextFiled(props) {
  const onChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <TextField
      color={props.value.length != 0 && props.tftype ? 'success' : ''}
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
