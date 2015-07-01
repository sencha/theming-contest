/**
 * @class FeedViewer.view.main.FeedList
 * @extends Ext.dataview.List
 *
 * A data view that shows default rss feeds and allows you to add or view them
 */
Ext.define('FeedViewer.view.main.FeedList', {
    extend: 'Ext.Panel',
    xtype: 'feedlist',
    layout: 'fit',
    controller: 'feedlist',
    items:[{
        xtype: 'list',
        reference: 'feedlist',
        itemTpl: '{title}',
        store:{
          type: 'feeds'
        },
        listeners: {
            select:'onFeedListSelect'
        }
    },{
        xtype : 'toolbar',
        docked: 'bottom',
        items:[{
            xtype: 'button',
            text: 'New',
            reference: 'newfeedbutton',
            handler: 'onNewFeedClick'
        }]
    }]
});
