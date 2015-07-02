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
            region;

        switch (activeItem.text) {
            case 'Bottom':
                config = {
                     minHeight : 250,
                     minWidth : null,
                     height : '50%',
                     width : null
                };
                region = 'south';
                break;

            case 'Right':
                region = 'east';
                config = {
                    minHeight : null,
                    minWidth : 250,
                    height : null,
                    width : '30%'
                };
                break;
            default:
                post.hide();
                return;
        }
        if (region) {
            if (config) {
                Ext.apply( post, config );
            }
            post.isVisible() || post.show();
            post.setRegion(region);
        }

    }

});