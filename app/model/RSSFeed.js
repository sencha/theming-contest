/**
 * @class FeedViewer.model.RSSFeed
 */
Ext.define('FeedViewer.model.RSSFeed', {
    extend: 'FeedViewer.model.Base',
    alias: 'model.rssfeed',

    uses : ['FeedViewer.model.RSSItem'],

    fields : [ 'title', 'author', 'link', 'description', 'feedUrl', 'type' ],

    hasMany: {
        model: 'FeedViewer.model.RSSItem',
        name: 'entries'
    },

    proxy: {
        type: 'googglerss'
    }
});