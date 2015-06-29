/**
 * Created by doug on 6/26/15.
 */
Ext.define('FeedViewer.ProxyRSS', {
    extend : 'Ext.data.proxy.Server',
    requires : [
        'Ext.ux.google.Feeds'
    ],

    alias : 'proxy.googglerss',
    alternateClassName: 'Ext.data.GoogleRssProxy',

    reader : {
        type : 'json',
        rootProperty : 'feed',
        messageProperty : 'status.message',
        successProperty : 'status.success'
    },

    isRSSProxy: true,

    // @private
    defaultMethod: 'load',

    /**
     * @cfg {Object} api
     * Specific Feed Api method to call during the current 'read' operation
     *
     *     api: {
     *         read    : 'load'
     *     }
     *
     * For example:
     *
     *     api: {

     *         read    : 'findFeeds'
     *     }
     *
     * If the specific URL for a given CRUD action is undefined, the CRUD action request will be directed to the
     * configured {@link Ext.data.proxy.Server#url url}.
     */
    api: {
        read: 'load'
    },


    /**
    * @private
    * Copy any sorters, filters etc into the params so they can be sent over the wire
    */
    getParams: function(operation) {
       return {};
    },

    /**
    * Generates a url based on a given Ext.data.Request object. By default, ServerProxy's buildUrl will add the
    * cache-buster param to the end of the url. Subclasses may need to perform additional modifications to the url.
    * @param {Ext.data.Request} request The request object
    * @return {String} The url
    */
    buildUrl: function(request) {
       var me = this,
           url = me.getUrl(request);

       //<debug>
       if (!url) {
           Ext.raise("You are using an RssProxy but have not supplied it with a url.");
       }
       //</debug>

       return url;
    },

    /**
    * Get the url for the request taking into account the order of priority,
    * - The request
    * - The api
    * - The url
    * @private
    * @param {Ext.data.Request} request The request
    * @return {String} The url
    */
    getUrl: function(request) {
        var url;
        if (request) {
            url = request.getUrl();
        }
        return url ? url : this.callParent();
    },

    /**
    * In ServerProxy subclasses, the {@link #create}, {@link #read}, {@link #update} and {@link #erase} methods all
    * pass through to doRequest. Each ServerProxy subclass must implement the doRequest method - see {@link
    * Ext.data.proxy.JsonP} and {@link Ext.data.proxy.Ajax} for examples. This method carries the same signature as
    * each of the methods that delegate to it.
    *
    * @param {Ext.data.operation.Operation} operation The Ext.data.operation.Operation object
    * @param {Function} callback The callback function to call when the Operation has completed
    * @param {Object} scope The scope in which to execute the callback
    */
    doRequest: function(operation, callback, scope) {
        var me = this,
            request = me.buildRequest(operation);

        request.setConfig({
            scope               : me,
            callback            : me.createRequestCallback(request, operation)
        });
        request.feed =new google.feeds.Feed(request.getUrl());
        return me.sendRequest(request);
    },

    /**
     * Makes a Google Feeds Api request
     * @param {Ext.data.Request} request
     * @return {Ext.data.Request} request
     * @private
     */
    sendRequest: function(request) {
        var me = this,
            feed = request.feed;

        feed.setResultFormat( google.feeds.Feed.JSON_FORMAT );
        feed.includeHistoricalEntries();

        feed[ me.getMethod(request) ](
            Ext.Function.bind( request.getCallback(), request.getScope() )
        );

        me.lastRequest = request;
        return request;
    },

    /**
     * Returns the Feed method name for a given read request. By default this returns based on a lookup on
     * {@link #actionMethods}.
     * @param {Ext.data.Request} request The request object
     * @return {String} The read action's method to use should be either 'load' or 'findFeeds'
     */
    getMethod: function(request) {
        var api = this.getApi(),
            method;

        if (api) {
            method = api.read;
        }
        return method || this.defaultMethod;
    },

    /**
     * @private
     * @param {Ext.data.Request} request The Request object
     * @param {Ext.data.operation.Operation} operation The Operation being executed
     * @return {Function} The callback function
     */
    createRequestCallback: function(request, operation) {
        var me = this;

        return function(response) {
            if (request === me.lastRequest) {
                me.lastRequest = null;
            }

            var status = response.status || (response.status =  {message : ''});
            status.success = status.code == 200;

            me.processResponse( status.success, operation, request, response);
            me = null;
        };
    },

    /**
    * Optional callback function which can be used to clean up after a request has been completed.
    * @param {Ext.data.Request} request The Request object
    * @param {Boolean} success True if the request was successful
    * @protected
    * @template
    * @method
    */
    afterRequest: function(request, success) {
        delete request.feed;
    }

});