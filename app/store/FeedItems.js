/**
 * @class FeedViewer.store.FeedItems
 */
Ext.define('FeedViewer.store.FeedItems', {
    extend: 'Ext.data.Store',
    alias: 'store.feeditems',
    requires:['FeedViewer.model.FeedItem'],
    model: 'FeedViewer.model.FeedItem'
});
