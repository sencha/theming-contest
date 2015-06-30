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
    itemTpl: '{title}',
    store: {
        type: 'feeditems'
    }

});
