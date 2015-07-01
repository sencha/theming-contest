
/**
 * @class FeedViewer.view.main.FeedWindowController
 */
Ext.define('FeedViewer.view.main.FeedWindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedwindow',

    /**
     * @event feedvalid
     * @param {FeedViewer.FeedWindow} this
     * @param {String} title
     * @param {String} url
     * @param {String} description
     */


    onClose: function(button) {
        var view = this.getView();
        view[view.closeAction]();
    },

    /**
     * React to the add button being clicked.
     * @private
     */
    onAddClick: function(addBtn) {
        addBtn.disable();
        var url = this.lookupReference('feedUrl').getValue(),
            feed = Ext.create('FeedViewer.model.RSSFeed');

        this.lookupReference('feedForm').setLoading({
            msg: 'Validating feed...'
        });

        feed.load({
            url : url,
            callback: 'validateFeed',
            scope: this
        });

    },

    /**
     * React to the feed validation responses
     * @private
     */
    validateFeed: function(records, operation, success) {
        var me = this,
            form = me.lookupReference('feedForm');

        me.lookupReference('addFeed').enable();
        form.setLoading(false);

        if (success) {
            me.fireEvent('feedrequest', records);
            me.onClose();
        } else {
            me.lookupReference('feedUrl').markInvalid('The URL specified is not a valid RSS2 feed.');
        }
    }

});
