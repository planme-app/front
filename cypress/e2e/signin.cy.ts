describe('Login', () => {
  // Given: 사용자가 로그인 페이지에 접속해 있다.
  beforeEach(() => {
    cy.visit('/login').wait(300);
  });

  it('로그인 실패 시 모달이 뜨는지 확인', () => {
    //When: 사용자가 ID(E-MAIl)나 비밀번호 혹은 둘 다 생략한다.
    cy.get('#outlined-adornment-ID').type('wrong_id');
    cy.get('#outlined-adornment-password').type('wrong_password');
    cy.get('#login-button').click();

    //Then: 모달로 로그인 실패 원인을 보여준다.
    cy.get('#login-modal')
      .should('be.visible') // 이 부분이 모달창이 생성될 때까지 기다림
      .and('contain', '이메일 또는 비밀번호를 형식에 맞게 입력해주세요');
  });

  it('로그인 성공 시 루틴 페이지로 이동', () => {
    //When: 사용자가 ID(E-MAIl), 비밀번호를 입력한다.
    cy.login('test@naver.com', 'test1234!');

    //Then: 자신의 루틴 페이지로 이동한다.
    cy.visit('/routine').wait(300);
  });

  it('회원가입 버튼 클릭시 회원가입 페이지로 이동', () => {
    //When: 회원가입 버튼 클릭한다.
    cy.get('#signup-button').click();

    //Then: 회원가입 페이지로 이동한다.
    cy.visit('/signup').wait(300);
  });
});
