if (Ext.isIE8) {
    Ext.define('Ext.theme.triton.menu.Item', {
        override: 'Ext.menu.Item',
        
        onFocus: function(e) {
            this.callParent([e]);
            this.repaintIcons();
        },
        
        onFocusLeave: function(e) {
            this.callParent([e]);
            this.repaintIcons();
        },
        
        privates: {
            repaintIcons: function() {
                var iconEl = this.iconEl,
                    arrowEl = this.arrowEl,
                    checkEl = this.checkEl;
                
                if (iconEl) {
                    iconEl.syncRepaint();
                }
                
                if (arrowEl) {
                    arrowEl.syncRepaint();
                }
                
                if (checkEl) {
                    checkEl.syncRepaint();
                }
            }
        }
    });
}
