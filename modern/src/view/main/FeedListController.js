/**
 * @class FeedViewer.view.main.FeedListController
 */
Ext.define('FeedViewer.view.main.FeedListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedlist',

    init: function() {
        this.listen({
            controller: {
                '*': {
                    feedrequest: 'onFeedRequest',
                    removeselectedfeed : 'onRemoveSelectedFeed'
                }
            }
        });
    },

    onFeedListSelect: function (view, record) {
        var me = this,
            viewport = me.getView().up('app-main'),
            vm;

        record.load({
                url : record.get('feedUrl'),
                limit : 50,
                callback: function(records, operation, success) {
                    if(success){
                        viewport.push({
                            xtype: 'feeditemlist',
                            title: record.get('title'),
                            reference: 'feeditempanel'
                        });

                        vm = viewport.down('feeditemlist').getViewModel();
                        vm.set('feed',record);
                        vm.notify(); // notify Feed model binders

                    }
                }}
        );
    },

    onNewFeedClick: function () {
        this.getView().up('app-main').push({
            xtype: 'feedform',
            reference: 'feedform'
        });
    },

    onRemoveSelectedFeed: function () {
        var refs = this.getReferences(),
            active;

        active = refs.feedlist.getSelection()[0];
        if (active) {
            refs.feedlist.deselectAll();
            refs.feedlist.getStore().remove(active);
        }
        this.getView().up('app-main').pop();

    },

    /**
     * Inserts a new model.RSSFeed into the list
     * @private
     * @param {FeedViewer.model.RSSFeed} feed
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    onFeedRequest: function(feed, title, url) {
        var view = this.getView().down('list'),
            store = view.getStore();

        store.add(feed);
        //this.animateNode(view.getNode(feed), 0, 1);
    }

});