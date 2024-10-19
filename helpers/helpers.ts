import { Locator } from '@playwright/test';

export async function clickIfElementExist(locator: Locator, timeout: number): Promise<void> {
    const elementVisible = await isElementExists(locator, timeout);
    if (elementVisible) {
        await locator.click();
    }
}

export async function isElementExists(locator: Locator, timeout?: number): Promise<boolean> {
    try {
        await locator.waitFor({ state: 'visible', timeout: timeout ?? 5000 });
        return true;
    }
    catch {
        return false;
    }
}