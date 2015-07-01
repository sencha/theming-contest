/**
 * @class FeedViewer.view.main.FeedListController
 */
Ext.define('FeedViewer.view.main.FeedListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedlist',

    onFeedListSelect: function (view, record) {
        var me = this,
            viewport = me.getView().up('app-main'),
            vm;

        record.load({
                url : record.get('feedUrl'),
                limit : 50,
                callback: function(records, operation, success) {
                    if(success){
                        viewport.push({
                            xtype: 'feeditemlist',
                            title: record.get('title'),
                            reference: 'feeditempanel'
                        });

                        vm = viewport.down('feeditemlist').getViewModel();
                        vm.set('feed',record);
                        vm.notify(); // notify Feed model binders

                    }
                }}
        );
    },

    onNewFeedClick: function () {
        this.getView().up('app-main').push({
            xtype: 'feedform',
            reference: 'feedform'
        });
    }

});