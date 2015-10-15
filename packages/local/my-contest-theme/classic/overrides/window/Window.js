// disable the default ext.shadow in windows so that we define our own in CSS
Ext.define('MyContestTheme.window.Window', {
  override: 'Ext.window.Window',
	shadow: false
});
