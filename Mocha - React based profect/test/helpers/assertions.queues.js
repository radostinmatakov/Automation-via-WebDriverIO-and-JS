const assert = require('assert');

/**
 * sub page containing specific selectors and methods for assertions
 */
class AssertionsQueues {
    // Getters for Assertions
    get queueNumber() {
        return $('//a[normalize-space()="9998"]');
    }
    get queueNumberCopy() {
        return $('//a[normalize-space()="9997"]');
    }
    get queueName() {
        return $("(//td[@class='m_4e7aa4ef mantine-Table-td mantine-datatable-pointer-cursor'])[2]");
    }
    get emptyTable() {
        return $("(//div[@class='mantine-focus-auto m_b6d8b162 mantine-Text-root'])[2]");
    }
    get disabledTableRow() {
        return $('tr.m_4e7aa4fd.mantine-Table-tr.mantine-datatable-row.disabled');
    }
    get enabledTableRow() {
        return $('tr.m_4e7aa4fd.mantine-Table-tr.mantine-datatable-row');
    }
    get notifyMessage() {
        return $('#swal2-title');
    }


    // Assertions methods to encapsule automation code to interact with the page
    // Message assertion 
    async waitForSuccessMessage() {
        await this.notifyMessage.waitForDisplayed();
    }
    async assertSuccessMessage(message) {
        await this.waitForSuccessMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }

    async waitForUpdateMessage() {
        await this.notifyMessage.waitForDisplayed();
    }
    async assertUpdateMessage(message) {
        await this.waitForUpdateMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }

    async waitForDissableMessage() {
        await this.notifyMessage.waitForDisplayed();
    }
    async assertDissableMessage(message) {
        await this.waitForDissableMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }

    async waitForEnableMessage() {
        await this.notifyMessage.waitForDisplayed();
    }
    async assertEnableMessage(message) {
        await this.waitForEnableMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }

    async waitForDeleteMessage() {
        await this.notifyMessage.waitForDisplayed();
    }
    async assertDeleteMessage(message) {
        await this.waitForDeleteMessage();
        await expect(this.notifyMessage).toHaveText(expect.stringContaining(message));
    }


    // Text assertion 
    async waitForCreatedQueueNumber() {
        await this.queueNumber.waitForDisplayed();
    }
    async assertCreatedQueueNumberLinkText(expectedText) {
        await this.waitForCreatedQueueNumber();
        const actualText = await this.queueNumber.getText();
        assert.ok(actualText.includes(expectedText), `Expected "${expectedText}" to be in "${actualText}"`);
    }

    async waitForCopiedQueueNumber() {
        await this.queueNumberCopy.waitForDisplayed();
    }
    async assertCopiedQueueNumberLinkText(expectedText) {
        await this.waitForCopiedQueueNumber();
        const actualText = await this.queueNumberCopy.getText();
        assert.ok(actualText.includes(expectedText), `Expected "${expectedText}" to be in "${actualText}"`);
    }

    async waitForCreatedQueuesName() {
        await this.queueName.waitForDisplayed();
    }
    async assertCreatedQueueNameLinkText() {
        await this.waitForCreatedQueuesName();
        const actualText = await this.queueName.getText();
        assert.ok(actualText.includes(global.queuesName), `Expected "${global.queuesName}" to be in "${actualText}"`);
    }

    async waitForEditedQueuesName() {
        await this.queueName.waitForDisplayed();
    }
    async assertEditedQueueNameLinkText() {
        await this.waitForEditedQueuesName();
        const actualText = await this.queueName.getText();
        assert.ok(actualText.includes(global.editQueuesName), `Expected "${global.editQueuesName}" to be in "${actualText}"`);
    }

    async waitForCopiedQueuesName() {
        await this.queueName.waitForDisplayed();
    }
    async assertCopiedQueueNameLinkText() {
        await this.waitForCopiedQueuesName();
        const actualText = await this.queueName.getText();
        assert.ok(actualText.includes(global.copyQueuesName), `Expected "${global.copyQueuesName}" to be in "${actualText}"`);
    }

    async waitForEmptyTable() {
        await browser.waitUntil(
            async () => {
                return await this.emptyTable.isDisplayed(); // Check if the empty table message is displayed
            },
            {
                timeout: 20000, // Adjust based on expected response time
                interval: 500,   // Poll every 500ms
                timeoutMsg: "Empty table message did not appear within 20s",
            }
        );
    }
    async assertEmptyTable(expectedMessage) {
        await this.waitForEmptyTable(); 
        const messageText = await this.emptyTable.getText();
        expect(messageText).toContain(expectedMessage);
    }

    async assertTableRowIsDisabled() {
        await this.disabledTableRow.waitForDisplayed({ timeout: 5000 });
        const isDisabled = await this.disabledTableRow.getAttribute('class');
        expect(isDisabled).toContain('disabled');
    }

    async assertTableRowIsEnabled() {
        await this.enabledTableRow.waitForDisplayed({ timeout: 5000 });
        await expect(this.enabledTableRow).not.toHaveElementClass(expect.stringContaining('disabled'));
    }
}

module.exports = new AssertionsQueues();