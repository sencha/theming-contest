Ext.define('FeedViewer.view.main.FeedGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.ux.PreviewPlugin'
    ],

    xtype: 'feedgrid',

    controller: 'feedgrid',

    cls: 'feed-grid',

    viewConfig: {
        itemId: 'view',
        plugins: [{
            pluginId: 'preview',
            ptype: 'preview',
            bodyField: 'contentSnippet',
            expanded: true
        }]
    },

    columns: [{
        text: 'Title',
        dataIndex: 'title',
        flex: 1,
        renderer: 'formatTitle'
    }, {
        text: 'Author',
        dataIndex: 'author',
        hidden: true,
        flex : 1

    }, {
        text: 'Date',
        xtype : 'datecolumn',
        dataIndex: 'publishedDate',
        dateFormat : 'Y/m/d g:i a',
        hidden: true,
        renderer: 'formatDate',
        width: 120
    }],

    listeners: {
        select: 'onItemSelect',
        rowdblclick : 'onRowDblClick'
    }

});
