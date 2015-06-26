/**
 * @class FeedViewer.view.main.MainController
 */
Ext.define('FeedViewer.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    /**
     * Create the list of fields to be shown on the left
     * @private
     * @return {FeedViewer.FeedPanel} feedPanel
     */
    createFeedPanel: function(){
        this.feedPanel = Ext.create('widget.feedpanel', {
            region: 'west',
            collapsible: true,
            width: 225,
            //floatable: false,
            split: true,
            minWidth: 175,
            feeds: [{
                title: 'Sencha Blog',
                url: 'http://feeds.feedburner.com/sencha'
            }, {
                title: 'Sencha Forums',
                url: 'http://sencha.com/forum/external.php?type=RSS2'
            }, {
                title: 'Ajaxian',
                url: 'http://feeds.feedburner.com/ajaxian'
            }],
            listeners: {
                scope: this,
                feedselect: this.onFeedSelect
            }
        });
        return this.feedPanel;
    },

    /**
     * Create the feed info container
     * @private
     * @return {FeedViewer.FeedInfo} feedInfo
     */
    createFeedInfo: function(){
        this.feedInfo = Ext.create('widget.feedinfo', {
            region: 'center',
            minWidth: 300
        });
        return this.feedInfo;
    },

    /**
     * Reacts to a feed being selected
     * @private
     */
    onFeedSelect: function(feed, title, url){
        this.feedInfo.addFeed(title, url);
    }

});
