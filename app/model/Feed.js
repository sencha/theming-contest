/**
 * @class FeedViewer.model.Feed
 */
Ext.define('FeedViewer.model.Feed', {
    extend: 'Ext.data.Model',
    alias: 'model.feed',
    fields: [
        'title', 'url', 'icon'
    ],

    pageSize: 20,

    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'resources/data/feeds.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});