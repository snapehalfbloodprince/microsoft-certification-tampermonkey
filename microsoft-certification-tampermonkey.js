// ==UserScript==
// @name         Add Certifications Renewal Dates on Microsoft Learn Dashboard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @license      GNU General Public License (https://www.gnu.org/licenses/gpl-3.0.en.html)
// @description  Script to add Certifications Renewal Dates on Microsoft Learn Dashboard
// @author       Francesco Paolo Piga
// @match        https://learn.microsoft.com/*/users/*/credentials*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function addRenewalDates() {
        const expirationItems = document.querySelectorAll('li[data-test-id="certification-expiration-text"]');

        if (expirationItems.length === 0) {
            // Retry after 500 milliseconds if the items are not yet available
            setTimeout(addRenewalDates, 500);
            return;
        }

        expirationItems.forEach(item => {
            const expirationText = item.textContent.trim();
            const dateMatch = expirationText.match(/Expires on (.+?) at/);
            if (dateMatch && dateMatch[1]) {
                const expirationDate = new Date(dateMatch[1]);
                const renewalDate = new Date(expirationDate);
                renewalDate.setDate(renewalDate.getDate() - 180);

                const renewalItem = document.createElement('li');
                renewalItem.style.paddingLeft = '20px';
                renewalItem.textContent = `\tFirst renewal date: ${renewalDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;

                item.parentNode.insertBefore(renewalItem, item.nextSibling);
            }
        });
    }

    // Start checking for elements
    addRenewalDates();
})();
