/**
 * @class FeedViewer.view.main.ViewportController
 */
Ext.define('FeedViewer.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    /**
     * Reacts to a feed being selected
     * @private
     */
    onFeedSelect: function(feed, title, url){
        //this.feedInfo.addFeed(title, url);
    }

});
