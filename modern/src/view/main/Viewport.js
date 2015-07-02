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
            hidden: true,
            handler: 'onHamburgerToggle'
        },{
            xtype: 'button',
            align:'right',
            iconCls: 'x-fa fa-plus-square',
            reference: 'newbutton',
            action:'new',
            handler: 'onNewFeed'
        },{
            xtype: 'button',
            iconCls: 'x-fa fa-pencil',
            reference: 'editbutton',
            ui: 'plain',
            handler: 'onEditFeeds'
        }]
    },
    items: [{
        xtype:'feedlist',
        layout: 'fit',
        reference:'feedlist',
        title: 'Feeds'
    }]

});
