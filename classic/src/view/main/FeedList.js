/**
 * @class FeedViewer.view.main.Feedlist
 * @extends Ext.panel.Panel
 *
 * Shows a list of available feeds. Also has the ability to add/remove and load feeds.
 *
 * @constructor
 * Create a new Feed List
 * @param {Object} config The config object
 */

Ext.define('FeedViewer.view.main.FeedList', {
    extend: 'Ext.panel.Panel',

    xtype: 'feedlist',

    requires : [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    controller: 'feedlist',

    layout: 'fit',

    items : [
        {
            xtype : 'dataview',
            scrollable: true,
            reference : 'feedList',
            selModel: {
                mode: 'SINGLE',
                listeners: {
                    select: 'onFeedSelection'
                }
            },
            listeners: {
                viewready: 'onViewReady'
            },
            store: {
                type: 'feeds',
                autoLoad: true
            },
            trackOver: true,
            cls: 'feed-list',
            itemSelector: '.feed-list-item',
            overItemCls: 'feed-list-item-hover',
            tpl: '<tpl for="."><div class="feed-list-item">{title}</div></tpl>'
        }
    ],

    dockedItems : [
        {
            xtype : 'toolbar',
            dock  : 'top',
            reference : 'feedsBar',
            items : [
                {
                    handler: 'onAddFeedClick',
                    text: 'Add',
                    reference : 'addFeed',
                    iconCls: 'feed-add'
                },
                {
                    handler: 'onRemoveFeedClick',
                    text: 'Remove',
                    reference : 'removeFeed',
                    iconCls: 'feed-remove'
                }

            ]
        }
    ]

});
