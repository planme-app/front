describe('Logout', () => {
  beforeEach(() => {
    // cy.setCookie('Authorization', 'test_authorization_code');
    cy.visit('/routine').wait(300);
  });
  describe('로그아웃 하기', () => {
    it('프로필 페이지에서 로그아웃 버튼으로 로그아웃한다.', () => {
      //When: 로그인 후 ,루틴 정보를 입력한다.
      cy.get('#outlined-adornment-ID').type('123@naver.com');
      cy.get('#outlined-adornment-password').type('@@yr1004');
      cy.get('#login-button').click();

      cy.get('#profile-button').click();

      cy.get('#logout-button').click();

      //Then: 로그인 페이지로 이동하게 된다.
      cy.visit('/login').wait(300);
    });
  });
});
