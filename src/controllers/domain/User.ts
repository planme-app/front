export function checkEmail(email: string): boolean {
  const pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return pattern.test(email);
}

export function checkPw(pw: string): boolean {
  const num = pw.search(/[0-9]/g);
  const eng = pw.search(/[a-z]/gi);
  const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if (pw.length < 8 || pw.length > 20) {
    return false;
  } else if (pw.search(/\s/) !== -1) {
    return false;
  } else if (num < 0 || eng < 0 || spe < 0) {
    return false;
  } else {
    return true;
  }
}

export function checkName(name: string): boolean {
  const nameRule = /^[가-힣]{2,6}$/;
  return nameRule.test(name);
}

export function confirmPw(pw: string, twoPw: string): boolean {
  return pw === twoPw;
}
