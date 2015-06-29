/**
 * @class FeedViewer.store.Feeds
 */
Ext.define('FeedViewer.store.Feeds', {
    extend: 'Ext.data.Store',
    alias: 'store.feeds',
    requires:['FeedViewer.model.Feed'],
    model: 'FeedViewer.model.Feed',
    storeId: 'Feeds',
    data : [
        { "title": "Sencha Blog", "url": "http://feeds.feedburner.com/sencha", "icon": "" },
        { "title": "Sencha Forums", "url": "http://sencha.com/forum/external.php?type=RSS2",  "icon": "" },
        { "title": "Ajaxian", "url": "http://feeds.feedburner.com/ajaxian", "icon": "" }
    ]

});
