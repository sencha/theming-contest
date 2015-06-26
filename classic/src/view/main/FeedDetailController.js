/**
 * @class FeedViewer.view.main.FeedDetailController
 */
Ext.define('FeedViewer.view.main.FeedDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feeddetail',

    /*initComponent: function(){
     this.display = Ext.create('widget.feedpost', {});
     Ext.apply(this, {
     layout: 'border',
     items: [this.createGrid(), this.createSouth(), this.createEast()]
     });
     this.relayEvents(this.display, ['opentab']);
     this.relayEvents(this.grid, ['rowdblclick']);
     this.callParent(arguments);
     },*/

    /**
     * Loads a feed.
     * @param {String} url
     */
    loadFeed: function(url){
        this.grid.loadFeed(url);
    },

    /**
     * Creates the feed grid
     * @private
     * @return {FeedViewer.FeedGrid} feedGrid
     */
    createGrid: function(){
        this.grid = Ext.create('widget.feedgrid', {
            region: 'center',
            dockedItems: [this.createTopToolbar()],
            flex: 2,
            minHeight: 200,
            minWidth: 150,
            listeners: {
                scope: this,
                select: this.onSelect
            }
        });
        this.loadFeed(this.url);
        return this.grid;
    },

    /**
     * Fires when a grid row is selected
     * @private
     * @param {FeedViewer.FeedGrid} grid
     * @param {Ext.data.Model} rec
     */
    onSelect: function(grid, rec) {
        if(rec){
            this.display.setActive(rec);
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
        this.grid.getView().getPlugin('preview').toggleExpanded(pressed);
    },

    /**
     * Handle the checked item being changed
     * @private
     * @param {Ext.menu.CheckItem} item The checked item
     */
    readingPaneChange: function(cycle, activeItem){
        switch (activeItem.text) {
            case 'Bottom':
                this.east.hide();
                this.south.show();
                this.south.add(this.display);
                break;
            case 'Right':
                this.south.hide();
                this.east.show();
                this.east.add(this.display);
                break;
            default:
                this.south.hide();
                this.east.hide();
                break;
        }
    }


});