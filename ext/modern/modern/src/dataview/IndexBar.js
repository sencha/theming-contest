/**
 * IndexBar is a component used to display a list of data (primarily an alphabet) which can then be used to quickly
 * navigate through a list (see {@link Ext.List}) of data. When a user taps on an item in the {@link Ext.IndexBar},
 * it will fire the {@link #index} event.
 *
 * Here is an example of the usage in a {@link Ext.List}:
 *
 *     @example phone portrait preview
 *     Ext.define('Contact', {
 *         extend: 'Ext.data.Model',
 *         config: {
 *             fields: ['firstName', 'lastName']
 *         }
 *     });
 *
 *     var store = new Ext.data.JsonStore({
 *        model: 'Contact',
 *        sorters: 'lastName',
 *
 *        grouper: {
 *            groupFn: function(record) {
 *                return record.get('lastName')[0];
 *            }
 *        },
 *
 *        data: [
 *            {firstName: 'Screech', lastName: 'Powers'},
 *            {firstName: 'Kelly',   lastName: 'Kapowski'},
 *            {firstName: 'Zach',    lastName: 'Morris'},
 *            {firstName: 'Jessie',  lastName: 'Spano'},
 *            {firstName: 'Lisa',    lastName: 'Turtle'},
 *            {firstName: 'A.C.',    lastName: 'Slater'},
 *            {firstName: 'Richard', lastName: 'Belding'}
 *        ]
 *     });
 *
 *     var list = new Ext.List({
 *        fullscreen: true,
 *        itemTpl: '<div class="contact">{firstName} <strong>{lastName}</strong></div>',
 *
 *        grouped     : true,
 *        indexBar    : true,
 *        store: store,
 *        hideOnMaskTap: false
 *     });
 *
*/
Ext.define('Ext.dataview.IndexBar', {
    extend: 'Ext.Component',
    alternateClassName: 'Ext.IndexBar',

    /**
     * @event index
     * Fires when an item in the index bar display has been tapped.
     * @param {Ext.dataview.IndexBar} this The IndexBar instance
     * @param {String} html The HTML inside the tapped node.
     * @param {Ext.dom.Element} target The node on the indexbar that has been tapped.
     */

    config: {
        baseCls: Ext.baseCSSPrefix + 'indexbar',

        /**
         * @cfg {String} direction
         * Layout direction, can be either 'vertical' or 'horizontal'
         * @accessor
         */
        direction: 'vertical',

        /**
         * @cfg {Array} letters
         * The letters to show on the index bar.
         * @accessor
         */
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

        ui: 'alphabet',

        /**
         * @cfg {String} listPrefix
         * The prefix string to be used at the beginning of the list.
         * E.g: useful to add a "#" prefix before numbers.
         * @accessor
         */
        listPrefix: null
    },

    /**
     * @private
     */
    itemCls: Ext.baseCSSPrefix + '',

    updateDirection: function(newDirection, oldDirection) {
        var baseCls = this.getBaseCls();

        this.element.replaceCls(baseCls + '-' + oldDirection, baseCls + '-' + newDirection);
    },

    getElementConfig: function() {
        // Blackberry Specific code for Index Bar Indicator
        if(Ext.theme.is.Blackberry) {
            return {
                reference: 'wrapper',
                classList: ['x-centered', 'x-indexbar-wrapper'],
                children: [
                    {
                        reference: 'indicator',
                        classList: ['x-indexbar-indicator'],
                        hidden: true,
                        children: [{
                            reference: 'indicatorInner',
                            classList: ['x-indexbar-indicator-inner']
                        }]
                    },
                    this.callParent()
                ]
            };
        } else {
            return {
                reference: 'wrapper',
                classList: ['x-centered', 'x-indexbar-wrapper'],
                children: [this.callParent()]
            };
        }
    },

    updateLetters: function(letters) {
        this.innerElement.setHtml('');

        if (letters) {
            var ln = letters.length,
                i;

            for (i = 0; i < ln; i++) {
                this.innerElement.createChild({
                    html: letters[i]
                });
            }
        }
    },

    updateListPrefix: function(listPrefix) {
        if (listPrefix && listPrefix.length) {
            this.innerElement.createChild({
                html: listPrefix
            }, 0);
        }
    },

    /**
     * @private
     */
    initialize: function() {
        this.callParent();

        this.innerElement.on({
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            dragend: this.onDragEnd,
            drag: this.onDrag,
            scope: this
        });
    },

    onTouchStart: function(e) {
        e.stopPropagation();
        this.innerElement.addCls(this.getBaseCls() + '-pressed');
        this.pageBox = this.innerElement.getBox();
        this.onDrag(e);
    },

    onTouchEnd: function(e) {
        this.onDragEnd();
    },

    /**
     * @private
     */
    onDragEnd: function() {
        this.innerElement.removeCls(this.getBaseCls() + '-pressed');

        // Blackberry Specific code for Index Bar Indicator
        if(this.indicator) {
            this.indicator.hide();
        }
    },

    /**
     * @private
     */
    onDrag: function(e) {
        var point = Ext.util.Point.fromEvent(e),
            target, isValidTarget,
            pageBox = this.pageBox;

        if (!pageBox) {
            pageBox = this.pageBox = this.el.getBox();
        }


        if (this.getDirection() === 'vertical') {
            if (point.y > pageBox.bottom || point.y < pageBox.top) {
                return;
            }
            target = Ext.Element.fromPoint(pageBox.left + (pageBox.width / 2), point.y);
            isValidTarget = target.getParent() == this.element;

            // Blackberry Specific code for Index Bar Indicator
            if(this.indicator) {
                this.indicator.show();

                var halfIndicatorHeight = this.indicator.getHeight() / 2,
                    y = point.y - this.element.getY();

                y = Math.min(Math.max(y, halfIndicatorHeight), this.element.getHeight() - halfIndicatorHeight);

                if (this.indicatorInner && isValidTarget) {
                    this.indicatorInner.setHtml(target.getHtml().toUpperCase());
                }
                this.indicator.setTop(y - (halfIndicatorHeight));
            }
        }
        else {
            if (point.x > pageBox.right || point.x < pageBox.left) {
                return;
            }
            target = Ext.Element.fromPoint(point.x, pageBox.top + (pageBox.height / 2));
            isValidTarget = target.getParent() == this.element;
        }

        if (target && isValidTarget) {
            this.fireEvent('index', this, target.dom.innerHTML, target);
        }
    },

    destroy: function() {
        var me = this,
            elements = Array.prototype.slice.call(me.innerElement.dom.childNodes),
            ln = elements.length,
            i = 0;

        for (; i < ln; i++) {
            Ext.removeNode(elements[i]);
        }
        this.callParent();
    }
});
