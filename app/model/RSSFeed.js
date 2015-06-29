/**
 * @class FeedViewer.model.RSSFeed
 */
Ext.define('FeedViewer.model.RSSFeed', {
    extend: 'FeedViewer.model.Base',
    alias: 'model.rssfeed',

    fields : [ 'title', 'author', 'link', 'description' ],

    hasMany: {
        model: 'RSSItem',
        name: 'entries'
    },

    proxy: {
        type: 'googglerss',
        //url: 'http://feeds.feedburner.com/sencha',

        reader: {
            type: 'json'
        }
    }
});