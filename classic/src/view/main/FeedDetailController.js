/**
 * @class FeedViewer.view.main.FeedGridController
 */
Ext.define('FeedViewer.view.main.FeedDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feeddetail',

    listen: {
        component: {
            'feeddetail cycle[action=cyclePreview]': {
                change: 'readingPaneChange'
            }
        },
        global : {
            responsiveupdate : 'onResponsiveApplied'
        }
    },

    /**
     * Handle the checked item being changed
     * @private
     * @param {Ext.button.Button} cycle The checked item
     * @param {Ext.menu.CheckItem} activeItem The checked item
     */
    readingPaneChange: function(cycle, activeItem){
        var view = this.getView(),
            post = view.down('feedpost'),
            config,
            region = activeItem.cycleRegion;

        switch (region) {
            case 'south':
                config = {
                     region : region,
                     minHeight : 250,
                     minWidth : null,
                     height : '50%',
                     hidden : false,
                     width : null
                };
                break;

            case 'east':
                config = {
                    region : region,
                    minHeight : null,
                    minWidth : 250,
                    height : null,
                    hidden : false,
                    width : '50%'
                };
                break;
            default:
                config = { hidden : true };
        }

        if (post && config) {
            view.suspendLayouts();
            post.setConfig(config);
            view.resumeLayouts({root : true});
        }

    },

    /**
     * Maintains cycle Button state after responsive update layouts
     * (eg. when the Feedpost Component changes regions, etc)
     * @param {Object} context The current Responsive context
     */
    onResponsiveApplied : function (context) {
        var me = this,
            view = me.getView(),
            cycle = view.down('cycle'),
            cycleMenu = cycle && cycle.getMenu(),
            post = view.down('feedpost'),
            region = post && post.region,
            item;

        if (cycleMenu && post) {
            region = !post.isVisible() ? 'hidden' : region;
            item = region && cycleMenu.child('menuitem[cycleRegion=' + region + ']');
            if (item) {
                item.setChecked(true);
            }
        }
    }

});