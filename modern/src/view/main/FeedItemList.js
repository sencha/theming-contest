/**
 * @class FeedViewer.view.main.FeedItemList
 * @extends Ext.dataview.List
 *
 * A data view that shows items from an RSS list
 */
Ext.define('FeedViewer.view.main.FeedItemList', {
    extend: 'Ext.dataview.List',
    xtype: 'feeditemlist',
    layout: 'fit',
    controller: 'feeditemlist',

    viewModel : {
        links: {
            feed: {
                type: 'FeedViewer.model.RSSFeed',
                create : true
            }
        }
    },
    reference: 'feeditemlist',
    itemTpl: '{title}',
    bind:{
        store: '{feed.entries}'
    },
    listeners: {
        select: 'onFeedListItemSelect'
    },
    items:[{
        xtype : 'toolbar',
        docked: 'bottom',
        items:[{
            xtype: 'spacer'
        },{
            xtype: 'button',
            reference: 'removebutton',
            text: 'Remove',
            handler: 'onRemoveClick'

        }]
    }]

});
