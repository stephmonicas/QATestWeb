import {expect, test} from '@playwright/test';

test('HM001_positiveSearchExistingBook', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByPlaceholder('Type to search').click();
    await page.getByPlaceholder('Type to search').fill('JavaScript');
    await page.getByText('Speaking Javascript').isVisible();
    await page.getByText('Axel Rauschmayer').isVisible();
})

test('HM002_positiveSearchNotExistingBook', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByPlaceholder('Type to search').click();
    await page.getByPlaceholder('Type to search').fill('bbb');
    await page.getByText('No rows found').isVisible();
})

test('HM003_positiveGoToBookDetails', async ({page}) => {
    await page.goto('https://demoqa.com/books');
    await page.getByText('Git Pocket Guide').click();
    await expect(page.locator('text="Git Pocket Guide"')).toBeVisible();
})