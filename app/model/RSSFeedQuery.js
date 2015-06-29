/**
 * @class FeedViewer.model.RSSFeedQuery
 */
Ext.define('FeedViewer.model.RSSFeedQuery', {
    extend: 'FeedViewer.model.RSSFeed',
    alias: 'model.rssfeedquery',

    proxy: {
        type: 'googglerss',
        api : {
            read : 'findFeeds'
        }
    }
});