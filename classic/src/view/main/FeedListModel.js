/**
 * @class FeedViewer.view.main.FeedListViewModel
 */
Ext.define('FeedViewer.view.main.FeedListViewModel', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'FeedViewer.model.Feed'
    ],
    alias: 'viewmodel.feedlist',

    stores:{
        feeds: {
            model: 'FeedViewer.model.Feed'
        }
    }

});
