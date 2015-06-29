/**
 * @class FeedViewer.ProxyRSS
 * A data.Proxy implementation for loading select RSS Feeds directly from the google.api
 * in lieu of JSONP and or other cross-domain method
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
    * @param {Ext.data.operation.Operation} operation The Ext.data.operation.Operation object
    * @param {Function} callback The callback function to call when the Operation has completed
    * @param {Object} scope The scope in which to execute the callback
    */
    doRequest: function(operation, callback, scope) {
        var me = this,
            request = me.buildRequest(operation),
            method = me.getMethod(request),
            feed;

        //<debug>
        if (!operation.isReadOperation) {
           Ext.raise("The RssProxy only supports 'read' operations");
        }
       //</debug>

        request.setConfig({
            scope               : scope,
            callback            : callback
        });

        if (method === 'findFeeds') {
            feed = google.feeds;
        } else {
            feed = new google.feeds.Feed(request.getUrl());
            feed.setNumEntries( operation.getLimit() || 4);
        }

        request.feed = feed;
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
            feed = request.feed,
            operation = request.getOperation(),
            method = me.getMethod(request),
            args = [Ext.Function.bind( me.createRequestCallback(request, operation), me )];

        if (method !== 'load') {
            /**
             * Typical query would look like:
                  site:cnn.com president
             */
            args.unshift(operation.query || '');
        } else {
            feed.setResultFormat( google.feeds.Feed.JSON_FORMAT );
            feed.includeHistoricalEntries();
        }

        (feed[method]).apply(feed, args);

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

            // Normalize status for the reader and operation
            var status = Ext.apply(
                {message : ''},
                response.status,
                response.error
            );

            status.success = !response.error;
            response.status = status;

            me.processResponse( status.success, operation, request, response);
            me = request = operation = null;
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