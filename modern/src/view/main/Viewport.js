/**
 * @class FeedViewer.view.main.Viewport
 */
Ext.define('FeedViewer.view.main.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'app-main',
    items: [{
        xtype:'feedlist',
        layout: 'fit',
        title: 'Feeds'
    }]
    /*,
    useTitleForBackButtonText: true,
    defaultBackButtonText: 'Feeds',
    initialize: function(){
        this.callParent(arguments);

        this.push({
            xtype:'feedlist',
            layout: 'fit',
            title: 'Feeds'
        });

    }*/
});
