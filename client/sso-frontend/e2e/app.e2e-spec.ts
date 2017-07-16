import { SsoFrontendPage } from './app.po';

describe('sso-frontend App', () => {
  let page: SsoFrontendPage;

  beforeEach(() => {
    page = new SsoFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
