/**
 * @class FeedViewer.view.main.FeedListViewModel
 */
Ext.define('FeedViewer.view.main.FeedListViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'FeedViewer.model.RSSFeed'
    ],
    alias: 'viewmodel.feedlist',

    stores:{
        feeds: {
            model: 'FeedViewer.model.RSSFeed'
        }
    }

});
