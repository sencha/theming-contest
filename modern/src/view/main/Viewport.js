/**
 * @class FeedViewer.view.main.Viewport
 */
Ext.define('FeedViewer.view.main.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'app-main',
    controller: 'viewport',
    reference: 'viewport',
    fullScreen : true,
    useTitleForBackButtonText: true,
    //defaultBackButtonText: 'Feeds',

    navigationBar: {
        ui: 'dark',
        docked: 'top'
    },
    items: [
        {
           xtype:'panel',
           layout: 'fit',
           title: 'Feeds',
           items:[
               {
                   xtype: 'feedlist',
                   reference: 'feedlist',
                   listeners: {
                       select:'onFeedListSelect'
                   }
               },
                {
                    xtype : 'toolbar',
                    docked: 'bottom',
                    items:[
                        {
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
                        }]
                }
           ]
        }
    ]
});
