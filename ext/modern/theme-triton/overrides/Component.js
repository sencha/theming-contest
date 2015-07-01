Ext.define('Ext.theme.triton.Component', {
    override: 'Ext.Component'
}, function() {
    Ext.namespace('Ext.theme.is').Triton = true;
    Ext.theme.name = 'Triton';

    Ext.theme.getDocCls = function() {
        return Ext.platformTags.phone ? 'x-big' : '';
    };
});
