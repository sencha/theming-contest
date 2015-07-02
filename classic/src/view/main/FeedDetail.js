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
    layout: 'border',

    tabConfig: {
        cls : 'tab-feed-details'
    },

    bind : {
        title: '{feed.title}'
    },

    defaults : {
        border : false
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

        dockedItems: [
            {
                xtype:'toolbar',
                dock: 'top',
                cls: 'feed-list-toolbar x-docked-noborder-top',
                items: [
                    {
                        iconCls: 'open-all',
                        text: 'Open All',
                        action : 'openAll'
                    },
                    {
                        xtype: 'cycle',
                        text: 'Reading Pane',
                        reference : 'regionCycler',
                        action : 'cyclePreview',
                        prependText: 'Preview: ',
                        showText: true,
                        menu: {
                            id: 'reading-menu',
                            items: [{
                                text: 'Bottom',
                                cycleRegion : 'south',
                                iconCls:'preview-bottom'
                            }, {
                                text: 'Right',

                                cycleRegion : 'east',
                                iconCls:'preview-right'
                            }, {
                                text: 'Hidden',
                                cycleRegion : 'hidden',
                                checked: true,
                                iconCls:'preview-hide'
                            }]
                        }
                    },
                    {
                        iconCls: 'summary',
                        text: 'Summary',
                        enableToggle: true,
                        pressed: true,
                        toggleHandler: 'onSummaryToggle'
                    }
                ]
            }
        ]

    },
    {
        xtype: 'feedpost',
        reference: 'feedpost',

        split : true,
        responsiveConfig: {
             'tall': {
                 region : 'south',
                 height: '50%',
                 width : null,
                 minHeight: 200
             },
             'wide': {
                 region : 'east',
                 width: '50%',
                 height : null,
                 minHeight: null,
                 minWidth: 200
             }
        }
    }]

});