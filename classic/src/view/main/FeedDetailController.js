/**
 * @class FeedViewer.view.main.FeedGridController
 */
Ext.define('FeedViewer.view.main.FeedDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feeddetail',


    /**
     * Gets a list of titles/urls for each feed.
     * @return {Array} The feed details
     */
    getFeedData: function() {
        return this.grid.getStore().getRange();
    },

    /**
     * @private
     * @param {Ext.button.Button} button The button
     * @param {Boolean} pressed Whether the button is pressed
     */
    onSummaryToggle: function(button, pressed) {
        this.lookupReference('feedItems').getView().getPlugin('preview').toggleExpanded(pressed);
    },

    /**
     * Handle the checked item being changed
     * @private
     * @param {Ext.button.Button} cycle The checked item
     * @param {Ext.menu.CheckItem} activeItem The checked item
     */
    readingPaneChange: function(cycle, activeItem){
        var parent = this.getView(),
            display = parent.down('feedpost'),
            metrics,
            region;

        switch (activeItem.text) {
            case 'Bottom':
                metrics = {
                     minHeight : 250,
                     minWidth : null,
                     height : '50%',
                     width : null
                };
                region = 'south';
                break;

            case 'Right':
                region = 'east';
                metrics = {
                    minHeight : null,
                    minWidth : 250,
                    height : null,
                    width : '30%'
                };
                break;
            default:
                display.hide();
                break;
        }
        if (region) {
            if (metrics) {
                Ext.apply( display, metrics );
            }
            display.isVisible() || display.show();
            display.setRegion(region);
        }

    },

    /**
     * Title renderer
     * @private
     */
    formatTitle: function(value, p, record) {
        var author;
        return Ext.String.format(
            '<div class="topic"><b>{0}</b><span class="author">{1}</span></div>',
            value,
            (author = record.get('author')) ? ' by: ' + author : ''
        );
    },

    /**
     * Date renderer
     * @private
     */
    formatDate: function(date) {
        if (Ext.isDate(date)) {
            return '';
        }

        var now = new Date(),
            d = Ext.Date.clearTime(now, true),
            notime = Ext.Date.clearTime(date, true).getTime();

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
    * Listens for a new tab request
    * @private
    * @param {FeedViewer.FeedPost} post The post
    * @param {Ext.data.Model} records The model instance
    */
    onTabOpen: function(post, records) {
        var items = [],
            parent = this.getView().ownerCt;

        if (!parent) return;

        Ext.each(
           Ext.Array.from(records),
           function (rec) {
               var title = rec.get('title'),
                   link = rec.get(link);

               if (!this.child('feedpost[link="' + link + '"]')) {

                   items.push({
                       inTab: true,
                       xtype: 'feedpost',
                       title: title,
                       link : link,
                       closable: true,
                       rssItem: rec
                   });
               }
            },
            parent
        );

        if (items.length) {
            parent.suspendLayouts();
            items = parent.add(items);
            parent.setActiveTab(items[0]);
            parent.resumeLayouts();
        }

    },

    /**
    * Listens for a row dblclick
    * @private
    * @param {FeedViewer.Detail} info The detail
    * @param {Ext.data.Model} rec The model instance
    */
    onRowDblClick: function(info, rec) {
       this.onTabOpen(null, rec);
    },

    /**
    * Listens for the open all click
    * @private
    * @param {Ext.button.Button} button
    */
    onOpenAllClick: function(button) {
       this.onTabOpen(null, this.lookupReference('feedItems').getStore().getRange());
}
});