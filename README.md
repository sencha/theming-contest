## Sencha App Theming Contest

### Requirements
* [Download Ext JS 6] (https://www.sencha.com/products/extjs/evaluate/)
* [Download Sencha Cmd 6] (https://www.sencha.com/products/extjs/cmd-download/)
* [Download Sencha Inspector Beta] (http://pages.sencha.com/Inspector-Beta.html)


### Getting started with Feed Viewer App

* Create a workspace
```
sencha -sdk {path/to/Ext-JS-SDK}  generate workspace theming-workspace
cd theming-workspace/
```
* Fork/Clone/Download Feed Viewer sample application on this github page and unzip it in theming-workspace

* Build the Feed Viewer sample application
```
cd theming-contest-master
delete directory .sencha/workspace (to use theming-workspace)
sencha app build development
```

* Start web server and watch changes

    *For feedviewer app using classic toolkit, run*
    ```
    sencha app watch classic
    ```
    *For feedviewer app using modern toolkit, run*
    ```
    sencha app watch modern
    ```

* View the Feedviewer sample app in browser with platform tag. It will show view with classic toolkit
```
http://localhost:1841/theming-contest-master/?platformTags=fashion:true
```

* To view the modern toolkit based view, in Chrome developer tools, toggle device mode icon and select mobile phone


### Connect Feed Viewer app to Sencha Inspector
Follow steps in the document:
http://docs.sencha.com/tools/sencha_inspector/inspecting_desktop_applications.html

One quick way to inspect your Feedviewer sample app is to use bookmarklet. To add bookmarklet in your browser, 
* Open Inspector app, click on the button "Quick connect an app with Bookmarklet"
* Drag the blue "Sencha Inspector bookmarklet" button to your browser bookmarks bar
* Now open feedviewer sample app in your browser and click on the bookmarklet in bookmarks bar. 
* You should see feedviewer app link in Inspector. 
* Click on the link and go to Theme tab to change Sass variables

### Create your Custom Theme

* Generate custom theme called “my-contest-theme” in theming-workspace/packages/local/my-contest-theme

```
From theming-contest-master directory
sencha generate theme my-contest-theme
```

* Extend custom theme “my-contest-theme” from "theme-triton". 
```
In theming-workspace/packages/local/my-contest-theme/package.json

"extend": "theme-triton",
```
* Use “my-contest-theme” in the feed viewer app
In the app.json file, change to "theme": "my-contest-theme". Optionally uncomment “save” to use Sencha Inspector changed Sass variables in save.json file. The resulting changes in app.json will look like
```
app.json

    "builds": {
        "classic": {
            "toolkit": "classic",
            "theme": "my-contest-theme",
            "sass": {
                "save": "classic/sass/save.json"
            }
        },

        "modern": {
            "toolkit": "modern",
            "theme": "my-contest-theme",
            "sass": {
                "save": "modern/sass/save.json"
            }
        }
    }
```
* Copy changes from the Inspector (or save.json file) to custom theme. 
```
E.g. Add component variable $base-color: #639000; in
{path/to/theming-workspace}/packages/local/my-contest-theme/sass/var/Component.scss
```
* Create unique components with Ext JS UIs (CSS mixins).

### Submit your contest entry
Send us zipped file of your workspace containing your version of the Feed Viewer sample application as well as custom themes at contest@sencha.com. Please do not include ext directory in the zipped file.  All entries must be received by September 15, 2015.


### Resources

* [Video - Getting started with theming contest] (https://vimeo.com/133395706)
* [Doc - Ext JS 6.0 theming] (http://docs.sencha.com/extjs/6.0/core_concepts/theming.html)
* [Tutorial - Ext JS 6.0 theming - Part 1] (https://www.sencha.com/blog/how-to-create-a-dark-ext-js-theme-part-1/)
* [Tutorial - Ext JS 6.0 theming - Part 2] (https://www.sencha.com/blog/how-to-create-a-dark-ext-js-theme-part-2/)

### Any Questions?
If you have any additional questions about the contest, please send those to contest forum at  [Sencha Contest Forum] (https://www.sencha.com/forum/forumdisplay.php?137-Sencha-Contests) 
