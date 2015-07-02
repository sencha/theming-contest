/**
 * @class FeedViewer.view.main.Viewport
 */
Ext.define('FeedViewer.view.main.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'app-main',
    useTitleForBackButtonText: true,
    controller: 'viewport',
    navigationBar: {
        ui: 'dark',
        docked: 'top',
        items: [{
            xtype: 'button',
            iconCls: 'x-fa fa-navicon',
            ui: 'plain',
            handler: 'onHamburgerToggle'
        }]
    },
    items: [{
        xtype:'feedlist',
        layout: 'fit',
        title: 'Feeds'
    }]

});
