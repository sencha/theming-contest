/**
 * The MultiSelection plugin injects a multiselector for Modern Toolkit's Grid. Users may
 * activate MultiSelection by tapping the "Select" button in the top right corner of the header bar.
 *
 * This will show the previously hidden {@link #selectionColumn}. When the column becomes unhidden,
 * you'll see a new column in the grid's first position. This {@link #selectionColumn} contains a checkbox
 * for each row and the header contains a checkbox that allows selection of all rows at once.
 *
 * Once shown, you may select and delete rows, or cancel the {@link #selectionColumn}.
 *
 * To include the MultiSelection plugin, simply set plugins to 'gridmultiselection'
 * as seen below:
 *
 *     Ext.define('MyApp.view.SelectableGrid', {
 *        extend: 'Ext.grid.Grid',
 *
 *        plugins: 'gridmultiselection',
 *
 *        title: 'My Title',
 *
 *        store: store
 *        columns: [
 *            // columns
 *        ]
 *     );
 *
 * You can modify a few pieces of your MultiSelection tool by opening the plugins type as an object
 * (or an array of objects). You can see some of the changeable bits below:
 *
 *     Ext.define('MyApp.view.SelectableGrid', {
 *        extend: 'Ext.grid.Grid',
 *
 *        plugins: {
 *            type: 'gridmultiselection',
 *            triggerText: 'My Select Button',
 *            cancelText: 'Forget about it',
 *            deleteText: 'Get outta here'
 *        }
 *
 *        title: 'My Title',
 *
 *        store: store
 *        columns: [
 *            // columns
 *        ]
 *     );
 *
 * You can also modify the default settings for the selectionColumn by including your own
 * {@link #selectionColumn} config within your gridmultiselection definition. You might modify
 * the {@link #selectionColumn} in order to:
 *
 * + Change column width
 * + Show the selectionColumn by default
 * + Change the default cls or cellCls
 * + Etc.
 *
 * Here's an example that modifies the {@link #selectionColumn}:
 *
 *     Ext.define('MyApp.view.SelectableGrid', {
 *        extend: 'Ext.grid.Grid',
 *
 *        plugins: {
 *            type: 'gridmultiselection',
 *
 *            selectionColumn: {
 *                width:100  // Change column width from the default of 60px
 *            }
 *        }
 *
 *        title: 'My Title',
 *
 *        store: store
 *        columns: [
 *            // columns
 *        ]
 *     );
 */
Ext.define('Ext.grid.plugin.MultiSelection', {
    extend: 'Ext.Component',
    alias: 'plugin.gridmultiselection',

    config: {
        /**
         * @private
         */
        grid: null,

        /**
         * The default settings for the selection column.  You may create your
         * own selectionColumn config within your plugin object in order to:
         *
         * + Change column width
         * + Show the selectionColumn by default
         * + Change the default cls or cellCls
         * + Etc.
         */
        selectionColumn: {
            width: 60,
            xtype: 'column',
            cls: Ext.baseCSSPrefix + 'grid-multiselection-column',
            cell: {
                cls: Ext.baseCSSPrefix + 'grid-multiselection-cell'
            },
            ignore: true,
            hidden: true
        },

        /**
         * Determines whether or not the trigger button is show when the grid is loaded.
         * This most commonly be set to false if you wanted to have the selectionColumn
         * shown 100% of the time instead of hidden by default. You could show the {@link #selectionColumn}
         * by modifying its hidden value to be false.
         */
        useTriggerButton: true,

        /**
         * The text of the button used to display the {@link #selectionColumn}.
         */
        triggerText: 'Select',

        /**
         * The text of the button used to cancel the {@link #selectionColumn}.
         */
        cancelText: 'Cancel',

        /**
         * The text of the button used to delete selected rows.
         */
        deleteText: 'Delete'
    },

    init: function(grid) {
        this.setGrid(grid);

        var titleBar = grid.getTitleBar();
        if (this.getUseTriggerButton() && titleBar) {
            this.triggerButton = titleBar.add({
                align: 'right',
                xtype: 'button',
                text: this.getTriggerText()
            });

            this.triggerButton.on({
                tap: 'onTriggerButtonTap',
                scope: this
            });
        }

        grid.getHeaderContainer().on({
            columntap: 'onColumnTap',
            scope: this
        });
    },

    onTriggerButtonTap: function() {
        if (this.getSelectionColumn().isHidden()) {
            this.enterSelectionMode();
        }
        else {
            this.deleteSelectedRecords();
            this.getGrid().deselectAll();
        }
    },

    onColumnTap: function(container, column) {
        var grid = this.getGrid();
        if (column === this.getSelectionColumn()) {
            if (grid.getSelectionCount() === grid.getStore().getCount()) {
                grid.deselectAll();
            } else {
                grid.selectAll();
            }
        }
    },

    enterSelectionMode: function() {
        this.triggerButton.setText(this.getDeleteText());
        this.triggerButton.setUi('decline');

        this.cancelButton = this.getGrid().getTitleBar().add({
            align: 'right',
            xtype: 'button',
            ui: 'action',
            text: this.getCancelText(),
            scope: this
        });
        this.cancelButton.on({
            tap: 'exitSelectionMode',
            scope: this
        });
        this.getSelectionColumn().show();

        this.getGrid().setMode('MULTI');
    },

    exitSelectionMode: function() {
        this.cancelButton.destroy();
        this.triggerButton.setText(this.getTriggerText());
        this.triggerButton.setUi(null);
        this.getSelectionColumn().hide();
        this.getGrid().setMode('SINGLE');
        this.getGrid().deselectAll();
    },

    deleteSelectedRecords: function() {
        this.getGrid().getStore().remove(this.getGrid().getSelection());
    },

    applySelectionColumn: function(column) {
        if (column && !column.isComponent) {
            column = Ext.factory(column, Ext.grid.Column);
        }
        return column;
    },

    updateSelectionColumn: function(column, oldColumn) {
        var grid = this.getGrid();
        if (grid) {
            if (oldColumn) {
                grid.removeColumn(oldColumn);
            }

            if (column) {
                grid.insertColumn(0, column);
            }
        }
    },

    onGridSelectionChange: function() {
        var grid = this.getGrid(),
            column = this.getSelectionColumn();

        if (grid.getSelectionCount() === grid.getStore().getCount()) {
            column.addCls(Ext.baseCSSPrefix + 'grid-multiselection-allselected');
        } else {
            column.removeCls(Ext.baseCSSPrefix + 'grid-multiselection-allselected');
        }
    },

    updateGrid: function(grid, oldGrid) {
        var delegateCls = '.' + Ext.baseCSSPrefix + 'grid-multiselectioncell';

        if (oldGrid) {
            oldGrid.removeColumn(this.getSelectionColumn());
            oldGrid.un({
                selectionchange: 'onGridSelectionChange',
                scope: this
            });
        }

        if (grid) {
            grid.insertColumn(0, this.getSelectionColumn());
            grid.on({
                selectionchange: 'onGridSelectionChange',
                scope: this
            });
        }
    }
});
