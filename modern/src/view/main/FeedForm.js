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
    viewModel:{
        data:{
            feed: null,
            isEdit: false
        }
    },
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
            reference: 'savebutton',
            action: 'save',
            text: 'save'
        },{
            xtype:'spacer',
            bind:{
                hidden: '{!isEdit}'
            }
        },{
            xtype: 'button',
            action: 'remove',
            reference: 'removebutton',
            bind:{
                hidden: '{!isEdit}'
            },
            text: 'remove'
        }]
    }]

});
