import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getCurrentUrl() {
    return browser.getCurrentUrl();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  register(username, email, phone, dob, zipcode, password1, password2) {
    element(by.css('input[id=accountName]')).sendKeys(username);
    element(by.css('input[id=email]')).sendKeys(email);
    element(by.css('input[id=phoneNumber]')).sendKeys(phone);
    element(by.css('input[id=dateOfBirth]')).sendKeys(dob);
    element(by.css('input[id=zipcode]')).sendKeys(zipcode);
    element(by.css('input[id=password]')).sendKeys(password1);
    element(by.css('input[id=passwordConfirmation]')).sendKeys(password2);
    return element(by.css('button[id=registerBtn]')).click();

  }

  login(username, password) {
    element(by.css('input[id=uname]')).sendKeys(username);
    element(by.css('input[id=upass]')).sendKeys(password);
    return element(by.css('button[id=loginBtn]')).click();
  }

  logout() {
    return element(by.css('a[id=logout]')).click();
  }
}
