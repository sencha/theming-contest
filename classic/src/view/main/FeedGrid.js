Ext.define('FeedViewer.view.main.FeedGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'FeedViewer.view.main.FeedGridController'
    ],

    alias: 'widget.feedgrid',

    controller: 'feedgrid',


    cls: 'feed-grid',

    dockedItems: [{
        xtype:'toolbar',
        dock: 'top',
        cls: 'x-docked-noborder-top',
        items: [{
            iconCls: 'open-all',
            text: 'Open All',
            scope:  'controller',
            handler: 'onOpenAllClick'
        }, '-', {
            xtype: 'cycle',
            text: 'Reading Pane',
            prependText: 'Preview: ',
            showText: true,
            scope: 'controller',
            changeHandler: 'readingPaneChange',
            menu: {
                id: 'reading-menu',
                items: [{
                    text: 'Bottom',
                    checked: true,
                    iconCls:'preview-bottom'
                }, {
                    text: 'Right',
                    iconCls:'preview-right'
                }, {
                    text: 'Hide',
                    iconCls:'preview-hide'
                }]
            }
        }, {
            iconCls: 'summary',
            text: 'Summary',
            enableToggle: true,
            pressed: true,
            scope:  'controller',
            toggleHandler: 'onSummaryToggle'
        }]

    }],

    viewConfig: {
        itemId: 'view',
        plugins: [{
            pluginId: 'preview',
            ptype: 'preview',
            bodyField: 'contentSnippet',
            expanded: true
        }],
        listeners: {
            scope: 'controller',
            itemdblclick: 'onRowDblClick'
        }
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
        // renderer: 'formatDate',
        width: 120
    }],

    listeners: {
        scope: 'controller',
        select: 'onSelect'
    }

});
