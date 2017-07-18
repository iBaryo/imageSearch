import { ImgSearchPage } from './app.po';

describe('img-search App', () => {
  let page: ImgSearchPage;

  beforeEach(() => {
    page = new ImgSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
