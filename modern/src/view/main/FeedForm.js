/**
 * @class FeedViewer.view.main.FeedForm
 * @extends Ext.form.Panel
 *
 * A form to add feeds
 */

Ext.define('FeedViewer.view.main.FeedForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.feedform',
    reference : 'feedForm',
    items : [{
        xtype: 'fieldset',
        title: 'New RSS Feed',
        items: [
            {
                xtype: 'searchfield',
                label: 'URL',
                allowBlank: false,
                name: 'feedUrl'
            }
        ]
    },{
        xtype : 'toolbar',
        docked: 'bottom',
        items:[{
            xtype: 'button',
            action: 'save',
            text: 'save'
        }]
    }]

});
