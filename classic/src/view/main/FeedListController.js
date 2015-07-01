/**
 * @class FeedViewer.view.main.FeedPanelController
 */
Ext.define('FeedViewer.view.main.FeedListController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedlist',

    requires: [
        'Ext.fx.Anim'
    ],

    init: function() {
        this.listen({
            controller: {
                '*': {
                    feedrequest: 'onFeedRequest'
                }
            }
        });
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

      var store = Ext.data.StoreManager.lookup('Feeds'),
         first = store && store.first();

         if (first) {
            view.getSelectionModel().select(first);
         }
    },


    /**
     * Used when view selection changes so we can disable toolbar buttons.
     * @private
     */
    onFeedSelection: function(selModel){
        var me = this,
            selected = this.getSelectedItem(),
            refs = me.getReferences();

        refs.removeFeed.setDisabled(!selected);

        if (selected) {
            this.loadFeed(selected);
        }
    },

    /**
     * React to the load feed menu click.
     * @private
     */
    onLoadClick: function() {
        this.loadFeed(this.menu.activeFeed);
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
        return this.lookupReference('feedList').getSelectionModel().getSelection()[0] || false;
    },


    /**
     * React to a feed being removed
     * @private
     */
    onRemoveFeedClick: function(button) {
        var view = this.getView().down('dataview'),
            activeFeed = this.getSelectedItem();

        if (activeFeed) {
            view.getSelectionModel().deselectAll();
            this.animateNode(view.getNode(activeFeed), 1, 0, {
                scope: this,
                afteranimate: function() {
                    view.getStore().remove(activeFeed);
                }
            });
            view.fireEvent('feedremove', view, activeFeed.get('title'), activeFeed.get('url'));

            // publish event on the 'controller' domain for other subscribers
            this.fireEvent('feedremove', activeFeed, activeFeed.get('title'), activeFeed.get('url'));
        }
    },

    /**
     * React to a feed attempting to be added
     * @private
     */
    onAddFeedClick: function() {
        var win = this.addFeedWindow || (this.addFeedWindow = Ext.widget('feedwindow'));
        win.down('form').getForm().reset();
        win.show();
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
        this.animateNode(view.getNode(feed), 0, 1);
    },

    /**
     * Animate a node in the view when it is added/removed
     * @private
     * @param {Mixed} el The element to animate
     * @param {Number} start The start opacity
     * @param {Number} end The end opacity
     * @param {Object} listeners (optional) Any listeners
     */
    animateNode: function(el, start, end, listeners) {
        Ext.create('Ext.fx.Anim', {
            target: Ext.getDom(el),
            duration: 500,
            from: {
                opacity: start
            },
            to: {
                opacity: end
            },
            listeners: listeners
        });
    },

    // Inherit docs
    onDestroy: function() {
        this.callParent(arguments);
        Ext.destroy(this.addFeedWindow);
    }

});
