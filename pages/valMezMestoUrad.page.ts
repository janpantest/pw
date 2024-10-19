import { expect, Locator, Page } from '@playwright/test';
import { clickIfElementExist } from '../helpers/helpers';

export class ValMezMestoUradPage {
    readonly page: Page;
    readonly title: Locator;
    readonly tabLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('h1.cvi');
        this.tabLink = this.page.locator('li strong a');
    }

    async checkHeader(): Promise<void> {
        await expect(this.title).toBeVisible({ timeout: 10000 });
    }

    async checkAllLinks(nthelement: number): Promise<void> {
        console.info(await this.tabLink.allTextContents());
        await this.tabLink.nth(nthelement).click();
    }
}