import { Stack } from '@mui/material';
import TextField from 'components/atoms/TextField';
import { TextFieldProps } from 'pages/signup/index';
import {
  checkEmail,
  checkPw,
  confirmPw,
  checkName
} from 'controllers/domain/User';

export function SignupCard({ data }: { data: TextFieldProps }) {
  return (
    <Stack spacing={3}>
      <TextField
        name="Email"
        password={false}
        tftype={checkEmail(data.email.value)}
        message="error"
        value={data.email.value}
        change={data.email.onChange}
      />
      <TextField
        name="Password"
        password={true}
        tftype={checkPw(data.pw.value)}
        message="error"
        value={data.pw.value}
        change={data.pw.onChange}
      />
      <TextField
        name="CheckPassword"
        password={true}
        tftype={confirmPw(data.checkPw.value, data.checkPw.value)}
        message="error"
        value={data.checkPw.value}
        change={data.checkPw.onChange}
      />
      <TextField
        name="Name"
        password={false}
        tftype={checkName(data.name.value)}
        message="error"
        value={data.name.value}
        change={data.name.onChange}
      />
    </Stack>
  );
}
