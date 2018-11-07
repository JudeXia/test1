import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should Register a new user named \"realUser\"', () => {
    page.navigateTo();
    page.register('realUser', 'realUser@test.com', '123-456-7890', '10-15-1995',
    '77005', '123', '123').then(() => {
      setTimeout(() => {
        const success = element(by.css('div[id=regSuccess]')).getText();
        expect(success).toEqual('your registeration is successful, you can login now!');
      }, 2000);
    });

  });

  it('should Log in as \"realUser\"', () => {
    page.navigateTo();
    page.login('reslUser', '123').then(() => {
      setTimeout(() => {
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/main');
      }, 2000);
    });
  });
});
