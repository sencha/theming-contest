Ext.define('FeedViewer.view.main.FeedDetailViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.feeddetail',

    requires: [
        'FeedViewer.model.RSSFeed'
    ],

    data: {
        feed: Ext.create('FeedViewer.model.RSSFeed')
    }

});