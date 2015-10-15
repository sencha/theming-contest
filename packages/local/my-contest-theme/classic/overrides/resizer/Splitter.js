// ensure that the defualt splitters are only
// 1px high (vertical) or 1px wide (horizontal)
Ext.define('MyContestTheme.resizer.Splitter', {
  override: 'Ext.resizer.Splitter',
	width: 1,
  height: 1
});
