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
    onBackClick: function () {
        var refs = this.getReferences();
        this.hideNavButtons();
        refs.newfeedbutton.show();
        refs.feedlist.deselectAll();
    },

    onNewFeedClick: function () {
        var refs = this.getReferences();
        this.getView().push({
            xtype: 'feedform'
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
        var refs = this.getReferences();
        this.getView().pop();
        this.hideNavButtons();
        refs.newfeedbutton.show();
    },

    onRemoveClick: function () {
        var refs = this.getReferences();
        this.getView().pop();
        this.hideNavButtons();
        refs.newfeedbutton.show();
    },

    onFeedListSelect: function (view, record) {
        var refs = this.getReferences();
        this.getView().push({
            xtype: 'feeditemlist',
            feed: record
        });
        this.hideNavButtons();
        refs.removebutton.show();
    }

});
