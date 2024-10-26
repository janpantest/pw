import { expect, Locator, Page } from '@playwright/test';
import { clickIfElementExist } from '../helpers/helpers';

export class GooglePage {
    readonly page: Page;
    readonly disagreeButton: Locator;
    readonly inputField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.disagreeButton = this.page.getByRole('button', { name: 'Odmítnout vše' });
        this.inputField = this.page.getByLabel('Najít');
    }

    async goToGoogle(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async clickIfExist(): Promise<void> {
        await clickIfElementExist(this.disagreeButton, 7000);
    }

    async searchForString(string: string): Promise<void> {
        await expect(this.inputField).toBeVisible({ timeout: 10000 });
        await this.inputField.fill(string);
        await this.page.keyboard.press('Enter')
    }
}