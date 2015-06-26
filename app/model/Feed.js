/**
 * @class FeedViewer.model.Feed
 */
Ext.define('FeedViewer.model.Feed', {
    extend: 'Ext.data.Model',
    alias: 'model.feed',
    fields: [
        'title', 'url', 'icon'
    ],

    proxy: {
        type: 'memory',
        url: 'resources/data/feeds.json',
        reader: {
            type: 'json'
        }
    }
});