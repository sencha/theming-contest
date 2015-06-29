/**
 * @class FeedViewer.view.main.MainModel
 */
Ext.define('FeedViewer.view.main.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',

    stores:{
        feeds:'feeds'
    }

});

