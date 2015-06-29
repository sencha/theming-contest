/**
 * @class FeedViewer.view.main.FeedGridController
 */
Ext.define('FeedViewer.view.main.FeedGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedgrid',

    onAfterRender: function(){
        this.loadFeed(this.getView().url);
    },


    /**
     * Fires when a grid row is selected
     * @private
     * @param {FeedViewer.FeedGrid} grid
     * @param {Ext.data.Model} rec
     */
    onSelect: function(grid, rec) {
        if(rec){
            this.getView().up().down('feedpost').setActive(rec);
        }
    },

    /**
     * Reacts to the open all being clicked
     * @private
     */
    onOpenAllClick: function(){
        this.fireEvent('openall', this);
    },

    /**
     * Gets a list of titles/urls for each feed.
     * @return {Array} The feed details
     */
    getFeedData: function(){
        return this.grid.store.getRange();
    },

    /**
     * @private
     * @param {Ext.button.Button} button The button
     * @param {Boolean} pressed Whether the button is pressed
     */
    onSummaryToggle: function(btn, pressed) {
        this.getView().getView().getPlugin('preview').toggleExpanded(pressed);
    },

    /**
     * Handle the checked item being changed
     * @private
     * @param {Ext.menu.CheckItem} item The checked item
     */
    readingPaneChange: function(cycle, activeItem){
        var east = this.getView().up().down('[region=east]'),
            south = this.getView().up().down('[region=south]'),
            display = this.getView().up().down('feedpost');

        switch (activeItem.text) {
            case 'Bottom':
                east.hide();
                south.show();
                south.add(display);
                break;
            case 'Right':
                south.hide();
                east.show();
                east.add(display);
                break;
            default:
                south.hide();
                east.hide();
                break;
        }
    },



    /**
     * Reacts to a double click
     * @private
     * @param {Object} view The view
     * @param {Object} index The row index
     */
    onRowDblClick: function(view, record, item, index, e) {
        this.fireEvent('rowdblclick', this.getView(), this.getView().store.getAt(index));
    },


    /**
     * Listens for the store loading
     * @private
     */
    onLoad: function(store, records, success) {
        if (this.getView().getStore().getCount()) {
            this.getView().getSelectionModel().select(0);
        }
    },

    /**
     * Listen for proxy errors.
     */
    onProxyException: function(proxy, response, operation) {
        Ext.Msg.alert("Error with data from server", operation.error);
        this.view.el.update('');

        // Update the detail view with a dummy empty record
        this.fireEvent('select', this, {data:{}});
    },

    /**
     * Instructs the grid to load a new feed
     * @param {String} url The url to load
     */
    loadFeed: function(url){
        var me = this,
            view = me.getView(),
            // refs = me.getReferences(),
            feed = Ext.create('FeedViewer.model.RSSFeed');

        if(url){
            feed.load({
                url : url,
                callback: function(records, operation, success) {
                    if(success){
                        view.setStore(feed.entries());
                    }
                }}
            );
        }
    },

    /**
     * Title renderer
     * @private
     */
    formatTitle: function(value, p, record){
        return Ext.String.format('<div class="topic"><b>{0}</b><span class="author">{1}</span></div>', value, record.get('author') || "Unknown");
    },

    /**
     * Date renderer
     * @private
     */
    formatDate: function(date){
        if (!date) {
            return '';
        }

        var now = new Date(), d = Ext.Date.clearTime(now, true), notime = Ext.Date.clearTime(date, true).getTime();

        if (notime === d.getTime()) {
            return 'Today ' + Ext.Date.format(date, 'g:i a');
        }

        d = Ext.Date.add(d, 'd', -6);
        if (d.getTime() <= notime) {
            return Ext.Date.format(date, 'D g:i a');
        }
        return Ext.Date.format(date, 'Y/m/d g:i a');
    }
});