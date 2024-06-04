import {expect, test} from '@playwright/test';

test('PR001_positiveGoToBookStore', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill('stephaniemonica');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('text="stephaniemonica"')).toBeVisible();
    await page.getByText('Profile').click();
    await page.getByRole('button', { name: 'Go To Book Store'}).click();
    await page.waitForTimeout(3000);
    await expect(page.locator('text="Git Pocket Guide"')).toBeVisible();
})

test('PR002_positiveDeleteAccount', async ({page}) => {
  await page.goto('https://demoqa.com/books');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.getByRole('button', { name: 'New User'}).click();
    await page.getByPlaceholder('First Name').click();
    await page.getByPlaceholder('First Name').fill('stephanie');
    await page.getByPlaceholder('Last Name').click();
    await page.getByPlaceholder('Last Name').fill('monica');
    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill('s004');
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

    await page.getByRole('button', { name: 'Back to Login'}).click();
    await page.waitForTimeout(2000);
    await page.getByPlaceholder('UserName').click();
    await page.getByPlaceholder('UserName').fill('s004');
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('Qwerty123!');
    await page.getByRole('button', { name: 'Login'}).click();
    await page.waitForTimeout(2000);
    await expect(page.locator('text="stephaniemonica"')).toBeVisible();

    await page.getByText('Profile').click();
    await page.getByRole('button', { name: 'Delete Account'}).click();
    await page.getByRole('button', { name: 'OK'}).click();

    async function handleDialog2(dialog) {
      if (dialog.message().includes('User Deleted.')) {
        console.log("Clicking 'OK' to ${dialog.message()}");
        await dialog.accept();
      }
    }

    page.on('dialog', handleDialog);

    await expect(page.locator('text="Login in Book Store"')).toBeVisible();
})

test('PR003_positiveDeleteAllBooks', async ({page}) => {
  await page.goto('https://demoqa.com/books');
  await page.getByRole('button', { name: 'Login'}).click();
  await page.getByPlaceholder('UserName').click();
  await page.getByPlaceholder('UserName').fill('stephaniemonica');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Qwerty123!');
  await page.getByRole('button', { name: 'Login'}).click();
  await page.waitForTimeout(2000);
  await expect(page.locator('text="stephaniemonica"')).toBeVisible();
  await page.getByText('Profile').click();
  await page.getByRole('button', { name: 'Delete All Books'}).click();
  await page.getByRole('button', { name: 'OK'}).click();

  async function handleDialog(dialog) {
    if (dialog.message().includes("No books available in your's collection!")) {
      console.log("Clicking 'OK' to ${dialog.message()}");
      await dialog.accept();
    }
  }

  page.on('dialog', handleDialog);
})