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
                    feedselect: 'onFeedSelect',
                    rssitemselect : 'onRSSItemSelect'
                }
            },
            component: {
                'feedpost button[action=openInTab]': {
                    click: 'onPostInTab'
                },
                'feedpost button[action=goToPost]': {
                    click: 'onGoToPost'
                },
                'feedgrid': {
                    itemdblclick: 'onGoToPost'
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
                title: title,
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

        grid = view.down('feedgrid');
        view.setActiveTab(active);

        feed.load(
            {
                url : url,
                limit : 10,
                scope : active,
                callback: function(records, operation, success) {
                    if (success){

                        var vm = this.getViewModel();

                        vm.set('feed', feed);
                        vm.notify(); // notify Feed model binders

                        if (grid) {
                            grid.getView().getScrollable().scrollTo(0, 0);

                            if (grid.getStore().getCount()) {
                                grid.getView().getSelectionModel().select(0);
                            }
                        }
                    }
                    grid = null;
                }
            }
        );
    },

    onPostInTab : function(button) {

        var view =  this.getView(),
            post =  view.down('feedpost:not([inTab])'),
            feedItem = post && post.getRssItem(),
            link =  feedItem && feedItem.get('link');

        if (feedItem) {
            view.setActiveTab(
                view.child('feedpost[inTab][link=' + link + ']') ||
                view.add({
                    inTab: true,
                    xtype: 'feedpost',
                    title: feedItem.get('title'),
                    link: link,
                    closable: true,
                    rssItem: feedItem
                })
            );
        }
    },

    onGoToPost : function(button) {
        var view =  this.getView(),
            post =  button.up('feedpost'),
            feedItem = post && post.getRssItem(),
            link =  feedItem && feedItem.get('link');

        if (link) {
            window.open(link);
        }
    },

    onRSSItemSelect : function (src, item) {
        this.getView().down('feedpost:not([inTab])').setRssItem(item);
    }

});
