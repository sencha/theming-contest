/**
 * This view is an example list of people.
 */
Ext.define('FeedViewer.view.main.List', {
    extend: 'Ext.grid.Grid',
    xtype: 'mainfeedlist',

    requires: [
        'FeedViewer.store.Feeds'
    ],

    title: 'Feeds',

    store: {
        type: 'feeds'
    }
});
