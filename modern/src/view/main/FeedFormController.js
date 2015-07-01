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

        me.lookupReference('addFeed').enable();
        form.setLoading(false);

        if (success) {
            me.fireEvent('feedrequest', records);
            me.onClose();
        } else {
            me.lookupReference('feedUrl').markInvalid('The URL specified is not a valid RSS2 feed.');
        }
    },

    old_validateFeed: function(response){
        var me = this,
            refs = this.getReferences(),
            store, rec;

        try {
            data = response.data;
            if (data['title']) {
                store = refs.feedlist.getStore();
                rec = store.add({
                    title: data['title'],
                    feedUrl: data['feedUrl']
                })[0];

                me.getView().pop();
                me.hideNavButtons();
                refs.newfeedbutton.show();

                return;
            }
        } catch(e) {
        }
        this.markInvalid();
    },

    markInvalid: function(){
        this.down('button[text=Add Feed]').enable();
        this.form.setLoading(false);
        this.form.getComponent('feed').markInvalid('The URL specified is not a valid RSS2 feed.');
    }

});