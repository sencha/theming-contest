/**
 * @class FeedViewer.view.main.Main
 */
Ext.define('FeedViewer.store.Feeds', {
    extend: 'Ext.data.Store',
    alias: 'store.feeds',
    requires:['FeedViewer.model.Feed'],
    model: 'FeedViewer.model.Feed'
});
