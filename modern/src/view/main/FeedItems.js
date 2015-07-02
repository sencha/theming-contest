/**
 * @class FeedViewer.view.main.FeedItems
 * @extends Ext.dataview.List
 *
 * A data view that shows items from an RSS list
 */
Ext.define('FeedViewer.view.main.FeedItems', {
    extend: 'Ext.dataview.List',
    xtype: 'feeditems',
    layout: 'fit',
    viewModel : {
        links: {
            feed: {
                type: 'FeedViewer.model.RSSFeed',
                create : true
            }
        }
    },
    itemTpl: '{title}',
    bind:{
        store: '{feed.entries}'
    }
});
