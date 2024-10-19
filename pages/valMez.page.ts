import { expect, Locator, Page } from '@playwright/test';
import { clickIfElementExist } from '../helpers/helpers';

export class ValmezHomePage {
    readonly page: Page;
    readonly title: Locator;
    readonly headerMenu: Locator;
    readonly agreeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('h1.cvi');
        this.headerMenu = this.page.locator('ul.menu li');
        this.agreeButton = this.page.locator('a#vismo-cookies-agree-button');
    }

    async navigateTopage(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async checkHeader(): Promise<void> {
        await expect(this.title).toBeVisible({ timeout: 10000 });
    }

    async checkLink(nthElement: number): Promise<void> {
        await expect(this.headerMenu.nth(nthElement)).toBeVisible({ timeout: 10000 });
        await this.headerMenu.nth(nthElement).click();
    }

    async checkAllLinks(nthelement: number): Promise<void> {
        console.info(await this.headerMenu.allTextContents());
        await this.headerMenu.nth(nthelement).click();
    }

    // async clickIfElementExist(locator: Locator, timeout: number): Promise<void> {
    //     const elementVisible = await this.isElementExists(locator, timeout);
    //     if (elementVisible) {
    //         await locator.click();
    //     }
    // }

    // async isElementExists(locator: Locator, timeout?: number): Promise<boolean> {
    //     try {
    //         await locator.waitFor({ state: 'visible', timeout: timeout ?? 5000 });
    //         return true;
    //     }
    //     catch {
    //         return false;
    //     }
    // }

    async clickIfExists(timeout: number): Promise<void> {
        await clickIfElementExist(this.agreeButton, timeout)
    }
}