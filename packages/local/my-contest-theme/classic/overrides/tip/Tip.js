// disable the default ext.shadow in menus so that we define our own in CSS
Ext.define('MyContestTheme.tip.Tip', {
  override: 'Ext.tip.Tip',
	shadow: false
});
