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
    title: 'Feeds',

    controller: 'viewport',
    reference: 'viewport',

    items: [{
            xtype: 'feedlist',
            reference: 'feedlist',
            listeners: {
                select:'onFeedListSelect'
            }
        },{
        xtype : 'toolbar',
        docked: 'bottom',
        items:[{
                xtype: 'button',
                text: 'New',
                reference: 'newfeedbutton',
                handler: 'onNewFeedClick'
            },{
                xtype: 'button',
                reference: 'cancelbutton',
                text: 'cancel',
                hidden: true,
                handler: 'onCancelClick'
            },{
                xtype: 'spacer'
            },{
                xtype: 'button',
                reference: 'removebutton',
                text: 'Remove',
                hidden: true,
                handler: 'onRemoveClick'

            },{
                xtype: 'button',
                reference: 'savebutton',
                text: 'save',
                hidden: true,
                handler: 'onSaveClick'
            }
        ]
    }],
    listeners:{
        back: 'onBackClick'
    }
});
