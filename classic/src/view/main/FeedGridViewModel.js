Ext.define('FeedViewer.view.main.FeedGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.feedgrid',

    requires: [
        'FeedViewer.store.FeedItems'
    ],

    data: {
        feed: Ext.create('FeedViewer.model.RSSFeed')
    },

    stores: {
        feeditems: {
            //Store reference
            type: 'feeditems'
        }
    }
});