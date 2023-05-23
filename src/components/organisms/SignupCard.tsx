import { Stack } from '@mui/material';
import TextField from 'components/atoms/TextField';
import { TextFieldProps } from 'pages/signup/index';
import {
  checkEmail,
  checkPw,
  confirmPw,
  checkName
} from 'controllers/domain/User';

export function SignupCard({ props }: { props: TextFieldProps }) {
  const { email, pw, twoPw, name } = props;

  return (
    <Stack spacing={3}>
      <TextField
        name="Email"
        password={false}
        isForm={checkEmail(email.value)}
        message="이메일 형식에 맞게 작성해주세요."
        value={email.value}
        change={email.onChange}
      />
      <TextField
        name="Password"
        password={true}
        isForm={checkPw(pw.value)}
        message="비밀전호(영문+숫자+특수기호, 8~20자)"
        value={pw.value}
        change={pw.onChange}
      />
      <TextField
        name="CheckPassword"
        password={true}
        isForm={confirmPw(pw.value, twoPw.value)}
        message="비밀번호가 맞지않습니다."
        value={twoPw.value}
        change={twoPw.onChange}
      />
      <TextField
        name="Name"
        password={false}
        isForm={checkName(name.value)}
        message="이름에 맞게 작성해주세요."
        value={name.value}
        change={name.onChange}
      />
    </Stack>
  );
}
