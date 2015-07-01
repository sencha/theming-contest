/**
 * Specialized {@link Ext.field.Slider} with a single thumb which only supports two {@link #value values}.
 *
 * ## Examples
 *
 *     @example miniphone preview
 *     Ext.Viewport.add({
 *         xtype: 'togglefield',
 *         name: 'awesome',
 *         label: 'Are you awesome?',
 *         labelWidth: '40%'
 *     });
 *
 * Having a default value of 'toggled':
 *
 *     @example miniphone preview
 *     Ext.Viewport.add({
 *         xtype: 'togglefield',
 *         name: 'awesome',
 *         value: 1,
 *         label: 'Are you awesome?',
 *         labelWidth: '40%'
 *     });
 *
 * And using the {@link #value} {@link #toggle} method:
 *
 *     @example miniphone preview
 *     Ext.Viewport.add([
 *         {
 *             xtype: 'togglefield',
 *             name: 'awesome',
 *             value: 1,
 *             label: 'Are you awesome?',
 *             labelWidth: '40%'
 *         },
 *         {
 *             xtype: 'toolbar',
 *             docked: 'top',
 *             items: [
 *                 {
 *                     xtype: 'button',
 *                     text: 'Toggle',
 *                     flex: 1,
 *                     handler: function() {
 *                         Ext.ComponentQuery.query('togglefield')[0].toggle();
 *                     }
 *                 }
 *             ]
 *         }
 *     ]);
 */
Ext.define('Ext.field.Toggle', {
    extend: 'Ext.field.SingleSlider',
    xtype : 'togglefield',
    alternateClassName: 'Ext.form.Toggle',
    requires: ['Ext.slider.Toggle'],

    /**
     * @event change
     * Fires when the value changes.
     * @param {Ext.field.Slider} me
     * @param {Boolean} newValue The new value.
     * @param {Boolean} oldValue The old value.
     */

    config: {
        /**
         * @cfg
         * @inheritdoc
         */
        cls: 'x-toggle-field',

        /* @cfg {String} labelAlign The position to render the label relative to the field input.
         * Available options are: 'top', 'left', 'bottom' and 'right'
         * @accessor
         */
        labelAlign: 'left',

        /**
         * @cfg {String} activeLabel The label to add to the toggle field when it is toggled on.
         * Only available in the Blackberry theme.
         * @accessor
         */
        activeLabel: null,

        /**
         * @cfg {String} inactiveLabel The label to add to the toggle field when it is toggled off.
         * Only available in the Blackberry theme.
         * @accessor
         */
        inactiveLabel: null,

        /**
         * @inheritdoc Ext.slider.Slider#value
         * @cfg {Boolean} value
         * @accessor
         */
        value: false
    },

    /**
     * @event change
     * Fires when an option selection has changed.
     *
     *     Ext.Viewport.add({
     *         xtype: 'togglefield',
     *         label: 'Event Example',
     *         listeners: {
     *             change: function(field, newValue, oldValue) {
     *                 console.log('Value of this toggle has changed:', (newValue) ? 'ON' : 'OFF');
     *             }
     *         }
     *     });
     *
     * @param {Ext.field.Toggle} this
     * @param {Number} newValue the new value of this thumb
     * @param {Number} oldValue the old value of this thumb
     */

    /**
    * @event dragstart
    * @hide
    */

    /**
    * @event drag
    * @hide
    */

    /**
    * @event dragend
    * @hide
    */

    proxyConfig: {
        /**
         * @cfg {String} minValueCls See {@link Ext.slider.Toggle#minValueCls}
         * @accessor
         */
        minValueCls: Ext.baseCSSPrefix + 'toggle-off',

        /**
         * @cfg {String} maxValueCls  See {@link Ext.slider.Toggle#maxValueCls}
         * @accessor
         */
        maxValueCls: Ext.baseCSSPrefix + 'toggle-on'
    },

    /**
     * @private
     */
    applyComponent: function(config) {
        return Ext.factory(config, Ext.slider.Toggle);
    },

    /**
     * @private
     */
    updateActiveLabel: function(newActiveLabel, oldActiveLabel) {
        this.getComponent().element.dom.setAttribute('data-activelabel', newActiveLabel);
    },

    /**
     * @private
     */
    updateInactiveLabel: function(newInactiveLabel, oldInactiveLabel) {
        this.getComponent().element.dom.setAttribute('data-inactivelabel', newInactiveLabel);
    },

    applyValue: function(value) {
        if (typeof value !== 'boolean') {
            value = value !== 0;
        }
        return value;
    },

    updateValue: function(value, oldValue) {
        var me = this,
            active = me.getActiveLabel(),
            inactive = me.getInactiveLabel();

        if (active || inactive) {
            me.setLabel(value ? active : inactive);
        }
        me.callParent([value, oldValue]);
    },

    setComponentValue: function(value) {
        this.getComponent().setValue(value ? 1 : 0);
    },

    /**
     * Toggles the value of this toggle field.
     * @return {Object} this
     */
    toggle: function() {
        // We call setValue directly so the change event can be fired
        this.setValue(!this.getValue());
        return this;
    }
});
