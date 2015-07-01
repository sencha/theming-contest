/**
 * @class FeedViewer.view.main.FeedPost
 * @extends Ext.dataview.List
 *
 * A data view that shows default rss feeds and allows you to add or view them
 */
Ext.define('FeedViewer.view.main.FeedPost', {
    extend: 'Ext.Panel',
    xtype: 'feedpost',

    scrollable: true,

    viewModel : {
        data: {
            feed: null
        }
    },

    bind : {
       data : '{feed}'
    },

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
    ]

});
