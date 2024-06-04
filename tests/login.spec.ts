import {expect, test} from '@playwright/test';
const Captcha = require("2captcha");

test('LG001_positiveLoginWithValidCredential', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill('stephaniemonica');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('text="stephaniemonica"')).toBeVisible();
})

test('LG002_negativeLoginWithInvalidCredential', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill('stephaniemonica');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty321!');
    await page.getByRole('button', { name: 'Login'}).click();
    await expect(page.locator('text="Invalid username or password!"')).toBeVisible();
})

test('LG003_negativeLoginWithEmptyUserName', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.getByRole('button', { name: 'Login'}).click();
    await expect(page.locator('text="Login in Book Store"')).toBeVisible();
})

test('LG004_negativeLoginWithEmptyPassword', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill('stephaniemonica');
    await page.getByRole('button', { name: 'Login'}).click();
    await expect(page.locator('text="Login in Book Store"')).toBeVisible();
})

test('LG005_positiveCreateNewUser', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New User'}).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('stephanie');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('monica');

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
      }

    const randomString = generateRandomString(10);
    console.log(randomString);

    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill(randomString);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox', { name: 'I\'m not a robot' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Register'}).click();

    async function handleDialog(dialog) {
        if (dialog.message().includes('User Register Successfully.')) {
          console.log("Clicking 'Yes' to ${dialog.message()}");
          await dialog.accept();
        }
    }

     page.on('dialog', handleDialog);
})

test('LG006_negativeCreateNewUserWithEmptyFirstName', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New User'}).click();
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('monica');

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
      }

    const randomString = generateRandomString(10);
    console.log(randomString);

    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill(randomString);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox', { name: 'I\'m not a robot' }).click();
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Register'}).click();
    await expect(page.locator('text="Register to Book Store"')).toBeVisible();
})

test('LG007_negativeCreateNewUserWithEmptyLastName', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New User'}).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('stephanie');

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
      }

    const randomString = generateRandomString(10);
    console.log(randomString);

    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill(randomString);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox', { name: 'I\'m not a robot' }).click();
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Register'}).click();
    await expect(page.locator('text="Register to Book Store"')).toBeVisible();
})

test('LG008_negativeCreateNewUserWithEmptyUserName', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New User'}).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('stephanie');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('monica');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox', { name: 'I\'m not a robot' }).click();
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Register'}).click();
    await expect(page.locator('text="Register to Book Store"')).toBeVisible();
})

test('LG009_negativeCreateNewUserWithEmptyPassword', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New User'}).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('stephanie');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('monica');

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
      }

    const randomString = generateRandomString(10);
    console.log(randomString);

    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill(randomString);
    await page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox', { name: 'I\'m not a robot' }).click();
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Register'}).click();
    await expect(page.locator('text="Register to Book Store"')).toBeVisible();
})

test('LG010_negativeCreateNewUserWithEmptyCaptcha', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New User'}).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('stephanie');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('monica');

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        
        return result;
      }

    const randomString = generateRandomString(10);
    console.log(randomString);

    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill(randomString);
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await expect(page.locator('text="Please verify reCaptcha to register!"')).toBeVisible();
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Register'}).click();
})

test('LG011_negativeCreateNewUserWithRegisteredUser', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New User'}).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('stephanie');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('monica');
    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill('stephaniemonica');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.frameLocator('[title="reCAPTCHA"]').getByRole('checkbox', { name: 'I\'m not a robot' }).click();
    await page.waitForTimeout(4000);
    await page.getByRole('button', { name: 'Register'}).click();
    await expect(page.locator('text="User exists!"')).toBeVisible();
})

test('LG012_positiveLogoutFromSession', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill('stephaniemonica');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByText('User Name :stephaniemonica').isVisible();
    await page.getByRole('button', { name: 'Log out'}).click();
    await expect(page.locator('text="Login in Book Store"')).toBeVisible();
})