describe('Signup', () => {
  // Given: 사용자가 로그인 페이지에 접속해 있다.
  beforeEach(() => {
    cy.visit('/signup').wait(300);
  });

  describe('유효성 검사를 통과하지 못했을 때', () => {
    it('이메일 형식에 맞지 않으면, 회원가입 버튼을 누를 수 없다.', () => {
      // When: 사용자가 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭한다.
      cy.getDataCy('email-input').type('123');
      cy.getDataCy('password-input').type('qwerqwer12##');
      cy.getDataCy('password-check-input').type('qwerqwer12##');
      cy.getDataCy('name-input').type('플랜미');

      // Then: 사용자는 회원가입 버튼틀 누를 수 없다.
      cy.getDataCy('signup-submit').should('be.disabled');
    });

    it('이름의 길이가 3글자 이상이어도, 회원가입 버튼을 누를 수 있다.', () => {
      // When: 사용자가 이메일과 비밀번호, 3글자 이상의 이름을 입력하고 로그인 버튼을 클릭한다.
      cy.getDataCy('email-input').type('123@naver.com');
      cy.getDataCy('password-input').type('qwerqwer12##');
      cy.getDataCy('password-check-input').type('qwerqwer12##');
      cy.getDataCy('name-input').type('플랜미 이름 체크');

      // Then: 사용자는 회원가입 버튼틀 누를 수 있다.
      cy.getDataCy('signup-submit').should('not.be.disabled');
    });
  });
});
