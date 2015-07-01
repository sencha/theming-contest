/**
 * Utility class used by Ext.field.Slider.
 * @private
 */
Ext.define('Ext.slider.Slider', {
    extend: 'Ext.Container',
    xtype: 'slider',

    requires: [
        'Ext.slider.Thumb',
        'Ext.fx.easing.EaseOut'
    ],

    /**
    * @event change
    * Fires when the value changes
    * @param {Ext.slider.Slider} this
    * @param {Ext.slider.Thumb} thumb The thumb being changed
    * @param {Number} newValue The new value
    * @param {Number} oldValue The old value
    */

    /**
    * @event dragstart
    * Fires when the slider thumb starts a drag
    * @param {Ext.slider.Slider} this
    * @param {Ext.slider.Thumb} thumb The thumb being dragged
    * @param {Array} value The start value
    * @param {Ext.EventObject} e
    */

    /**
    * @event drag
    * Fires when the slider thumb starts a drag
    * @param {Ext.slider.Slider} this
    * @param {Ext.slider.Thumb} thumb The thumb being dragged
    * @param {Ext.EventObject} e
    */

    /**
    * @event dragend
    * Fires when the slider thumb starts a drag
    * @param {Ext.slider.Slider} this
    * @param {Ext.slider.Thumb} thumb The thumb being dragged
    * @param {Array} value The end value
    * @param {Ext.EventObject} e
    */
    config: {
        baseCls: 'x-slider',

        /**
         * @cfg {Object} thumbConfig The config object to factory {@link Ext.slider.Thumb} instances
         * @accessor
         */
        thumbConfig: {
            draggable: {
                translatable: {
                    easingX: {
                        duration: 300,
                        type: 'ease-out'
                    }
                }
            }
        },

        /**
         * @cfg {Number} increment The increment by which to snap each thumb when its value changes. Any thumb movement
         * will be snapped to the nearest value that is a multiple of the increment (e.g. if increment is 10 and the user
         * tries to move the thumb to 67, it will be snapped to 70 instead)
         * @accessor
         */
        increment : 1,

        /**
         * @cfg {Number/Number[]} value The value(s) of this slider's thumbs. If you pass
         * a number, it will assume you have just 1 thumb.
         * @accessor
         */
        value: 0,

        /**
         * @cfg {Number} minValue The lowest value any thumb on this slider can be set to.
         * @accessor
         */
        minValue: 0,

        /**
         * @cfg {Number} maxValue The highest value any thumb on this slider can be set to.
         * @accessor
         */
        maxValue: 100,

        /**
         * @cfg {Boolean} allowThumbsOverlapping Whether or not to allow multiple thumbs to overlap each other.
         * Setting this to true guarantees the ability to select every possible value in between {@link #minValue}
         * and {@link #maxValue} that satisfies {@link #increment}
         * @accessor
         */
        allowThumbsOverlapping: false,

        /**
         * @cfg {Boolean/Object} animation
         * The animation to use when moving the slider. Possible properties are:
         *
         * - duration
         * - easingX
         * - easingY
         *
         * @accessor
         */
        animation: true,

        /**
         * Will make this field read only, meaning it cannot be changed with used interaction.
         * @cfg {Boolean} readOnly
         * @accessor
         */
        readOnly: false
    },

    /**
     * @cfg {Number/Number[]} values Alias to {@link #value}
     */

    elementWidth: 0,

    offsetValueRatio: 0,

    activeThumb: null,

    constructor: function(config) {
        config = config || {};

        if (config.hasOwnProperty('values')) {
            config.value = config.values;
        }

        this.callParent([config]);
    },

    /**
     * @private
     */
    initialize: function() {
        var element = this.element,
            thumb;

        this.callParent();

        element.on({
            scope: this,
            tap: 'onTap',
            resize: 'onResize'
        });

        this.on({
            scope: this,
            delegate: '> thumb',
            tap: 'onTap',
            beforedragstart: 'onThumbBeforeDragStart',
            dragstart: 'onThumbDragStart',
            drag: 'onThumbDrag',
            dragend: 'onThumbDragEnd'
        });

        thumb = this.getThumb(0);
        if (thumb) {
            thumb.on('resize', 'onThumbResize', this);
        }
    },

    /**
     * @private
     */
    factoryThumb: function() {
        return Ext.factory(this.getThumbConfig(), Ext.slider.Thumb);
    },

    /**
     * Returns the Thumb instances bound to this Slider
     * @return {Ext.slider.Thumb[]} The thumb instances
     */
    getThumbs: function() {
        return this.innerItems;
    },

    /**
     * Returns the Thumb instance bound to this Slider
     * @param {Number} [index=0] The index of Thumb to return.
     * @return {Ext.slider.Thumb} The thumb instance
     */
    getThumb: function(index) {
        if (typeof index != 'number') {
            index = 0;
        }

        return this.innerItems[index];
    },

    refreshOffsetValueRatio: function() {
        var me = this,
            valueRange = me.getMaxValue() - me.getMinValue(),
            trackWidth = me.elementWidth - me.thumbWidth;

        me.offsetValueRatio = valueRange === 0 ? 0 : trackWidth / valueRange;
    },

    onThumbResize: function(){
        var thumb = this.getThumb(0);
        if (thumb) {
            this.thumbWidth = thumb.getElementWidth();
        }
        this.refresh();
    },

    onResize: function(element, info) {
        this.elementWidth = info.width;
        this.refresh();
    },

    refresh: function() {
        this.refreshing = true;
        this.refreshValue();
        this.refreshing = false;
    },

    setActiveThumb: function(thumb) {
        var oldActiveThumb = this.activeThumb;

        if (oldActiveThumb && oldActiveThumb !== thumb) {
            oldActiveThumb.setZIndex(null);
        }

        this.activeThumb = thumb;
        thumb.setZIndex(2);

        return this;
    },

    onThumbBeforeDragStart: function(thumb, e) {
        if (this.offsetValueRatio === 0 || e.absDeltaX <= e.absDeltaY || this.getReadOnly()) {
            return false;
        }
    },

    onThumbDragStart: function(thumb, e) {
        var me = this;

        me.refreshAllThumbConstraints();

        e.stopPropagation();

        if (me.getAllowThumbsOverlapping()) {
            me.setActiveThumb(thumb);
        }

        me.dragStartValue = me.getValue()[me.getThumbIndex(thumb)];
        me.fireEvent('dragstart', me, thumb, me.dragStartValue, e);
    },

    onThumbDrag: function(thumb, e, offsetX) {
        var me = this,
            index = me.getThumbIndex(thumb),
            offsetValueRatio = me.offsetValueRatio,
            constrainedValue = me.constrainValue(me.getMinValue() + offsetX / offsetValueRatio);

        e.stopPropagation();

        me.setIndexValue(index, constrainedValue);

        me.fireEvent('drag', me, thumb, me.getValue(), e);

        return false;
    },

    setIndexValue: function(index, value, animation) {
        var me = this,
            thumb = me.getThumb(index),
            values = me.getValue(),
            minValue = me.getMinValue(),
            offsetValueRatio = me.offsetValueRatio,
            increment = me.getIncrement(),
            draggable = thumb.getDraggable();

        draggable.setOffset((value - minValue) * offsetValueRatio, null, animation);

        values[index] = minValue + Math.round((draggable.offset.x / offsetValueRatio) / increment) * increment;
    },

    onThumbDragEnd: function(thumb, e) {
        var me = this,
            index = me.getThumbIndex(thumb),
            newValue = me.getValue()[index],
            oldValue = me.dragStartValue;

        me.snapThumbPosition(thumb, newValue);
        me.fireEvent('dragend', me, thumb, me.getValue(), e);
        if (oldValue !== newValue) {
            me.fireEvent('change', me, thumb, newValue, oldValue);
        }
    },

    getThumbIndex: function(thumb) {
        return this.getThumbs().indexOf(thumb);
    },

    refreshThumbConstraints: function(thumb) {
        var allowThumbsOverlapping = this.getAllowThumbsOverlapping(),
            offsetX = thumb.getDraggable().getOffset().x,
            thumbs = this.getThumbs(),
            index = this.getThumbIndex(thumb),
            previousThumb = thumbs[index - 1],
            nextThumb = thumbs[index + 1],
            thumbWidth = this.thumbWidth;

        if (previousThumb) {
            previousThumb.getDraggable().addExtraConstraint({
                max: {
                    x: offsetX - ((allowThumbsOverlapping) ? 0 : thumbWidth)
                }
            });
        }

        if (nextThumb) {
            nextThumb.getDraggable().addExtraConstraint({
                min: {
                    x: offsetX + ((allowThumbsOverlapping) ? 0 : thumbWidth)
                }
            });
        }
    },

    /**
     * @private
     */
    onTap: function(e) {
        var me = this,
            element = me.element,
            minDistance = Infinity,
            i, absDistance, testValue, closestIndex, oldValue, thumb,
            ln, values, value, offset, elementX, targetElement, touchPointX;

        if (me.offsetValueRatio === 0 || me.isDisabled() || me.getReadOnly()) {
            return;
        }

        targetElement = Ext.get(e.target);

        if (!targetElement || (Ext.browser.engineName == 'WebKit' && targetElement.hasCls('x-thumb'))) {
            return;
        }

        touchPointX = e.touch.point.x;
        elementX = element.getX();
        offset = touchPointX - elementX - (me.thumbWidth / 2);
        value = me.constrainValue(me.getMinValue() + offset / me.offsetValueRatio);
        values = me.getValue();
        ln = values.length;

        if (ln === 1) {
            closestIndex = 0;
        } else {
            for (i = 0; i < ln; i++) {
                testValue = values[i];
                absDistance = Math.abs(testValue - value);

                if (absDistance < minDistance) {
                    minDistance = absDistance;
                    closestIndex = i;
                }
            }
        }

        oldValue = values[closestIndex];
        thumb = me.getThumb(closestIndex);

        me.setIndexValue(closestIndex, value, me.getAnimation());
        me.refreshThumbConstraints(thumb);

        if (oldValue !== value) {
            me.fireEvent('change', me, thumb, value, oldValue);
        }
    },

    /**
     * @private
     */
    updateThumbs: function(newThumbs) {
        this.add(newThumbs);
    },

    applyValue: function(value, oldValue) {
        var values = Ext.Array.from(value || 0),
            filteredValues = [],
            previousFilteredValue = this.getMinValue(),
            filteredValue, i, ln;

        for (i = 0,ln = values.length; i < ln; i++) {
            filteredValue = this.constrainValue(values[i]);

            if (filteredValue < previousFilteredValue) {
                //<debug>
                Ext.Logger.warn("Invalid values of '"+Ext.encode(values)+"', values at smaller indexes must " +
                    "be smaller than or equal to values at greater indexes");
                //</debug>
                filteredValue = previousFilteredValue;
            }

            filteredValues.push(filteredValue);

            previousFilteredValue = filteredValue;
        }

        if (!this.refreshing && oldValue) {
            if (Ext.Array.equals(value, oldValue)) {
                filteredValues = undefined;
            }
        }

        return filteredValues;
    },

    /**
     * Updates the sliders thumbs with their new value(s)
     */
    updateValue: function(newValue, oldValue) {
        var me = this,
            thumbs = me.getThumbs(),
            len = newValue.length,
            i;

        me.setThumbsCount(len);

        for (i = 0; i < len; i++) {
            me.snapThumbPosition(thumbs[i], newValue[i]);
        }
    },

    /**
     * @private
     */
    refreshValue: function() {
        this.refreshOffsetValueRatio();

        this.setValue(this.getValue());
    },

    /**
     * @private
     * Takes a desired value of a thumb and returns the nearest snap value. e.g if minValue = 0, maxValue = 100, increment = 10 and we
     * pass a value of 67 here, the returned value will be 70. The returned number is constrained within {@link #minValue} and {@link #maxValue},
     * so in the above example 68 would be returned if {@link #maxValue} was set to 68.
     * @param {Number} value The value to snap
     * @return {Number} The snapped value
     */
    constrainValue: function(value) {
        var me = this,
            minValue  = me.getMinValue(),
            maxValue  = me.getMaxValue(),
            increment = me.getIncrement(),
            remainder;

        value = parseFloat(value);

        if (isNaN(value)) {
            value = minValue;
        }

        remainder = (value - minValue) % increment;
        value -= remainder;

        if (Math.abs(remainder) >= (increment / 2)) {
            value += (remainder > 0) ? increment : -increment;
        }

        value = Math.max(minValue, value);
        value = Math.min(maxValue, value);

        return value;
    },

    setThumbsCount: function(count) {
        var thumbs = this.getThumbs(),
            thumbsCount = thumbs.length,
            i, ln, thumb;

        if (thumbsCount > count) {
            for (i = 0,ln = thumbsCount - count; i < ln; i++) {
                thumb = thumbs[thumbs.length - 1];
                thumb.destroy();
            }
        }
        else if (thumbsCount < count) {
            for (i = 0,ln = count - thumbsCount; i < ln; i++) {
                this.add(this.factoryThumb());
            }
        }

        return this;
    },

    /**
     * Convenience method. Calls {@link #setValue}.
     */
    setValues: function(value) {
        this.setValue(value);
    },

    /**
     * Convenience method. Calls {@link #getValue}.
     * @return {Object}
     */
    getValues: function() {
        return this.getValue();
    },

    /**
     * Sets the {@link #increment} configuration.
     * @param {Number} increment
     * @return {Number}
     */
    applyIncrement: function(increment) {
        if (increment === 0) {
            increment = 1;
        }

        return Math.abs(increment);
    },

    /**
     * @private
     */
    updateAllowThumbsOverlapping: function(newValue, oldValue) {
        if (typeof oldValue != 'undefined') {
            this.refreshValue();
        }
    },

    /**
     * @private
     */
    updateMinValue: function(newValue, oldValue) {
        if (typeof oldValue != 'undefined') {
            this.refreshValue();
        }
    },

    /**
     * @private
     */
    updateMaxValue: function(newValue, oldValue) {
        if (typeof oldValue != 'undefined') {
            this.refreshValue();
        }
    },

    /**
     * @private
     */
    updateIncrement: function(newValue, oldValue) {
        if (typeof oldValue != 'undefined') {
            this.refreshValue();
        }
    },

    updateDisabled: function(disabled) {
        this.callParent(arguments);

        var items = this.getItems().items,
            ln = items.length,
            i;

        for (i = 0; i < ln; i++) {
            items[i].setDisabled(disabled);
        }
    },

    privates: {
        refreshAllThumbConstraints: function() {
            var thumbs = this.getThumbs(),
                len = thumbs.length,
                i;

            for (i = 0; i < len; i++) {
                this.refreshThumbConstraints(thumbs[i]);
            }
        },

        snapThumbPosition: function(thumb, value) {
            var ratio = this.offsetValueRatio,
                offset;

            if (isFinite(ratio)) {
                offset = Ext.Number.correctFloat((value - this.getMinValue()) * ratio)
                thumb.getDraggable().setExtraConstraint(null).setOffset(offset);
            }
        }
    }
});
