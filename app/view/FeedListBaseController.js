/**
 * @class FeedViewer.view.main.FeedPanelController
 */
Ext.define('FeedViewer.view.main.FeedListBaseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedlistbase',

    listen: {
        controller: {
            '*': {
                feedrequest: 'onFeedRequest'
            }
        }
    },

    /**
     * @event feedremove Fired when a feed is removed
     * @param {FeedViewer.model.RSSFeed} feed
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */

    /**
     * @event feedselect Fired when a feed is selected
     * @param {FeedViewer.model.RSSFeed} feed
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */


    onViewReady: function(view){
        var store = Ext.data.StoreManager.lookup('Feeds');

        if (store && store.getCount()) {
            view.getSelectionModel().select(0);
        }
    },


    /**
     * Used when view selection changes so we can disable toolbar buttons.
     * @private
     */
    onFeedSelection: function(selModel){
        var me = this,
            selected = me.getSelectedItem();

        if (selected) {
            me.loadFeed(selected);
        }
    },

    /**
     * Loads a feed.
     * @private
     * @param {FeedViewer.model.RSSFeed} feed The feed
     */
    loadFeed: function(feed) {
        if (feed) {
            this.fireEvent('feedselect', this, feed, feed.get('title'), feed.get('feedUrl'));
        }
    },

    /**
     * Returns the selected feed or false if nothing is selected.
     * @private
     * @return {FeedViewer.model.RSSFeed}
     */
    getSelectedItem: function() {
        var ref = this.lookupReference('feedList');
        return ref ? ref.getSelectionModel().getSelection()[0] || false : false;
    },

    /**
     * React to a feed being removed
     * @private
     */
    onRemoveFeedClick: function(button) {
        var activeFeed = this.getSelectedItem();

        if (activeFeed) {
            // publish event on the 'controller' domain for other subscribers
            this.fireEvent('feedremove', activeFeed, activeFeed.get('title'), activeFeed.get('url'));
        }
    },

    /**
     * Inserts a new model.RSSFeed into the dataview
     * @private
     * @param {FeedViewer.model.RSSFeed} feed
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    onFeedRequest: function(feed, title, url) {
        var view = this.getView().down('dataview'),
            store = view.getStore();

        store.add(feed);
        return feed;
    }

});
