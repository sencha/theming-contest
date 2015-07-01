
Ext.define('FeedViewer.model.Base', {
    extend: 'Ext.data.Model',
    alias: 'model.fvbase',

    fields: [{
        name: 'id',
        type: 'int'
    }],

    schema: {
        namespace: 'FeedViewer.model'
    }
});