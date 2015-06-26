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

    requires: ['FeedViewer.view.main.FeedListController'],

    animCollapse: true,
    layout: 'fit',
    title: 'Feeds',

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
            store: Ext.create('Ext.data.Store', {
                model: 'FeedViewer.model.Feed',
                data: this.feeds
            }),
            selModel: {
                mode: 'SINGLE',
                listeners: {
                    selectionchange: 'onFeedSelection'
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
                    iconCls: 'feed-add'
                },
                {
                    handler: 'onRemoveFeedClick',
                    text: 'Remove',
                    iconCls: 'feed-remove'
                }

            ]
        }
    ]

});
