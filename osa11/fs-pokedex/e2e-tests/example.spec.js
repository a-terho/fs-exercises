const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Pokedex', () => {
  beforeEach(async ({ page }) => {
    await page.goto('')
  })

  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(
      page.getByText(
        'Pokémon and Pokémon character names are trademarks of Nintendo.',
      ),
    ).toBeVisible()
  })

  test('you can navigate to a Pokemon specific page by clicking one', async ({
    page,
  }) => {
    await page.getByText('ivysaur').click()
    await expect(page.getByText('Special Defense')).toBeVisible()
    await expect(page.getByText('Special Attack')).toBeVisible()
    await expect(page.getByText('chlorophyll')).toBeVisible()
  })
})
