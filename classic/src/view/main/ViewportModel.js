/**
 * @class FeedViewer.view.main.MainModel
 */
Ext.define('FeedViewer.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'FeedViewer.model.Feed'
    ],
    alias: 'viewmodel.main',

    data: {
        name: 'Feed Viewer',
        feed: null,
        feeditem: null
    },

    stores:{
        feeds: {
            model: 'FeedViewer.model.Feed',
            autoLoad: true

        },
        feedItems: {
            model: 'FeedViewer.model.FeedItem',
            autoLoad: true
        }
    }

});

