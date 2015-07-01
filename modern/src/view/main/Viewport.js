/**
 * @class FeedViewer.view.main.Viewport
 */
Ext.define('FeedViewer.view.main.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'app-main',
    useTitleForBackButtonText: true,
    items: [{
        xtype:'feedlist',
        layout: 'fit',
        title: 'Feeds'
    }]

});
