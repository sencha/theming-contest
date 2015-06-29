/**
 * @class FeedViewer.view.main.FeedWindow
 * @extends Ext.window.Window
 *
 * Shows a dialog for creating and validating a new feed.
 *
 * @constructor
 * Create a new Feed Window
 * @param {Object} config The config object
 */

Ext.define('FeedViewer.view.main.FeedWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.feedwindow',

    plain: true,
    resizable: false,
    modal: true,
    closeAction: 'hide',
    defaultFocus: '#feed',

    defaultFeeds: [
        ['http://rssfeeds.usatoday.com/usatoday-NewsTopStories', 'USA Today Top Stories'], //http://rss.cnn.com/rss/edition.rss
        ['http://sports.espn.go.com/espn/rss/news', 'ESPN Top News'],
        ['http://news.google.com/news?ned=us&topic=t&output=rss', 'Sci/Tech - Google News'],
        ['http://rss.news.yahoo.com/rss/software', 'Yahoo Software News']
    ],

    /**
     * @event feedvalid
     * @param {FeedViewer.FeedWindow} this
     * @param {String} title
     * @param {String} url
     * @param {String} description
     */

    initComponent: function(){
        var me = this;

        me.form = Ext.create('widget.form', {
            bodyPadding: '12 10 10',
            border: false,
            unstyled: true,
            items: [{
                anchor: '100%',
                itemId: 'feed',
                fieldLabel: 'Enter the URL of the feed to add',
                labelAlign: 'top',
                msgTarget: 'under',
                xtype: 'combo',
                controller: 'main',
                viewModel: 'main',
                store: this.defaultFeeds,
                getInnerTpl: function(){
                    return '<div class="feed-picker-url">{field1}</div><div class="feed-picker-title">{field2}</div>';
                }
            }]
        });
        Ext.apply(me, {
            width: 500,
            title: 'Add Feed',
            iconCls: 'feed',
            layout: 'fit',
            items: me.form,
            buttons: [{
                xtype: 'button',
                text: 'Add Feed',
                scope: me,
                handler: me.onAddClick
            }, {
                xtype: 'button',
                text: 'Cancel',
                scope: me,
                handler: me.doHide
            }]
        });
        me.callParent(arguments);
    },

    doHide: function(){
        this.hide();
    },

    /**
     * React to the add button being clicked.
     * @private
     */
    onAddClick: function(addBtn) {
        addBtn.disable();
        var url = this.form.getComponent('feed').getValue(),
            feed = Ext.create('FeedViewer.model.RSSFeed');
        this.form.setLoading({
            msg: 'Validating feed...'
        });

        feed.load({
            url : url,
            success: this.validateFeed,
            failure: this.markInvalid,
            scope: this
        });

        /*Ext.Ajax.request({
            url: url,
            params: {
                feed: url
            },
            success: this.validateFeed,
            failure: this.markInvalid,
            scope: this
        });*/
    },

    /**
     * React to the feed validation passing
     * @private
     * @param {Object} response The response object
     */
    validateFeed: function(response) {
        this.form.setLoading(false);
        this.down('button[text=Add Feed]').enable();

        var dq = Ext.DomQuery,
            url = this.form.getComponent('feed').getValue(),
            data,
            channel,
            title;

        try {
            data = response.data;
            if (data['title']) {
                this.hide();
                this.fireEvent('feedvalid', this, data.title, data.feedUrl);
                return;
            }
        } catch(e) {
        }
        this.markInvalid();

    },

    /**
     * React to the feed validation failing
     * @private
     */
    markInvalid: function(){
        this.down('button[text=Add Feed]').enable();
        this.form.setLoading(false);
        this.form.getComponent('feed').markInvalid('The URL specified is not a valid RSS2 feed.');
    }
});