describe('AddRoutine', () => {
  beforeEach(() => {
    // cy.setCookie('Authorization', 'test_authorization_code');
    cy.visit('/routine/template/add').wait(300);
  });
  describe('루틴 추가 하기', () => {
    it('루틴 이름,타입,목표,빈도(날짜) 기입 후 추가 버튼 클릭으로 루틴 추가하기', () => {
      //When: 로그인 후 ,루틴 정보를 입력한다.
      cy.get('#outlined-adornment-ID').type('123@naver.com');
      cy.get('#outlined-adornment-password').type('@@yr1004');
      cy.get('#login-button').click();

      cy.get('#add-routine-button').click();

      cy.get('#add-user').click();

      cy.get('#routine-title-input').type('test_title');
      cy.get('#routine-goal-input').type('10');
      for (let i = 0; i < 7; i++) {
        cy.get(`#day-button-${i}`).click(); // 버튼을 찾아 클릭 합니다
      }
      cy.get('#add-routine-button').click();

      //Then: 루틴 페이지에 루틴이 추가 된다.
      cy.url().should('include', '/routine/detail');
    });
  });
});
