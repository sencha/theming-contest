/**
 * @class FeedViewer.view.main.FeedDetail
 * @extends Ext.panel.Panel
 *
 * Shows the details of a particular feed
 *
 * @constructor
 * Create a new Feed Detail
 * @param {Object} config The config object
 */
Ext.define('FeedViewer.view.main.FeedDetail', {

    extend: 'Ext.panel.Panel',
    alias: 'widget.feeddetail',

    requires: ['FeedViewer.view.main.FeedDetailController'],

    border: false,

    layout: 'border',

    controller: 'feeddetail',

    items:[{
        xtype: 'feedgrid',
        region: 'center',
        flex: 2,
        minHeight: 200,
        minWidth: 150

    },{
        xtype: 'panel',
        layout: 'fit',
        region: 'south',
        border: false,
        split: true,
        flex: 2,
        minHeight: 150,
        items: {
            xtype: 'feedpost'
        }
    },{
        xtype: 'panel',
        layout: 'fit',
        region: 'east',
        flex: 1,
        split: true,
        hidden: true,
        minWidth: 150,
        border: false
    }]
});