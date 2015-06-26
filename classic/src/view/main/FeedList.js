/**
 * @class FeedViewer.Feedlist
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

    requires: [
        'FeedViewer.view.main.FeedListController',
        'FeedViewer.store.Feeds'
    ],

    layout: 'fit',
    controller: 'feedlist',

    /**
     * @event feedremove Fired when a feed is removed
     * @param {FeedList} this
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */

    /**
     * @event feedselect Fired when a feed is selected
     * @param {FeedList} this
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */

    items : [
        {
            xtype : 'dataview',
            scrollable: true,

            selModel: {
                mode: 'SINGLE',
                listeners: {
                    selectionchange: 'onFeedSelection',
                    scope : 'controller'
                }
            },
            listeners: {
                contextmenu: 'onContextMenu',
                viewready: 'onViewReady'
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
            reference : '',
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
