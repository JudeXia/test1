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
      const timeout = 2000;
      let el = null;
      let isTimeOut = false;
      setTimeout(() => {
        isTimeOut = true;
      }, timeout);
      while (!el) {
        el = element(by.css('div[id=regSuccess]'));

      }
      const success = el.getText();
      expect(success).toEqual('your registeration is successful, you can login now!');
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

  it('should Log in a test users', () => {
    page.navigateTo();
    page.login('rice', '1').then(() => {
      setTimeout(() => {
        expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + '/#/main');
      }, 2000);
    });
  });

  xit('should logout a logged in user', () => {
    page.navigateTo();
    page.login('rice', '1').then(() => {
    });
  });
});
