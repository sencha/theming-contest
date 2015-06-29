/**
 * @class FeedViewer.store.Feeds
 */
Ext.define('FeedViewer.store.Feeds', {
    extend: 'Ext.data.Store',
    alias: 'store.feeds',
    model: 'FeedViewer.model.RSSFeed',
    storeId: 'Feeds',
    data : [
        { "title": "Sencha", "url": "http://feeds.feedburner.com/sencha", "icon": "" },
        { "title": "Yahoo!", "url": "http://news.yahoo.com/rss/", "icon": "" },
        { "title": "Google Tech", "url": "http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=tc&output=rss",  "icon": "" },
        { "title": "Google Business", "url": "http://news.google.com/news?pz=1&cf=all&ned=us&hl=en&topic=b&output=rss", "icon": "" }
    ]

});
