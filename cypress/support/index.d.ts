export {};

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getDataCy(selector: string, ...args: any[]): Chainable<Subject>;
    }
  }
}
