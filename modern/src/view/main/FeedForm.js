/**
 * @class FeedViewer.view.main.FeedForm
 * @extends Ext.form.Panel
 *
 * A form to add feeds
 */

Ext.define('FeedViewer.view.main.FeedForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.feedform',

    items : [{
        xtype: 'fieldset',
        title: 'Feed',
        items: [
            {
                xtype: 'searchfield',
                label: 'URL',
                name: 'feedUrl'
            }
        ]
    }]

});
