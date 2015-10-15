// disable the default ext.shadow in boundlists so that we define our own in CSS
Ext.define('MyContestTheme.view.BoundList', {
  override: 'Ext.view.BoundList',
	shadow: false
});
