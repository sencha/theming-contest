/**
 * The Password field creates a password input and is usually created inside a form. Because it creates a password
 * field, when the user enters text it will show up as stars. Aside from that, the password field is just a normal text
 * field. Here's an example of how to use it in a form:
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         fullscreen: true,
 *         items: [
 *             {
 *                 xtype: 'fieldset',
 *                 title: 'Register',
 *                 items: [
 *                     {
 *                         xtype: 'emailfield',
 *                         label: 'Email',
 *                         name: 'email'
 *                     },
 *                     {
 *                         xtype: 'passwordfield',
 *                         label: 'Password',
 *                         name: 'password'
 *                     }
 *                 ]
 *             }
 *         ]
 *     });
 *
 * Or on its own, outside of a form:
 *
 *     Ext.create('Ext.field.Password', {
 *         label: 'Password',
 *         value: 'existingPassword'
 *     });
 *
 * Because the password field inherits from {@link Ext.field.Text textfield} it gains all of the functionality that text
 * fields provide, including getting and setting the value at runtime, validations and various events that are fired as
 * the user interacts with the component. Check out the {@link Ext.field.Text} docs to see the additional functionality
 * available.
 */
Ext.define('Ext.field.Password', {
    extend: 'Ext.field.Text',
    xtype: 'passwordfield',
    alternateClassName: 'Ext.form.Password',

    config: {
        /**
         * @cfg autoCapitalize
         * @inheritdoc
         */
        autoCapitalize: false,

        /**
         * @cfg revealable {Boolean}
         * Enables the reveal toggle button that will show the password in clear text. This is currently only implemented in the Blackberry theme
         */
        revealable: false,

        /**
         * @cfg revealed {Boolean}
         * A value of 'true' for this config will show the password from clear text
         */
        revealed: false,

        /**
         * @cfg component
         * @inheritdoc
         */
        component: {
	        type: 'password'
	    }
    },

    isPassword: true,

    initialize: function() {
        this.callParent(arguments);
        this.addCls(Ext.baseCSSPrefix + 'field-password');
    },

    updateRevealable: function(newValue, oldValue) {
        if (this.$revealIcon) {
            this.getComponent().element.removeChild(this.$revealIcon);
            this.$revealIcon = null;
        }

        if(newValue === true) {
            this.$revealIcon = new Ext.Element(Ext.Element.create({cls:'x-reveal-icon'}, true));
            this.$revealIcon.on({
                tap: 'onRevealIconTap',
                touchstart: 'onRevealIconPress',
                touchend: 'onRevealIconRelease',
                scope: this
            });
            this.getComponent().element.appendChild(this.$revealIcon);
        }
    },

    updateRevealed: function(newValue, oldValue) {
        var component = this.getComponent();

        if(newValue) {
            this.element.addCls(Ext.baseCSSPrefix + 'revealed');
            component.setType("text");
        } else {
            this.element.removeCls(Ext.baseCSSPrefix + 'revealed');
            component.setType("password");
        }
    },

    /**
     * @private
     */
    updateValue: function(value, oldValue) {
        this.toggleRevealIcon(this.isValidTextValue(value));
        this.callParent([value, oldValue]);
    },

    doKeyUp: function(me, e) {
        var value = me.getValue(),
            valid = me.isValidTextValue(me.getValue());

        me.toggleClearIcon(valid);

        if (e.browserEvent.keyCode === 13) {
            me.fireAction('action', [me, e], 'doAction');
        }

        me.toggleRevealIcon(valid);
    },

    /**
     * @private
     */
    showRevealIcon: function() {
        var me         = this,
            value      = me.getValue(),
        // allows value to be zero but not undefined or null (other falsey values)
            valueValid = value !== undefined && value !== null && value !== "";

        if (me.getRevealable() && !me.getDisabled() && valueValid) {
            me.element.addCls(Ext.baseCSSPrefix + 'field-revealable');
        }

        return me;
    },

    /**
     * @private
     */
    hideRevealIcon: function() {
        if (this.getRevealable()) {
            this.element.removeCls(Ext.baseCSSPrefix + 'field-revealable');
        }
    },

    onRevealIconTap: function(e) {
        this.fireAction('revealicontap', [this, e], 'doRevealIconTap');
    },

    /**
     * @private
     */
    doRevealIconTap: function(me, e) {
        me.setRevealed(!this.getRevealed());
    },

    onRevealIconPress: function() {
        this.$revealIcon.addCls(Ext.baseCSSPrefix + 'pressing');
    },

    onRevealIconRelease: function() {
        this.$revealIcon.removeCls(Ext.baseCSSPrefix + 'pressing');
    },

    privates: {
        isValidTextValue: function(value) {
            // allows newValue to be zero but not undefined or null (other falsey values)
            return (value !== undefined && value !== null && value !== '');
        },

        toggleRevealIcon: function(state) {
            if (state) {
                this.showRevealIcon();
            } else {
                this.hideRevealIcon();
            }
        }
    }
});
