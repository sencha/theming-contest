/**
 * @class FeedViewer.view.main.ViewportController
 */
Ext.define('FeedViewer.view.main.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',

    hideNavButtons: function(){
        var refs = this.getReferences();
        refs.newfeedbutton.hide();
        refs.removebutton.hide();
        refs.cancelbutton.hide();
        refs.savebutton.hide();
    },

    onBackClick: function (view) {
        var refs = this.getReferences(),
            active = view.getActiveItem();

        this.hideNavButtons();
        refs.newfeedbutton.show();

        // since we can be coming back from many places lets check what the active item is...
        switch(active.getReference()){
            //add new views here to handle back button needs
            case 'feeditemlist':
                refs.feeditemlist.deselectAll();
            break;

            default: //viewport
                refs.feedlist.deselectAll();
            break;

        }

    },

    onNewFeedClick: function () {
        var refs = this.getReferences();
        this.getView().push({
            xtype: 'feedform',
            reference: 'feedform'
        });
        this.hideNavButtons();
        refs.cancelbutton.show();
        refs.savebutton.show();

    },
    onCancelClick: function () {
        var refs = this.getReferences();
        this.getView().pop();
        this.hideNavButtons();
        refs.newfeedbutton.show();

    },

    onSaveClick: function () {
        var me = this,
            refs = this.getReferences(),
            form = refs.feedform.getValues(),
            feed = Ext.create('FeedViewer.model.RSSFeed');

        if(form && form.feedUrl){
            feed.load({
                url : form.feedUrl,
                success: me.validateFeed,
                failure: me.markInvalid,
                scope: me
            });
        }
    },

    validateFeed: function(response){
        var me = this,
            refs = this.getReferences(),
            store, rec;

        try {
            data = response.data;
            if (data['title']) {
                store = refs.feedlist.getStore();
                rec = store.add({
                    title: data['title'],
                    feedUrl: data['feedUrl']
                })[0];

                me.getView().pop();
                me.hideNavButtons();
                refs.newfeedbutton.show();

                return;
            }
        } catch(e) {
        }
        this.markInvalid();
    },

    /**
     * React to the feed validation failing
     * @private
     */
    markInvalid: function(){
        this.down('button[text=Add Feed]').enable();
        this.form.setLoading(false);
        this.form.getComponent('feed').markInvalid('The URL specified is not a valid RSS2 feed.');
    },

    onRemoveClick: function () {
        var refs = this.getReferences();
        this.getView().pop();
        this.hideNavButtons();
        refs.newfeedbutton.show();
    },

    onFeedListSelect: function (view, record) {
        var me = this,
            refs = this.getReferences(),
            viewport = me.getView();


        record.load({
                url : record.get('feedUrl'),
                limit : 50,
                callback: function(records, operation, success) {
                    if(success){

                        viewport.push({
                            xtype: 'feeditemlist',
                            reference: 'feeditemlist',
                            title: record.get('title'),
                            listeners: {
                                select: 'onFeedListItemSelect'
                            }
                        });

                        refs = me.getReferences();
                        var list = refs.feeditemlist;
                        list.setStore(record.entries());
                        list.getStore().load();
                    }
                }}
        );
        this.hideNavButtons();
        refs.removebutton.show();
    },

    onFeedListItemSelect : function (view,record) {
        var me = this,
            refs = this.getReferences(),
            html = 'You selected: ' + record.get('title'),

            viewport = me.getView();

        this.hideNavButtons();

        viewport.push({
            xtype: 'panel',
            tpl: [
                '<div class="post-data">',
                '<span class="post-date">{publishedDate:this.formatDate}</span>',
                '<h3 class="post-title">{title}</h3>',
                '<h4 class="post-author">{author:this.defaultValue}</h4>',
                '</div>',
                '<div class="post-body">{content:stripScripts}</div>',
                {
                    defaultValue: function(v){
                        return v ? 'By: ' + v : '';
                    },

                    formatDate: function(value){
                        if (!Ext.isDate(value)) {
                            return '';
                        }
                        return Ext.Date.format(value, 'M j, Y, g:i a');
                    }
                }
            ],
            title: record.get('title'),
            scrollable: true,
            reference: 'feeditemdetail'
        });

        refs.feeditemdetail.setRecord(record);
    }

});
