/**
 * @class FeedViewer.view.main.ViewportController
 */
Ext.define('FeedViewer.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',

    listen: {
        component: {
            'app-main': {
                show:'onFeedShow'
            },
            'feedlist': {
                select: 'onFeedSelect'
            },
            'feeditems': {
                select: 'onFeedItemSelect'
            },
            'feedform button[action=save]': {
                tap: 'onSaveClick'
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

        record.load({
                url : record.get('feedUrl'),
                limit : 50,
                callback: function(records, operation, success) {
                    var list, vm;
                    if(success){
                        list = viewport.push({
                            xtype: 'feeditems',
                            title: record.get('title')
                        });

                        vm = list.getViewModel();
                        vm.set('feed',record);
                        vm.notify(); // notify Feed model binders

                    }
                }}
        );
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
    onSaveClick: function () {
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

    onFeedShow: function(){
        Ext.Viewport.setMenu(this.createHamburgerMenu(),{
            side: 'left',
            reveal: true
        });
    },

    /**
     * React to hambuger menu tap. Toggles the hamburgermenu
     * @private
     */
    onHamburgerToggle: function(){
        if(Ext.Viewport.getMenus().left.isHidden()){
            Ext.Viewport.showMenu('left');
        }else{
            Ext.Viewport.hideMenu('left');
        }
    },

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
    },

    /**
     * React to new button to open form.
     * @private
     */
    onNewFeed: function () {
        var navView = this.getView(),
            active = this.getView().getActiveItem();

        if(active && active.xtype != 'feedform'){
            navView.push({
                xtype: 'feedform',
                reference: 'feedform'
            });

        }
        Ext.Viewport.hideMenu('left');
    }

});
