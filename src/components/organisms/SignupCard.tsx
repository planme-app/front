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
        message="이메일 형식에 맞게 작성해주세요."
        value={data.email.value}
        change={data.email.onChange}
      />
      <TextField
        name="Password"
        password={true}
        tftype={checkPw(data.pw.value)}
        message="비밀전호(영문+숫자+특수기호, 8~20자)"
        value={data.pw.value}
        change={data.pw.onChange}
      />
      <TextField
        name="CheckPassword"
        password={true}
        tftype={confirmPw(data.checkPw.value, data.checkPw.value)}
        message="비밀번호가 맞지않습니다."
        value={data.checkPw.value}
        change={data.checkPw.onChange}
      />
      <TextField
        name="Name"
        password={false}
        tftype={checkName(data.name.value)}
        message="이름에 맞게 작성해주세요."
        value={data.name.value}
        change={data.name.onChange}
      />
    </Stack>
  );
}
