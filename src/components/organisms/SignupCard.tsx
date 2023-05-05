import { Stack } from '@mui/material';
import TextField from 'components/atoms/TextField';
import { TextFieldProps } from 'pages/signup/index';
import {
  checkEmail,
  checkPw,
  confirmPw,
  checkName
} from 'controllers/domain/User';

export function SignupCard(props: TextFieldProps[]) {
  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="Email"
          password={false}
          tftype={checkEmail(props[0].value)}
          message="error"
          value={props[0].value}
          onChange={props[0].onChange}
        />
        <TextField
          name="Password"
          password={true}
          tftype={checkPw(props[1].value)}
          message="error"
          value={props[1].value}
          onChange={props[1].onChange}
        />
        <TextField
          name="CheckPassword"
          password={true}
          tftype={confirmPw(props[1].value, props[2].value)}
          message="error"
          value={props[2].value}
          onChange={props[2].onChange}
        />
        <TextField
          name="Name"
          password={false}
          tftype={checkName(props[3].value)}
          message="error"
          value={props[3].value}
          onChange={props[3].onChange}
        />
      </Stack>
    </>
  );
}
