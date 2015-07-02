/**
 * @class FeedViewer.view.main.ViewportController
 */
Ext.define('FeedViewer.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',

    listen: {
        component: {
            'app-main': {
                show:'onViewportShow',
                activeitemchange: 'onActiveChange'

            },
            'feedlist': {
                select: 'onFeedSelect'
            },
            'feeditems': {
                select: 'onFeedItemSelect'
            },
            'feedform button[action=save]': {
                tap: 'onSaveFeed'
            }
        }
    },

    /**
     * React to selection of a feed, load the items.
     * @private
     */
    onFeedSelect: function (view, record) {
        var me = this,
            viewport = me.getView();

        if(view.isEditing){
            this.removeFeed(record);
        }else {
            record.load({
                    url: record.get('feedUrl'),
                    limit: 50,
                    callback: function (records, operation, success) {
                        var list, vm;
                        if (success) {
                            list = viewport.push({
                                xtype: 'feeditems',
                                reference: 'feeditems',
                                title: record.get('title')
                            });

                            vm = list.getViewModel();
                            vm.set('feed', record);
                            vm.notify(); // notify Feed model binders

                        }
                    }
                }
            );
        }
    },

    /**
     * React to selection of an item, load the post.
     * @private
     */
    onFeedItemSelect : function (view, record) {
        var me = this,
            refs = this.getReferences(),
            vm,
            viewport = me.getView();

        viewport.push({
            xtype: 'feedpost',
            title: record.get('title')
        });

        vm = viewport.down('feedpost').getViewModel();
        vm.set('feed', record.data);

    },

    /**
     * React to the new form save button being clicked.
     * @private
     */
    onSaveFeed: function () {
        var form = this.getView().down('feedform').getValues(),
            feed = Ext.create('FeedViewer.model.RSSFeed');

        if(form && form.feedUrl){
            feed.load({
                url : form.feedUrl,
                callback: 'validateFeed',
                scope: this
            });
        }
    },

    /**
     * validates a feed from save click callback, adds the feed and returns to list
     * @private
     */
    validateFeed: function(feed, operation, success) {
        var me = this,
            view = this.getView();

        if (success) {
            view.down('feedlist').getStore().add(feed);
            me.getView().pop();
        } else {
            me.lookupReference('feedUrl').markInvalid('The URL specified is not a valid RSS2 feed.');
        }
    },

    /**
     * React to the viewport active item change. Used to manage navigation menu items
     * @private
     */
    onActiveChange: function (view, value, old) {
        var refs = this.getReferences(),
            active = this.getView().getActiveItem();

        Ext.Viewport.hideMenu('left');

        if(value && value.xtype != 'feedlist'){
            refs.newbutton.hide();
            refs.editbutton.hide();
        }else{
            refs.newbutton.show();
            refs.editbutton.show();
            if(value.getSelectionCount()){
                value.deselectAll();
            }
        }

        if(value && value.xtype != 'feeditems'){
        }else{
            if(value.getSelectionCount()){
                value.deselectAll();
            }
        }

    },

    /**
     * React to new button to open form.
     * @private
     */
    onNewFeed: function () {
        var navView = this.getView(),
            refs = this.getReferences(),
            active = this.getView().getActiveItem();

        if(active && active.xtype != 'feedform'){
            navView.push({
                xtype: 'feedform',
                reference: 'feedform'
            });
            refs.newbutton.hide();
        }
    },

    /**
     * React to edit feed list
     * @private
     */
    onEditFeeds: function () {
        var feeds = this.getView().getActiveItem(),
            refs = this.getReferences();

        if(feeds.isEditing){
            feeds.setItemTpl(feeds.defaultItemTpl);
            feeds.isEditing = false;
            refs.newbutton.show();
        }else{
            feeds.setItemTpl(feeds.editItemTpl);
            feeds.isEditing = true;
            refs.newbutton.hide();
        }

    },

    /**
     * React to remove button
     * @private
     */
    removeFeed: function (feed) {
        var store = this.lookupReference('feedlist').getStore();
        store.remove(feed);
    },


    /**
     * React to viewport being shown. Creates a left side menu
     * @private
     */
    onViewportShow: function(){
        Ext.Viewport.setMenu(this.createHamburgerMenu(),{
            side: 'left',
            reveal: true
        });
    },


    /**
     * React to hamburger menu toggle press
     * @private
     */
    onHamburgerToggle: function(){
        if(Ext.Viewport.getMenus().left.isHidden()){
            Ext.Viewport.showMenu('left');
        }else{
            Ext.Viewport.hideMenu('left');
        }
    },

    /**
     * React to the viewport being ready to add side menus.
     * @private
     */
    createHamburgerMenu: function(){
        var menu = Ext.create('Ext.Menu', {
            width: 150,
            scrollable: 'vertical',
            controller: 'viewport',
            reference: 'hamburgermenu',
            items: [{
                xtype : 'toolbar',
                docked: 'top',
                items:[{
                    xtype: 'button',
                    align:'right',
                    iconCls: 'x-fa fa-plus-square',
                    text: 'New',
                    action:'new',
                    handler: 'onNewFeed',
                    scope: this
                }]
            }]
        });
        return menu;
    }

});
