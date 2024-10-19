import { test } from '@playwright/test';
import { ValmezHomePage } from '../pages/valMez.page';
import { ValMezMestoUradPage } from '../pages/valMezMestoUrad.page';
import { ValmezHomePagealMezVedeniMestaPage } from '../pages/valMezVedeniMesta.page';

test('Vam', async ({ page }) => {
    const vmHome = new ValmezHomePage(page);
    const vmMestoUrad = new ValMezMestoUradPage(page);
    const vmVedeni = new ValmezHomePagealMezVedeniMestaPage(page);
    // await page.goto('https://www.valasskemezirici.cz/')
    await vmHome.navigateTopage('https://www.valasskemezirici.cz/');
    await vmHome.checkHeader();
    await vmHome.checkAllLinks(0);
    await vmHome.clickIfExists(10000);
    // await vmHome.checkLink(0);
    await page.waitForTimeout(4000);
    await vmMestoUrad.checkAllLinks(1);
    await vmVedeni.getContact();
    await vmVedeni.enterString('whatever');
    await vmVedeni.checkResult('Žádná stránka nenalezena.');
    await page.waitForTimeout(4000);
});