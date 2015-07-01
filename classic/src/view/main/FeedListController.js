/**
 * @class FeedViewer.view.main.FeedPanelController
 */
Ext.define('FeedViewer.view.main.FeedListController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedlist',

    requires: [
        'Ext.fx.Anim',
        'Ext.menu.Menu'
    ],

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
            active = this.getSelectedItem();

        if (active) {

            view.getSelectionModel().deselectAll();

            this.animateNode(view.getNode(active), 1, 0, {
                scope: this,
                afteranimate: function() {

                    view.getStore().remove(active);

                }
            });
            view.fireEvent('feedremove', view, active.get('title'), active.get('url'));

            // publish event on the 'controller' domain for other subscribers
            this.fireEvent('feedremove', view, active.get('title'), active.get('url'));
        }
    },

    /**
     * React to a feed attempting to be added
     * @private
     */
    onAddFeedClick: function() {
        var win = this.addFeedWindow || (this.addFeedWindow = Ext.widget('feedwindow', {
                listeners: {
                    scope: this,
                    feedvalid: 'onFeedValid'
                }
            }));

        win.down('form').getForm().reset();
        win.show();
    },

    /**
     * React to a validation on a feed passing
     * @private
     * @param {FeedViewer.view.main.FeedWindow} win
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    onFeedValid: function(win, title, url) {
        var view = this.getView().down('dataview'),
            store = view.store,
            rec;

        rec = store.add({
            feedUrl: url,
            title: title
        })[0];

        this.animateNode(view.getNode(rec), 0, 1);
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
        Ext.destroy(this.menu, this.addFeedWindow);
    }

});
