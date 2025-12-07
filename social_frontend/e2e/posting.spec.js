import { test, expect } from '@playwright/test';

test('posting flow', async ({ page }) => {
    // Register and Login first
    const uniqueId = `poster${Date.now()}`;

    await page.goto('/register');
    await page.getByLabel('User ID (@handle)').fill(uniqueId);
    await page.getByLabel('Name').fill('Poster');
    await page.getByLabel('Password').fill('password123');
    await page.getByLabel('Pass Key (Secret for Login)').fill('passkey123');
    await page.getByRole('button', { name: 'Register' }).click();

    // Wait for redirect to login
    await expect(page).toHaveURL(/.*\/login/);
    await page.getByLabel('Username').fill(uniqueId);
    await page.getByLabel('Pass Key').fill('passkey123');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for home page
    await expect(page).toHaveURL('/');

    // Create post
    await page.getByPlaceholder('What\'s happening?').fill('Hello World from E2E');
    await page.getByRole('button', { name: 'Post' }).click();

    // Verify post appears
    await expect(page.getByText('Hello World from E2E')).toBeVisible();
});
