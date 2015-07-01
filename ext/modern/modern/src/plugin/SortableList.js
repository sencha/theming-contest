/**
 * @class Ext.plugin.SortableList
 * @extends Ext.Component
 * The SortableList plugin gives your list items the ability to be reordered by tapping and 
 * dragging elements within the item.   
 *
 * The list-sortablehandle is not added to your tpl by default, so it's important that you 
 * manually include it. It's also important to recognize that list-items are not draggable 
 * themselves.  You must add an element to the itemTpl for it to be dragged.
 *
 *     Ext.Viewport.add({
 *          xtype: 'list',
 *          infinite: true,
 *          plugins: 'sortablelist',
 *          itemTpl: '<span class="myStyle ' + Ext.baseCSSPrefix + 'list-sortablehandle"></span>{text}',
 *          data: [{
 *              text: 'Item 1'
 *          }, {
 *              text: 'Item 2'
 *          }, {
 *              text: 'Item 3'
 *          }]
 *     });
 *
 * The CSS for MyStyle can be anything that creates an element to tap and drag.  For this 
 * example we made a simple rectangle like so:
 *
 *      .myStyle{
 *          width:30px;
 *          height:20px;
 *          background:gray;
 *          float:left;
 *      }
 * 
 * Note: You must have infinite set to 'true' when using the SortableList plugin.
 * 
 */
Ext.define('Ext.plugin.SortableList', {
    extend: 'Ext.Component',

    alias: 'plugin.sortablelist',

    mixins: ['Ext.mixin.Hookable'],

    config: {
        list: null,
        handleSelector: '.' + Ext.baseCSSPrefix + 'list-sortablehandle'
    },

    init: function(list) {
        this.setList(list);
    },

    updateList: function(list) {
        if (list) {
            if (list.initialized) {
                this.attachListeners();
            }
            else {
                list.on({
                    initialize: 'attachListeners',
                    scope: this,
                    single: true
                });
            }
        }
    },

    attachListeners: function() {
        var list = this.getList(),
            scrollerElement = list.getScrollable().getElement();

        this.scrollerElement = scrollerElement;

        scrollerElement.onBefore({
            dragstart: 'onScrollerDragStart',
            scope: this
        });
    },

    onScrollerDragStart: function(e, target) {
        if (Ext.DomQuery.is(target, this.getHandleSelector())) {
            if (!this.animating) {
                this.onDragStart(e, target);
            }
            return false;
        }
    },

    onDragStart: function(e) {
        var row = Ext.getCmp(e.getTarget('.' + Ext.baseCSSPrefix + 'list-item').id),
            list = this.getList(),
            store = list.getStore();

        this.scrollerElement.on({
            drag: 'onDrag',
            dragend: 'onDragEnd',
            scope: this
        });

        this.positionMap = list.getItemMap();
        this.listStore = store;
        this.previousIndexDistance = 0;

        this.dragRow = row;
        this.dragRecord = row.getRecord();

        this.dragRowIndex = this.currentDragRowIndex = row.$dataIndex;
        this.dragRowHeight = this.positionMap.getItemHeight(this.dragRowIndex);

        if (list.getInfinite()) {
            this.startTranslate = this.positionMap.map[this.dragRowIndex];
        } else {
            row.translate(0, 0);
            this.startTranslate = 0;
        }

        row.addCls(Ext.baseCSSPrefix + 'list-item-dragging');
    },

    onDrag: function(e) {
        var list = this.getList(),
            listItems = list.listItems,
            store = list.getStore(),
            collection = list.getStore().data,
            dragRow = this.dragRow,
            dragRecordKey = dragRow.id,
            listItemInfo = list.getListItemInfo(),
            positionMap = this.positionMap,
            distance = 0,
            i, item, ln, targetItem, targetIndex, itemIndex,
            swapIndex, swapPosition, record, swapKey, draggingUp;

        this.dragRowPosition = this.startTranslate + e.deltaY;
        dragRow.translate(0, this.dragRowPosition);

        targetIndex = positionMap.findIndex(this.dragRowPosition + (this.dragRowHeight / 2));
        targetItem = list.getItemAt(targetIndex);

        if (targetItem) {
            distance = targetIndex - this.currentDragRowIndex;

            if (distance !== 0) {
                draggingUp = distance < 0;

                for (i = 0, ln = Math.abs(distance); i < ln; i++) {
                    if (draggingUp) {
                        swapIndex = this.currentDragRowIndex - i;
                        item = list.getItemAt(swapIndex - 1);
                    } else {
                        swapIndex = this.currentDragRowIndex + i;
                        item = list.getItemAt(swapIndex + 1);
                    }

                    swapPosition = positionMap.map[swapIndex];

                    item.translate(0, swapPosition);

                    record = item.getRecord();
                    swapKey = record.id;

                    Ext.Array.remove(collection.items, record);
                    collection.items.splice(swapIndex, 0, record);
                    collection.indices[dragRecordKey] = collection.indices[swapKey];
                    collection.indices[swapKey] = swapIndex;

                    list.updateListItem(item, swapIndex, listItemInfo);
                    item.$position = swapPosition;
                }

                itemIndex = listItems.indexOf(dragRow);
                Ext.Array.remove(listItems, dragRow);
                listItems.splice(itemIndex + distance, 0, dragRow);

                dragRow.$dataIndex = targetIndex;
                dragRow.$position = positionMap.map[targetIndex];

                this.currentDragRowIndex = targetIndex;
            }
        }
    },

    onDragEnd: function() {
        var me = this,
            row = me.dragRow,
            list = me.getList(),
            listItemInfo = list.getListItemInfo(),
            position = row.$position;

        me.scrollerElement.un({
            drag: 'onDrag',
            dragend: 'onDragEnd',
            scope: me
        });

        me.animating = true;

        row.getTranslatable().on('animationend', function() {
            row.removeCls(Ext.baseCSSPrefix + 'list-item-dragging');

            var currentIdx = this.currentDragRowIndex,
                dragIdx = this.dragRowIndex;

            if (currentIdx !== dragIdx) {
                list.updateListItem(row, row.$dataIndex, listItemInfo);
                row.$position = position;

                list.fireEvent('dragsort', list, row, currentIdx, dragIdx);
            }
            me.animating = false;
        }, me, {single: true});

        row.translate(0, position, {duration: 100});
    }
});
