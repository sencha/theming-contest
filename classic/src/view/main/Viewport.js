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
    extend: 'Ext.container.Viewport',

    controller: 'main',

    layout: {
        type: 'border',
        padding: 5
    },

    items : [
        {
            xtype : 'feedlist',
            region: 'west',
            collapsible: true,
            reference: 'feedList',
            width: 225,
            split: true,
            minWidth: 175,
            feeds: [{
                title: 'Sencha Blog',
                url: 'http://feeds.feedburner.com/sencha'
            }, {
                title: 'Sencha Forums',
                url: 'http://sencha.com/forum/external.php?type=RSS2'
            }, {
                title: 'Ajaxian',
                url: 'http://feeds.feedburner.com/ajaxian'
            }],

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
