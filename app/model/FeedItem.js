/**
 * @class FeedViewer.model.FeedItem
 */
Ext.define('FeedViewer.model.FeedItem', {
    extend: 'Ext.data.Model',
    alias: 'model.feeditem',
    pageSize: 20,

    fields: [

        {
            name: 'title',
            convert: function(v) {
                return Ext.htmlEncode(v);
            }
        },
        'author',
        'link',
        {
            name: 'pubDate',
            type: 'date'
        },
        {
            // Some feeds return the description as the main content
            // Others return description as a summary. Figure this out here
            name: 'description',
            mapping: function(raw) {
                var DQ = Ext.dom.Query,
                    content = DQ.selectNode('content', raw),
                    key;

                if (content && DQ.getNodeValue(content)) {
                    key = 'description';
                } else {
                    key = 'title';
                }
                return DQ.selectValue(key, raw);

            }
        },
        {
            name: 'content',
            mapping: function(raw) {
                var DQ = Ext.dom.Query,
                    content = DQ.selectNode('content', raw);

                if (!content || !DQ.getNodeValue(content)) {
                    content = DQ.selectNode('description', raw);
                }
                return DQ.getNodeValue(content, '');
            }
        }
    ],

    proxy: {
        type: 'ajax',
        url: 'http://rss.cnn.com/rss/edition.rss',
        //url: 'resources/data/feeditemsdefault.json',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});