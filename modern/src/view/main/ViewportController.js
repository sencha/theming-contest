/**
 * @class FeedViewer.view.main.ViewportController
 */
Ext.define('FeedViewer.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',

    listen: {
        component: {
            'feedlist button[action=new]': {
                tap: 'onNewFeedClick'
            },
            'feedlist': {
                select: 'onFeedSelect'
            },
            'feeditems': {
                select: 'onFeedItemSelect'
            },
            'feedform button[action=save]': {
                tap: 'onSaveClick'
            }
        }
    },

    /**
     * React to selection of a feed, load the items.
     * @private
     */
    onFeedSelect: function (view, record) {
        var me = this,
            viewport = me.getView();

        record.load({
                url : record.get('feedUrl'),
                limit : 50,
                callback: function(records, operation, success) {
                    var list, vm;
                    if(success){
                        list = viewport.push({
                            xtype: 'feeditems',
                            title: record.get('title')
                        });

                        vm = list.getViewModel();
                        vm.set('feed',record);
                        vm.notify(); // notify Feed model binders

                    }
                }}
        );
    },

    /**
     * React to selection of an item, load the post.
     * @private
     */
    onFeedItemSelect : function (view, record) {
        var me = this,
            refs = this.getReferences(),
            vm,
            viewport = me.getView();

        viewport.push({
            xtype: 'feedpost',
            title: record.get('title')
        });

        vm = viewport.down('feedpost').getViewModel();
        vm.set('feed', record.data);

    },

    /**
     * React to new button to open form.
     * @private
     */
    onNewFeedClick: function () {
        this.getView().push({
            xtype: 'feedform',
            reference: 'feedform'
        });
    },

    /**
     * React to the new form save button being clicked.
     * @private
     */
    onSaveClick: function () {
        var form = this.getView().down('feedform').getValues(),
            feed = Ext.create('FeedViewer.model.RSSFeed');

        if(form && form.feedUrl){
            feed.load({
                url : form.feedUrl,
                callback: 'validateFeed',
                scope: this
            });
        }
    },

    /**
     * validates a feed from save click callback, adds the feed and returns to list
     * @private
     */
    validateFeed: function(feed, operation, success) {
        var me = this,
            view = this.getView();

        if (success) {
            view.down('feedlist').getStore().add(feed);
            me.getView().pop();
        } else {
            me.lookupReference('feedUrl').markInvalid('The URL specified is not a valid RSS2 feed.');
        }
    }
});
