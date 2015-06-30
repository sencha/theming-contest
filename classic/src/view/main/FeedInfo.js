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
    alias: 'widget.feedinfo',


    maxTabWidth: 230,
    border: false,

    controller: 'feedinfo',

    tabBar: {
        border: true
    }


});