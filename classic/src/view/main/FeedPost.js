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
    cls: 'preview',
    scrollable: 'y',
    border: false,

    tpl: [
        '<div class="post-data">',
        '<span class="post-date">{publishedDate:this.formatDate}</span>',
        '<h3 class="post-title">{title}</h3>',
        '<h4 class="post-author">{author:this.defaultValue}</h4>',
        '</div>',
        '<div class="post-body">{content:stripScripts}</div>',
        {
            defaultValue: function(v){
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

    initComponent: function(){
        this.dockedItems = [this.createToolbar()];
        this.callParent(arguments);
    },

    /**
     * Set the active post
     * @param {Ext.data.Model} rec The record
     */
    setActive: function(rec) {
        var me = this,
            gotoButton = me.down('button[action=gotoPost]');

        me.active = rec;
        me.update(rec.getData());
        gotoButton.setHref(rec.get('link'));
    },

    /**
     * Create the top toolbar
     * @private
     * @return {Ext.toolbar.Toolbar} toolbar
     */
    createToolbar: function(){
        var items = [],
            config = {};
        if (!this.inTab) {
            items.push({
                scope: this,
                handler: this.openTab,
                text: 'View in new tab',
                iconCls: 'tab-new'
            }, '-');
        }
        else {
            config.cls = 'x-docked-noborder-top';
        }
        items.push({
            href: this.inTab ? this.getData().link : '#',
            target: '_blank',
            action: 'gotoPost',
            text: 'Go to post',
            iconCls: 'post-go'
        });
        config.items = items;
        return Ext.create('widget.toolbar', config);
    },

    /**
     * Navigate to the active post in a new window
     * @private
     */
    goToPost: function(){
        window.open(this.active.get('link'));
    },

    /**
     * Open the post in a new tab
     * @private
     */
    openTab: function(){
        this.fireEvent('opentab', this, this.active);
    }

});