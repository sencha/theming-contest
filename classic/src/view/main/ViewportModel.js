/**
 * @class FeedViewer.view.main.MainModel
 */
Ext.define('FeedViewer.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'FeedViewer.model.RSSFeed'
    ],
    alias: 'viewmodel.main',

    data: {
        name: 'Feed Viewer'
    },

    stores:{
        feeds: {
            model: 'FeedViewer.model.RSSFeed',
            autoLoad: true

        }
    }

});

