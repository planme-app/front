describe('Routines', () => {
  beforeEach(() => {
    // cy.setCookie('Authorization', 'test_authorization_code');
    cy.visit('/login').wait(300);
  });
  describe('루틴 클릭시 해당 루틴 동작 페이지로 이동', () => {
    it('루틴 카드 클릭시 동작페이지로 이동', () => {
      //When: 로그인 후 ,루틴 카드를 등록 후 클릭한다.
      cy.get('#outlined-adornment-ID').type('123@naver.com');
      cy.get('#outlined-adornment-password').type('@@yr1004');
      cy.get('#login-button').click();

      //   cy.get('#add-routine-button').click();

      //   cy.get('#add-user').click();
      //   cy.get('#routine-title-input').type('test_title');
      //   cy.get('#routine-goal-input').type('10');
      //   for (let i = 0; i < 7; i++) {
      //     cy.get(`#day-button-${i}`).click(); // 버튼을 찾아 클릭 합니다
      //   }
      //   cy.get('#add-routine-button').click();

      cy.get('[data-cy=routine-card]').first().click();

      //Then: 해당 루틴 동작 페이지로 이동한다.
      cy.url().should('include', '/routine/detail');
    });
  });
});
