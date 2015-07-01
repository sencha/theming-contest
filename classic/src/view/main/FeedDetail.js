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
    xtype: 'feeddetail',

    requires : [
        'Ext.button.Cycle'
    ],

    viewModel : {
        links: {
            feed: {
                type: 'FeedViewer.model.RSSFeed',
                create : true
            }
        }
    },

    controller : 'feeddetail',
    reference : 'feedDetail',
    referenceHolder : true,

    layout: 'border',

    bind : {
        title: '{feed.title}'
    },

    items:[{
        xtype: 'feedgrid',
        region: 'center',
        reference: 'feedItems',
        bind : {
            store : '{feed.entries}'
        },
        minHeight: 200,
        minWidth: 200,
        split : true,

        dockedItems: [{
            xtype:'toolbar',
            dock: 'top',
            cls: 'x-docked-noborder-top',
            border : true,
            items: [{
                iconCls: 'open-all',
                text: 'Open All',
                action : 'openAll'
            }, '-', {
                xtype: 'cycle',
                text: 'Reading Pane',
                action : 'cyclePreview',
                prependText: 'Preview: ',
                showText: true,
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
                        text: 'Hidden',
                        iconCls:'preview-hide'
                    }]
                }
            }, {
                iconCls: 'summary',
                text: 'Summary',
                enableToggle: true,
                pressed: true,
                toggleHandler: 'onSummaryToggle'
            }]

        }]

    },
    {
        xtype: 'feedpost',
        reference: 'feedpost',
        region : 'south',
        split : true,
        height: '50%',
        minHeight: 200

    }]


});