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
        dockedItems: [{
            xtype:'toolbar',
            dock: 'top',
            cls: 'x-docked-noborder-top',
            items: [{
                iconCls: 'open-all',
                text: 'Open All',
                scope:  'controller',
                handler: 'onOpenAllClick'
            }, '-', {
                xtype: 'cycle',
                text: 'Reading Pane',
                prependText: 'Preview: ',
                showText: true,
                scope: 'controller',
                changeHandler: 'readingPaneChange',
                menu: {
                    id: 'reading-menu',
                    items: [{
                        text: 'Bottom',
                        checked: true,
                        iconCls:'preview-bottom'
                    }, {
                        text: 'Right',
                        iconCls:'preview-right'
                    }, {
                        text: 'Hide',
                        iconCls:'preview-hide'
                    }]
                }
            }, {
                iconCls: 'summary',
                text: 'Summary',
                enableToggle: true,
                pressed: true,
                scope:  'controller',
                toggleHandler: 'onSummaryToggle'
            }]

        }],
        flex: 2,
        minHeight: 200,
        minWidth: 150,
        listeners: {
            scope: 'controller',
            afterrender: 'onAfterRender',
            select: 'onSelect'
        }
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