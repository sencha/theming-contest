/**
 * This view is an example list of people.
 */
Ext.define('FeedViewer.view.main.FeedList', {
    extend: 'Ext.dataview.List',
    xtype: 'feedlist',
    layout: 'fit',
    itemTpl: '{title}',
    store: {
        type: 'feeds'
    },
    listeners:{
        select: function(){
            console.log('selected');
        }
    }
});
