// disable the default ext.shadow in menus so that we define our own
Ext.define('MyContestTheme.menu.Menu', {
  override: 'Ext.menu.Menu',
	shadow: false
});
