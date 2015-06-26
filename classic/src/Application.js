/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('FeedViewer.Application', {
    extend: 'Ext.app.Application',
    
    name: 'FeedViewer',

    requires: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.Action',
        'Ext.tab.*',
        'Ext.button.*',
        'Ext.form.*',
        'Ext.layout.container.Card',
        'Ext.layout.container.Border',

        'Ext.ux.ajax.SimManager',
        'Ext.ux.PreviewPlugin',

        'FeedViewer.*'

    ],

    stores: [
        // TODO: add global / shared stores here
    ],
    
    launch: function () {
        // TODO - Launch the application
        if (hasOption('simjax')) {
            initAjaxSim();
        }

    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
