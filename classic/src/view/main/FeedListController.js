/**
 * @class FeedViewer.view.main.FeedPanelController
 */
Ext.define('FeedViewer.view.main.FeedListController',{
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedlist',

    requires: [
        'Ext.fx.Anim',
        'Ext.menu.Menu'
    ],

    onViewReady: function(view){

        var store = Ext.data.StoreManager.lookup('Feeds'),
         first = store && store.first();

         view.setStore(store);
         view.refresh();
         if (first) {
            view.getSelectionModel().select(first);
         }
    },

    /**
     * Create actions to share between toolbar and menu
     * @private
     */
    createActions: function(){
        this.addAction = Ext.create('Ext.Action', {
            scope: this,
            handler: this.onAddFeedClick,
            text: 'Add',
            iconCls: 'feed-add'
        });

        this.removeAction = Ext.create('Ext.Action', {
            itemId: 'remove',
            scope: this,
            handler: this.onRemoveFeedClick,
            text: 'Remove',
            iconCls: 'feed-remove'
        });
    },

    /**
     * Create the context menu
     * @private
     */
    createMenu: function(){
        this.menu = Ext.create('widget.menu', {
            items: [{
                scope: this,
                handler: this.onLoadClick,
                text: 'Load feed',
                iconCls: 'feed-load'
            }, this.removeAction, '-', this.addAction],
            listeners: {
                hide: function(c){
                    c.activeFeed = null;
                }
            }
        });
    },

    /**
     * Used when view selection changes so we can disable toolbar buttons.
     * @private
     */
    onFeedSelection: function(selModel){
        var me = this,
            selected = this.getSelectedItem(),
            view = me.getView(),
            refs = me.getReferences();

        refs.removeFeed.setDisabled(!selected);
        if (selected) {
            this.loadFeed(selected);
        }
    },

    /**
     * React to the load feed menu click.
     * @private
     */
    onLoadClick: function(){
        this.loadFeed(this.menu.activeFeed);
    },

    /**
     * Loads a feed.
     * @private
     * @param {Ext.data.Model} rec The feed
     */
    loadFeed: function(rec){
        if (rec) {
            this.fireEvent('feedselect', this, rec.get('title'), rec.get('url'));
        }
    },

    /**
     * Gets the currently selected record in the view.
     * @private
     * @return {Ext.data.Model} Returns the selected model. false if nothing is selected.
     */
    getSelectedItem: function(){
        return this.lookupReference('feedList').getSelectionModel().getSelection()[0] || false;
    },

    /**
     * Listens for the context menu event on the view
     * @private
     */
    onContextMenu: function(view, index, el, event){
        var menu = this.menu;

        event.stopEvent();
        menu.activeFeed = view.store.getAt(index);
        menu.showAt(event.getXY());
    },

    /**
     * React to a feed being removed
     * @private
     */
    onRemoveFeedClick: function(button) {
        var view = this.getView().down('dataview'),
            active = this.getSelectedItem();

        if (active) {

            view.getSelectionModel().deselectAll();

            this.animateNode(view.getNode(active), 1, 0, {
                scope: this,
                afteranimate: function() {

                    view.getStore().remove(active);

                }
            });
            view.fireEvent('feedremove', view, active.get('title'), active.get('url'));

            // publish event on the 'controller' domain for other subscribers
            this.fireEvent('feedremove', view, active.get('title'), active.get('url'));
        }
    },

    /**
     * React to a feed attempting to be added
     * @private
     */
    onAddFeedClick: function(){
        var win = this.addFeedWindow || (this.addFeedWindow = Ext.create('widget.feedwindow', {
                listeners: {
                    scope: this,
                    feedvalid: this.onFeedValid
                }
            }));
        win.form.getForm().reset();
        win.show();
    },

    /**
     * React to a validation on a feed passing
     * @private
     * @param {FeedViewer.FeedWindow} win
     * @param {String} title The title of the feed
     * @param {String} url The url of the feed
     */
    onFeedValid: function(win, title, url){
        var view = this.getView().down('dataview'),
            store = view.store,
            rec;

        rec = store.add({
            url: url,
            title: title
        })[0];
        this.animateNode(view.getNode(rec), 0, 1);
    },

    /**
     * Animate a node in the view when it is added/removed
     * @private
     * @param {Mixed} el The element to animate
     * @param {Number} start The start opacity
     * @param {Number} end The end opacity
     * @param {Object} listeners (optional) Any listeners
     */
    animateNode: function(el, start, end, listeners){
        Ext.create('Ext.fx.Anim', {
            target: Ext.get(el),
            duration: 500,
            from: {
                opacity: start
            },
            to: {
                opacity: end
            },
            listeners: listeners
        });
    },

    // Inherit docs
    onDestroy: function(){
        this.callParent(arguments);
        Ext.destroy(this.menu, this.addFeedWindow);
    }

});
