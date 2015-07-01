/**
 * @class FeedViewer.view.main.FeedItemListController
 */
Ext.define('FeedViewer.view.main.FeedItemListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feeditemlist',

    onFeedListItemSelect : function (view,record) {
        var me = this,
            refs = this.getReferences(),
            vm,
            viewport = me.getView().up('app-main');

        viewport.push({
            xtype: 'feedpost',
            reference: 'feedpost',
            title: record.get('title')
        });

        vm = viewport.down('feedpost').getViewModel();
        vm.set('feed', record.data);

    },

    onRemoveClick: function () {
        var refs = this.getReferences(),
            active;

        active = refs.feedlist.getSelection()[0];
        if (active) {
            refs.feedlist.deselectAll();
            refs.feedlist.getStore().remove(active);
        }
        this.getView().pop();
        this.hideNavButtons();
        refs.newfeedbutton.show();
    }

});