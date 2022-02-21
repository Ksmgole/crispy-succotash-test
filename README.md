# Crispy Succotash Test

A RSS scraper application which allows the users to add RSS feed Urls to a database, as well as  view and comment on the feed item.


## Installation
1. Clone the repository <code> git clone https://github.com/Ksmgole/crispy-succotash-test/ </code>
2. cd into the project directory <code> cd cripsy-succotash-test </code>
3. Initial npm <code> npm init </code>

## Running tests
- To run on testrunner <code> npm start </code>
- To run headless <code> npm run build </code>

## Folder structure
- Fixtures: Test data are stored in fixture JSON files. Two separate files are maintained for 'user' and 'feeds' data.
- Integration: All the test files are maintained inside this folder. Two main folders are created,each containing the respective test files as listed below:
   * Auth
     * Sign up
     * Login
   * Feeds
     * Add feed
     * All feed
     * Bookmark feed
     * Comment feed
     * Comment markdown
     * My feed
-  Support/command.js: This file contains reusable custom commands like <code> login, addFeed, bookmarkFeed, unbookmarkFeed, submitComment</code>.
-  Cypress.json:Configuration values are stored in this file.

## Assumption 
Following scenarios are assumed before starting the test
- <code> web_comment, feed_entry, web_bookmark, feed_feed </code> tables are truncated before running <code>feeds</code> test.
- There will be a test app hosted where the url could be used on running from CI.