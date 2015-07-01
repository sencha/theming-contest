/**
 * @class FeedViewer.view.main.ViewportController
 */
Ext.define('FeedViewer.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',

    init: function() {
        this.listen({
            component: {
                'button': {
                    click: 'onNewFeedClick'
                },
                'feeditemlist button[action=remove]': {
                   // click: 'onRemoveClick'
                },
                'feedform button[action=save]': {
                   // click: 'onSaveClick'
                }
            }
        });
    },

    onNewFeedClick: function () {
        this.getView().push({
            xtype: 'feedform',
            reference: 'feedform'
        });
    }

});
