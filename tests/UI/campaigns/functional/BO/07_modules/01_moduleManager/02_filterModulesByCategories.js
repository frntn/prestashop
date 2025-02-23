// Import utils
import helper from '@utils/helpers';
import testContext from '@utils/testContext';

// Import commonTests
import loginCommon from '@commonTests/BO/loginBO';

// Import BO pages
import moduleManagerPage from '@pages/BO/modules/moduleManager';

require('module-alias/register');

// Using chai
const {expect} = require('chai');

// Import data
const {moduleCategories} = require('@data/demo/moduleCategories');

// Import pages
const dashboardPage = require('@pages/BO/dashboard');

const baseContext = 'functional_BO_modules_moduleManager_filterModulesByCategories';

let browserContext;
let page;

describe('BO - Modules - Module Manager : Filter modules by Categories', async () => {
  // before and after functions
  before(async function () {
    browserContext = await helper.createBrowserContext(this.browser);
    page = await helper.newTab(browserContext);
  });

  after(async () => {
    await helper.closeBrowserContext(browserContext);
  });

  it('should login in BO', async function () {
    await loginCommon.loginBO(this, page);
  });

  it('should go to \'Modules > Module Manager\' page', async function () {
    await testContext.addContextItem(this, 'testIdentifier', 'goToModuleManagerPage', baseContext);

    await dashboardPage.goToSubMenu(
      page,
      dashboardPage.modulesParentLink,
      dashboardPage.moduleManagerLink,
    );

    await moduleManagerPage.closeSfToolBar(page);

    const pageTitle = await moduleManagerPage.getPageTitle(page);
    await expect(pageTitle).to.contains(moduleManagerPage.pageTitle);
  });

  describe('Filter modules by categories', async () => {
    moduleCategories.forEach((category) => {
      it(`should filter by category : '${category}'`, async function () {
        await testContext.addContextItem(this, 'testIdentifier', `filterByCategory${category}`, baseContext);

        // Filter modules by categories
        await moduleManagerPage.filterByCategory(page, category);

        // Check first category displayed
        const firstBlockTitle = await moduleManagerPage.getBlockModuleTitle(page, 1);
        await expect(firstBlockTitle).to.equal(category);
      });
    });
  });
});
