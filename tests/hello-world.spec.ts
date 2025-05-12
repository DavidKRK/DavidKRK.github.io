import { test, expect } from '@playwright/test';

test('hello world test', async ({ page }) => {
  await page.goto('http://localhost:3000');
  const title = await page.title();
  expect(title).toBe('David KRK - Techno DJ & Producer'); // Titre mis à jour
});