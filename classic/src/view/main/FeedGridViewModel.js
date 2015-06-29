Ext.define('FeedViewer.view.main.FeedGridViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.feedgrid',

    requires: [
        'FeedViewer.store.FeedItems'
    ],

    stores: {
        feeditems: {
            //Store reference
            type: 'feeditems'
        }
    }
});