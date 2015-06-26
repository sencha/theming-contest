/**
 * @class FeedViewer.view.main.Viewport
 * @extends Ext.container.Viewport
 *
 * The main FeedViewer application
 *
 * @constructor
 * Create a new Feed Viewer app
 * @param {Object} config The config object
 */

Ext.define('FeedViewer.view.main.Viewport', {
    extend: 'Ext.container.Container',

    controller: 'main',

    layout: {
        type: 'border',
        padding: 5
    },

    items : [
        {
            xtype : 'feedlist',
            title: 'Feeds',
            region: 'west',
            reference: 'feedList',
            collapsible: true,
            animCollapse: true,
            width: 225,
            minWidth: 175,
            split: true,

            listeners: {
                feedselect: 'onFeedSelect'
            }
        },
        {
            xtype : 'feedinfo',
            reference: 'feedContent',
            region: 'center'
        }
    ]

});
