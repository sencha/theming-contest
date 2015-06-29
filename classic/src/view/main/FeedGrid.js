Ext.define('FeedViewer.view.main.FeedGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'FeedViewer.view.main.FeedGridController',
        'FeedViewer.view.main.FeedGridViewModel'
    ],
    alias: 'widget.feedgrid',

    controller: 'feedgrid',
    viewModel:'feedgrid',

    cls: 'feed-grid',

    bind: {
        store: '{feeditems}'
    },

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
            bodyField: 'description',
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
        width: 200

    }, {
        text: 'Date',
        dataIndex: 'pubDate',
        renderer: 'formatDate',
        width: 200
    }],

    listeners: {
        scope: 'controller',
        selectionchange: 'onSelectionChange',
        afterrender: 'onAfterRender',
        select: 'onSelect'
    }

});
