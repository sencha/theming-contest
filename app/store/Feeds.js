/**
 * @class FeedViewer.store.Feeds
 */
Ext.define('FeedViewer.store.Feeds', {
    extend: 'Ext.data.Store',
    alias: 'store.feeds',
    model: 'FeedViewer.model.RSSFeed',
    storeId: 'Feeds',
    data : [
        { id: 1, "title": "Sencha", "feedUrl": "http://feeds.feedburner.com/sencha" },
        { id: 2, "title": "Yahoo!", "feedUrl": "http://news.yahoo.com/rss/" },
        { id: 3, "title": "Google Tech", "feedUrl": "http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=tc&output=rss" },
        { id: 4, "title": "Google Business", "feedUrl": "http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=b&output=rss" }
    ]
});
