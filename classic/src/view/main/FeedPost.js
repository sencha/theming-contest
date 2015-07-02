/**
 * @class FeedViewer.view.main.FeedPost
 * @extends Ext.panel.Panel
 *
 * Shows the detail of a feed post
 *
 * @constructor
 * Create a new Feed Post
 * @param {Object} config The config object
 */
Ext.define('FeedViewer.view.main.FeedPost', {

    extend: 'Ext.panel.Panel',
    xtype: 'feedpost',

    requires : [
        'Ext.mixin.Responsive'
    ],

    cls: 'feed-post preview',
    scrollable: true,

    renderConfig : {
        rssItem : undefined
    },

    viewModel : {
        data: {
            feed: null
        }
    },

    mixins: [
        'Ext.mixin.Responsive'
    ],

    tabConfig: {
        cls : 'tab-feed-post'
    },

    bind : {
        data : '{feed}'
    },

    tpl: [
        '<div class="post-data">',
        '<span class="post-date">{publishedDate:this.formatDate}&nbsp;</span>',
        '<h3 class="post-title">{title}</h3>',
        '<h4 class="post-author">{author:this.defaultAuthor}&nbsp;</h4>',
        '</div>',
        '<div class="post-body">{content:stripScripts}</div>',
        {
            defaultAuthor: function(v){
                return v ? 'By: ' + v : '';
            },

            formatDate: function(value){
                if (!Ext.isDate(value)) {
                    return '';
                }
                return Ext.Date.format(value, 'M j, Y, g:i a');
            }
        }
    ],

    initComponent: function() {
        var me = this;
        me.dockedItems = [me.createToolbar()];
        me.callParent(arguments);
    },

    /**
     * Set the active RSSItem for the Templated output
     * @param {FeedViewer.model.RSSItem} rssItem The feed item
     * @param {FeedViewer.model.RSSItem} prevItem The previous feed item
     */
    updateRssItem: function(rssItem, prevItem) {
        var me = this;

        if (rssItem && rssItem.isRssItem) {
            me.getViewModel().set('feed', rssItem);
        }
    },

    initEvents : function () {

        this.callParent(arguments);
        this.on({
            click: {
                element: 'body',
                delegate: 'a',
                scope: this,
                fn: 'onLinkDelegate'
            }
        });
    },

    /**
     * Ensure all click/tapped Feed content links are targeted to new browser tab
     * @param {Ext.Event} e
     * @param {HTMLElement} target
     */
    onLinkDelegate : function(e, target) {
        Ext.fly(target).set({target : '_blank'});
    },

    /**
     * Create the top toolbar
     * @private
     * @return {Ext.toolbar.Toolbar} toolbar
     */
    createToolbar: function(){
        var items = [],
            config = {
                dock: 'top',
                cls: ' navigation feed-post-toolbar'
            };

        if (!this.inTab) {
            items.push({
                action: 'openInTab',
                text: 'View in new tab',
                iconCls: 'tab-new'
            });
        }
        else {
            config.cls += ' x-docked-noborder-top';
        }

        items.push({
            action: 'openPost',
            text: 'Go to post',
            iconCls: 'post-go'
        });
        config.items = items;
        return Ext.widget('toolbar', config);
    }
});