import { Mean2ClientPage } from './app.po';

describe('mean2-client App', function() {
  let page: Mean2ClientPage;

  beforeEach(() => {
    page = new Mean2ClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
