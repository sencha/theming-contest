/**
 * @class FeedViewer.view.main.FeedList
 * @extends Ext.dataview.List
 *
 * A data view that shows default rss feeds and allows you to add or view them
 */
Ext.define('FeedViewer.view.main.FeedList', {
    extend: 'Ext.dataview.List',
    xtype: 'feedlist',
    layout: 'fit',
    itemTpl: '{title}',
    defaultItemTpl: '{title}',
    editItemTpl: '<div style="float:left">{title}</div><div style="float:right"><span class="x-fa fa-remove"></span></div>',
    store:{
        type: 'feeds'
    }
});
