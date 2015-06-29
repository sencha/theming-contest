/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('FeedViewer.view.main.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'app-main',


    defaults: {
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom',

    items: [
        {
            xtype : 'toolbar',
            docked: 'top',
            title: 'Feeds',
            items:[{
                xtype: 'button',
                text: 'New',
                handler: function(){
                    this.up('navigationview').push({
                        title: 'Second',
                        html: 'Second view!'
                    })
                }
            },
            {xtype: 'spacer'},
            {
                xtype: 'button',
                text: 'Remove'

            }]
        },
        {
            iconCls: 'fa-home',
            xtype: 'feedlist'
        }
    ]
});
