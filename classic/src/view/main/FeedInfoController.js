/**
 * @class FeedViewer.view.main.FeedInfoController
 */
Ext.define('FeedViewer.view.main.FeedInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedinfo',

    listen: {
        controller: {
            '*': {
                feedselect: 'onFeedSelect',
                rssitemselect : 'onRSSItemSelect',
                feeditemdblclick : 'onGoToPost'
            }
        },
        component: {
            'feeddetail feedpost button[action=openInTab]': {
                click: 'onPostInTab'
            },
            'feedinfo feedpost button[action=openPost]': {
                click: 'onGoToPost'
            },
            'feeddetail button[action=openAll]': {
                click: 'onOpenAll'
            }
        }
    },

    /**
     * Reacts to a feed being selected
     * @private
     */
    onFeedSelect: function(controller, feed, title, url){
       this.addFeed(feed, title, url);
    },

    /**
     * Loads a selected feed
     * @param {FeedViewer.model.RSSFeed} feed Feed model instance
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    addFeed: function(feed, title, url){
        var me = this,
            view = me.getView(),
            active = view.child('feeddetail'),
            grid;

        if (!active) {
            active = view.add({
                xtype :'feeddetail',
                closable: false,
                listeners: {
                    scope: 'controller',
                    opentab: 'onTabOpen',
                    openall: 'onOpenAll',
                    rowdblclick: 'onRowDblClick'
                }
            });

        }

        grid = view.down('feedgrid');
        view.setActiveTab(active);

        feed.load(
            {
                url : url,
                limit : 10,
                scope : active,
                callback: function(records, operation, success) {
                    if (success){

                        var vm = this.getViewModel(),
                            view;

                        vm.set('feed', feed);
                        vm.notify(); // notify Feed model binders

                        if (grid) {
                            view = grid.getView();
                            view.getScrollable().scrollTo(0, 0);

                            if (grid.getStore().getCount()) {
                                view.getSelectionModel().select(0);
                            }
                        }
                    }
                    grid = null;
                }
            }
        );
    },


    /**
    * This method inserts rss news items into the TabPanel (if not already present)
    * and sets the active tab to the first item processed or duplicated
    * @private
    * @param {FeedViewer.model.RSSItem|Array} rssItems One or more rssItems
    */
    postToTab: function( rssItems ) {
        var items = [],
            parent = this.getView(),
            duplicate;

        if (!parent) return;

        Ext.each(
           Ext.Array.from(rssItems),
           function (rssItem) {
               var title = rssItem.get('title'),
                   link = rssItem.get('link'),
                   item = this.child('feedpost[link="' + link + '"]');

               if (!item) {
                   items.push({
                       inTab: true,
                       xtype: 'feedpost',
                       title: title,
                       link : link,
                       closable: true,
                       rssItem: rssItem
                   });
               } else {
                   duplicate = duplicate || item;
               }
            },
            parent
        );

        Ext.suspendLayouts();
        if (items.length) {
            items = parent.insert(1, items);
        }
        parent.setActiveTab(items[0] || duplicate);
        Ext.resumeLayouts(true);

    },

    /**
     * Opens all unique RSS Feed items available in the grid into tabs
     * @param {Ext.button.Button} button
     */
    onOpenAll : function(button) {
        this.postToTab(
            this.getView().down('feedgrid').getStore().getRange()
        );
    },


    /**
     * Loads the currently selected RSS Feed Item into a unique tab
     * @param button
     */
    onPostInTab : function(button) {

        var view =  this.getView(),
            post =  view.down('feedpost:not([inTab])'),
            feedItem = post && post.getRssItem();

        if (feedItem) {
            this.postToTab(feedItem);
        }
    },

    /**
     * Launches a new browser tab to display the reference RSS Feed Item
     * @param {Ext.Component} component
     * @param (FeedViewer.model.RSSItem} rssItem
     */
    onGoToPost : function(component, rssItem) {
        rssItem = rssItem && rssItem.isRssItem ? rssItem : component.up('feedpost').getRssItem();
        var link =  rssItem && rssItem.get('link');

        if (link) {
            window.open(link);
        }
    },

    /**
     * Handles bubbled Controller-generated requests to load the content for an RSS Feed Item
     * @param {Ext.app.BaseController} controller
     * @param (FeedViewer.model.RSSItem} rssItem
     */
    onRSSItemSelect : function (controller, rssItem) {
        this.getView().down('feedpost:not([inTab])').setRssItem(rssItem);
    }

});
