/**
 * @class FeedViewer.view.main.FeedInfoController
 */
Ext.define('FeedViewer.view.main.FeedInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedinfo',

    init: function() {
        this.listen({
            controller: {
                '*': {
                    feedselect: 'onFeedSelect'
                }
            }
        });
    },

    /**
     * Reacts to a feed being selected
     * @private
     */
    onFeedSelect: function(controller, feed, title, url){
       this.addFeed(feed, title, url);
    },

    /**
     * Add a new feed
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    addFeed: function(feed, title, url){
        var active = this.getView().items.first();

        if (!active) {

            active = this.getView().add({
                xtype: 'feeddetail',
                closable: false,
                listeners: {
                    scope: 'controller',
                    opentab: 'onTabOpen',
                    openall: 'onOpenAll',
                    rowdblclick: 'onRowDblClick'
                }
            });

        } else {
            active.tab.setText(title);
        }

        this.getView().setActiveTab(active);

        feed.load({
            url : url,
            limit : 50,
            callback: function(records, operation, success) {
                if(success){
                    var grid = active.down('grid');
                    grid.bindStore(feed.entries());
                    grid.store.load(function(){
                        if (grid.getStore().getCount()) {
                            grid.getView().getSelectionModel().select(0);
                        }
                    });
                }
            }}
        );

    },


    /**
     * Listens for a new tab request
     * @private
     * @param {FeedViewer.FeedPost} post The post
     * @param {Ext.data.Model} rec The model instance
     */
    onTabOpen: function(post, rec) {
        var items = [],
            item,
            title;

        if (Ext.isArray(rec)) {
            Ext.each(rec, function(rec) {
                title = rec.get('title');
                if (!this.getTabByTitle(title)) {
                    items.push({
                        inTab: true,
                        xtype: 'feedpost',
                        title: title,
                        closable: true,
                        data: rec.data,
                        active: rec
                    });
                }
            }, this);
            this.add(items);
        }
        else if (rec) {
            title = rec.get('title');
            item = this.getTabByTitle(title);
            if (!item) {
                item = this.add({
                    inTab: true,
                    xtype: 'feedpost',
                    title: title,
                    closable: true,
                    data: rec.data,
                    active: rec
                });
            }
            this.setActiveTab(item);
        }
    },

    /**
     * Find a tab by title
     * @param {String} title The title of the tab
     * @return {Ext.Component} The panel matching the title. null if not found.
     */
    getTabByTitle: function(title) {
        var index = this.items.findIndex('title', title);
        return (index < 0) ? null : this.items.getAt(index);
    },

    /**
     * Listens for a row dblclick
     * @private
     * @param {FeedViewer.Detail} info The detail
     * @param {Ext.data.Model} rec The model instance
     */
    onRowDblClick: function(info, rec){
        this.onTabOpen(null, rec);
    },

    /**
     * Listens for the open all click
     * @private
     * @param {FeedViewer.FeedDetail} detail
     */
    onOpenAll: function(detail) {
        this.onTabOpen(null, detail.getFeedData());
    }


});
