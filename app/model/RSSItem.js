/**
 * @class FeedViewer.model.RSSItem
 */
Ext.define('FeedViewer.model.RSSItem', {
    extend: 'FeedViewer.model.Base',
    alias: 'model.rssitem',

    fields: [

        'title',
        'author',
        'link',
        'categories',
        'url',
        {
            name: 'publishedDate',
            type: 'date',
            dateFormat : 'c'
        },
        'content',
        'contentSnippet'
    ]

});