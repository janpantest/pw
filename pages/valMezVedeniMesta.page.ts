import { expect, Locator, Page } from '@playwright/test';
import { clickIfElementExist } from '../helpers/helpers';

export class ValmezHomePagealMezVedeniMestaPage {
    readonly page: Page;
    readonly title: Locator;
    readonly contact: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('h1.cvi');
        this.contact = this.page.locator('dl.kontakty');
    }

    async checkHeader(): Promise<void> {
        await expect(this.title).toBeVisible({ timeout: 10000 });
    }

    async getContact(): Promise<void> {
        console.info(await this.contact.allTextContents());
    }
}