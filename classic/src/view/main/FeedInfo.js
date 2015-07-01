/**
 * @class FeedViewer.view.main.FeedInfo
 * @extends Ext.tab.Panel
 *
 * A container class for showing a series of feed details
 *
 * @constructor
 * Create a new Feed Info
 * @param {Object} config The config object
 */
Ext.define('FeedViewer.view.main.FeedInfo', {

    extend: 'Ext.tab.Panel',
    xtype: 'feedinfo',
    maxTabWidth: 250,
    border: false,
    controller: 'feedinfo',

    reference : 'feedTabs',

    defaults : {
        border : false
    },

    tabBar: {
        border: true
    }
});