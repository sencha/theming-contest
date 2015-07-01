/**
 * @class FeedViewer.view.main.FeedListController
 */
Ext.define('FeedViewer.view.main.FeedListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.feedlist',

    onFeedListSelect: function (view, record) {
        var me = this,
            viewport = me.getView().up('app-main'), //TODO: NO reaching UP!  Use the Viewport Controller instead
            vm;

        record.load({
                url : record.get('feedUrl'),
                limit : 50,
                callback: function(records, operation, success) {
                    var list;
                    if(success){
                        list = viewport.push({
                            xtype: 'feeditemlist',
                            title: record.get('title'),
                            reference: 'feeditempanel'
                        });

                        vm = list.getViewModel();
                        vm.set('feed',record);
                        vm.notify(); // notify Feed model binders

                    }
                }}
        );
    },

    onNewFeedClick: function () {   //TODO: NO reaching UP!  Use the Viewport Controller instead
        this.getView().up('app-main').push({
            xtype: 'feedform',
            reference: 'feedform'
        });
    }

});