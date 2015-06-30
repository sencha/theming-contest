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

    items: [
        {
            xtype : 'toolbar',
            docked: 'top',
            items:[{
                xtype: 'button',
                text: 'New',
                handler: function(){
                    this.up('navigationview').push({
                        xtype: 'feedform'
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
            xtype: 'feedlist'
        }
    ]
});
