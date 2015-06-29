/**
 * @class FeedViewer.view.main.FeedInfoViewModel
 */
Ext.define('FeedViewer.view.main.FeedInfoViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'FeedViewer.model.RSSFeed'
    ],
    alias: 'viewmodel.feedinfo',

    data: {
        RSSfeed: Ext.create('FeedViewer.model.RSSFeed')
    }


});