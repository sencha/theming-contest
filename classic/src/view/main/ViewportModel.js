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
        name: 'Feed Viewer'
    },

    stores:{
        feeds: {
            model: 'FeedViewer.model.Feed',
            autoLoad: true

        }
    }

});

