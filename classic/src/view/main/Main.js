/**
 * @class FeedViewer.view.main.FeedViewer
 * @extends Ext.container.Viewport
 *
 * The main FeedViewer application
 *
 * @constructor
 * Create a new Feed Viewer app
 * @param {Object} config The config object
 */

Ext.define('FeedViewer.view.main.Main', {
    extend: 'Ext.container.Viewport',


    controller: 'main',

    initComponent: function(){
        Ext.apply(this, {
            layout: {
                type: 'border',
                padding: 5
            },
            items: [
                this.getController().createFeedPanel(),
                this.getController().createFeedInfo()
            ]
        });
        this.callParent(arguments);
    }


});
