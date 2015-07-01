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

    requires : [
        'Ext.layout.container.Border'
    ],

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
            split: true
        },
        {
            xtype : 'feedinfo',
            reference: 'feedContent',
            region: 'center'
        }
    ]

});
