import { SeltexisPage } from './app.po';

describe('seltexis App', () => {
  let page: SeltexisPage;

  beforeEach(() => {
    page = new SeltexisPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
