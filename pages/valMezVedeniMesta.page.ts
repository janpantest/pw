import { expect, Locator, Page } from '@playwright/test';
import { clickIfElementExist } from '../helpers/helpers';
import fs from 'fs';

export class ValmezHomePagealMezVedeniMestaPage {
    readonly page: Page;
    readonly title: Locator;
    readonly contact: Locator;
    readonly inputField: Locator;
    readonly result: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = this.page.locator('h1.cvi');
        this.contact = this.page.locator('dl.kontakty');
        this.inputField = this.page.locator('input#hl');
        this.result = this.page.locator('p.stav');
    }

    async checkHeader(): Promise<void> {
        await expect(this.title).toBeVisible({ timeout: 10000 });
    }

    async getContact(time: string): Promise<void> {
        console.info(await this.contact.allTextContents());
        const contacts = await this.contact.allTextContents();
        const contactsRun =  JSON.stringify(contacts);
        fs.writeFileSync(`output/${time}_kontakty.txt`, contactsRun)
    }

    async enterString(string: string): Promise<void> {
        await expect(this.inputField).toBeVisible({ timeout: 30000 });
        await this.inputField.click();
        await this.inputField.fill(string);
        await this.page.keyboard.press('Enter')
    }

    async checkResult(string: string): Promise<void> {
        expect(await this.result.textContent()).toEqual(string)
    }
}