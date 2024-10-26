import { expect, Locator, Page } from '@playwright/test';
import { clickIfElementExist } from '../helpers/helpers';
import fs from 'fs';

export class ILiteraturaPage {
    readonly page: Page;
    readonly agreeButton: Locator;
    readonly inputField: Locator;
    readonly bookTitle: Locator;
    readonly showMoreButton: Locator;
    readonly specificBook: Locator;
    readonly detailBook: Locator;

    constructor(page: Page) {
        this.page = page;
        this.agreeButton = this.page.locator('#c-bns #c-p-bn');
        this.inputField = this.page.getByLabel('Najít');
        this.bookTitle = this.page.locator('h2.h3');
        this.showMoreButton = this.page.locator('div.show-more a');
        this.specificBook = this.page.locator('//h2/a[contains(text(), "Totožnost")]');
        this.detailBook = this.page.locator('div.col.col-lg-6 #snippet--articles');
    }

    async goToGoBooks(url: string): Promise<void> {
        await this.page.goto(url);
    }

    async clickIfExist(): Promise<void> {
        await clickIfElementExist(this.agreeButton, 7000);
    }

    async searchForString(string: string): Promise<void> {
        const items = this.bookTitle;

        for (let i = 0; i < await items.count(); i++) {
            const text = await this.bookTitle.nth(i).textContent({ timeout: 80000 });

            if (text === string) {
                break;
            }

            await expect(this.showMoreButton).toBeVisible({ timeout: 50000 });
            await this.showMoreButton.click();
        }
    }

    async clickSpecificBook(value: string): Promise<void> {
        await expect(this.page.locator(`//h2/a[contains(text(), '${value}')]`)).toBeVisible({ timeout: 120000 });
        await this.page.locator(`//h2/a[contains(text(), '${value}')]`).click();
    }

    async getDetail(value: string, time: string): Promise<void> {
        const bookDetail = await this.detailBook.textContent({ timeout: 80000 });
        const bookDetailRun =  JSON.stringify(bookDetail);
        fs.writeFileSync(`output/${time}_${value}_book.txt`, bookDetailRun)
    }
}