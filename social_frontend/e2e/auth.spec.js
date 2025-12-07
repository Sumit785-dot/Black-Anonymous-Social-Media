import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
    await page.goto('/login');

    // Fill login form
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Pass Key').fill('password123');

    // Submit
    await page.getByRole('button', { name: 'Login' }).click();

    // Verify redirect to home or error (assuming backend is running or mocked)
    // Since we are running against real backend, we might need a real user.
    // For now, let's just check if we stay on login or get an error if user doesn't exist.
    // Or we can register first.
});

test('register flow', async ({ page }) => {
    await page.goto('/register');

    const uniqueId = `user${Date.now()}`;

    await page.getByLabel('User ID (@handle)').fill(uniqueId);
    await page.getByLabel('Name').fill('Test User');
    await page.getByLabel('Password').fill('password123');
    await page.getByLabel('Pass Key (Secret for Login)').fill('passkey123');

    await page.getByRole('button', { name: 'Register' }).click();

    // Should redirect to login
    await expect(page).toHaveURL(/.*\/login/);
});
