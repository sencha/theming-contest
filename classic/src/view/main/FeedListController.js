/**
 * @class FeedViewer.view.main.FeedPanelController
 */
Ext.define('FeedViewer.view.main.FeedListController',{
    extend: 'FeedViewer.view.main.FeedListBaseController',
    alias: 'controller.feedlist',

    requires: [
        'Ext.fx.Anim'
    ],

    /**
     * Used when view selection changes so we can disable toolbar buttons.
     * @private
     */
    onFeedSelection: function(selModel){
        var me = this,
            selected = this.getSelectedItem(),
            refs = me.getReferences();

        refs.removeFeed.setDisabled(!selected);
        return me.callParent(arguments);
    },

    /**
     * React to a feed being removed
     * @private
     */
    onRemoveFeedClick: function(button) {
        var view = this.getView().down('dataview'),
            activeFeed = this.getSelectedItem();

        if (activeFeed) {
            this.callParent(arguments);
            view.getSelectionModel().deselectAll();
            this.animateNode(view.getNode(activeFeed), 1, 0, {
                scope: this,
                afteranimate: function() {
                    view.getStore().remove(activeFeed);
                }
            });
            view.fireEvent('feedremove', view, activeFeed.get('title'), activeFeed.get('url'));
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
        var view = this.getView().down('dataview');

        feed = this.callParent(arguments);
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
