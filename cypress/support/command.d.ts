declare namespace Cypress{
    interface Chainable{

        /**
         * User login
         * 
         * @example
         * cy
         * .login()
         */
        login()

        /**
         * Add a new feed
         * 
         * @example
         * cy
         * .addFeed()
         */
        addFeed()

        /**
         * Bookmark a feed as a favorite
         * 
         * @example
         * cy
         * .bookmarkFeed()
         */
        bookmarkFeed()

        /**
         * Remove a feed frome the bookmarked list
         * 
         * @example
         * cy
         * .unbookmarkFeed()
         */
        unbookmarkFeed()

        /**
         * Submit a comment to the feed item
         * 
         * @example
         * cy
         * .submitComment()
         */
        submitComment()
    }
}