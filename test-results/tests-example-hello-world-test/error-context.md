# Test info

- Name: hello world test
- Location: C:\Users\LENOVO\DavidKRK.github.io\tests\example.spec.ts:3:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: "Titre de votre application"
Received: "David KRK - Techno DJ & Producer"
    at C:\Users\LENOVO\DavidKRK.github.io\tests\example.spec.ts:6:19
```

# Page snapshot

```yaml
- img "Logo David KRK"
- paragraph: "\"MAY THE TECHNO BE WITH YOU\""
- img "David KRK - Techno DJ & Producer"
- img "David KRK - Live DJ Performance"
- contentinfo:
  - img "Logo David KRK"
  - paragraph: "\"MAY THE TECHNO BE WITH YOU\""
  - link "Facebook":
    - /url: https://www.facebook.com/DavidKRKofficial
  - link "YouTube":
    - /url: https://www.youtube.com/user/DavidKRKofficial
  - link "Instagram":
    - /url: https://www.instagram.com/davidkrk/
  - link "SoundCloud":
    - /url: https://www.soundcloud.com/davidkrk
  - link "Contact David KRK":
    - /url: mailto:davidkrkofficial@gmail.com
  - paragraph: © 2025 DAVID KRK - ALL RIGHTS RESERVED
  - button "FR"
  - button "EN"
  - button "ES"
  - button "EU"
  - button "RO"
  - button "中文"
  - button "日本語"
```

# Test source

```ts
  1 | import { test, expect } from '@playwright/test';
  2 |
  3 | test('hello world test', async ({ page }) => {
  4 |     await page.goto('http://localhost:3000');
  5 |     const title = await page.title();
> 6 |     expect(title).toBe('Titre de votre application');
    |                   ^ Error: expect(received).toBe(expected) // Object.is equality
  7 | });
```