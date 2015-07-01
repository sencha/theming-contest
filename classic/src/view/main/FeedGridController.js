/**
 * @class FeedViewer.view.main.FeedGridController
 */
Ext.define('FeedViewer.view.main.FeedGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedgrid',

    /**
     * @private
     * @param {Ext.button.Button} button The button
     * @param {Boolean} pressed button pressed state
     */
    onSummaryToggle: function(button, pressed) {
        this.getView().getView().getPlugin('preview').toggleExpanded(pressed);
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
     * Title renderer
     * @private
     */
    formatTitle: function(value, p, record) {
        var author;
        return Ext.String.format(
            '<div class="topic"><b>{0}</b><span class="author">{1}</span></div>', value, (author = record.get('author')) ? ' by: ' + author : '');
    },

    /**
     * Date renderer
     * @private
     */
    formatDate: function(date) {
        if (Ext.isDate(date)) {
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
    },

    /**
     * Fires when a grid row is selected
     * @private
     * @param {FeedViewer.view.main.FeedGrid} grid
     * @param {FeedViewer.model.RSSItem} item
     */
    onItemSelect: function(grid, item) {
        if (item) {
            this.fireEvent('rssitemselect', grid, item);
        }
    }
});