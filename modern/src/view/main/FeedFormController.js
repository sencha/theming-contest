/**
 * @class FeedViewer.view.main.FeedFormController
 */
Ext.define('FeedViewer.view.main.FeedFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.feedform',

    onSaveClick: function () {
        var form = this.getView().getValues(),
            feed = Ext.create('FeedViewer.model.RSSFeed');

        if(form && form.feedUrl){
            feed.load({
                url : form.feedUrl,
                callback: 'validateFeed',
                scope: this
            });
        }
    },

    validateFeed: function(records, operation, success) {
        var me = this,
            form = me.lookupReference('feedForm');

        // me.lookupReference('addFeed').enable();
        // form.setLoading(false);

        if (success) {
            me.fireEvent('feedrequest', records);
            me.getView().up('app-main').pop();
        } else {
            me.lookupReference('feedUrl').markInvalid('The URL specified is not a valid RSS2 feed.');
        }
    }

});