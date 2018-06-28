define([
    'dojo/_base/declare',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dijit/_WidgetsInTemplateMixin',

    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/topic',

    'dijit/DropDownMenu',
    'dijit/MenuItem',

    'dojo/text!./ConfigSwitcher/templates/ConfigSwitcher.html',
    'dojo/i18n!./ConfigSwitcher/nls/resource',

    'dijit/form/DropDownButton',
    'xstyle/css!./ConfigSwitcher/css/ConfigSwitcher.css'
], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,

    lang,
    array,
    topic,

    DropDownMenu,
    MenuItem,

    template,
    i18n
) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        widgetsInTemplate: true,
        i18n: i18n,
        title: i18n.title,
        baseClass: 'configSwitcherWidg',
        configurations: {},
        currentConfig: null,
        mapStartConfig: null,
        configsToShow: null,


        postCreate: function () {
            this.inherited(arguments);
            this.initializeConfigs();
            topic.subscribe('configswitcher/updateConfig', lang.hitch(this, 'updateConfig'));
        },

        initializeConfigs: function () {
            console.log(this.configsToShow);
            console.log(this.mapStartConfig);   
            this.buildMenu();            
        },


        buildMenu: function () {
            this.menu = new DropDownMenu({
                style: 'display: none;'
            });
            array.forEach(this.configsToShow, function (config) {
                var somedealio = {};
                console.log(config, this.configurations);
                if (this.configurations.hasOwnProperty(config)) {
                    console.log(this.configurations[config]);
                    somedealio.name = config;
                    somedealio.config = this.configurations[config];
                    console.log(somedealio);
                    var menuItem = new MenuItem({
                        id: config,
                        label: this.configurations[config].title,
                        iconClass: (config === this.mapStartConfig) ? 'selectedIcon' : 'emptyIcon',
                        onClick: lang.hitch(this, 'updateConfig', somedealio  )
                    });
                    this.menu.addChild(menuItem);
                }
            }, this);
            this.dropDownButton.set('dropDown', this.menu);
            this.setStartingConfigs();
        },

        setStartingConfigs: function () {
            //set current config
            var curWindLoc = null; // window.location.href.split('?config=')[1];

            if (window.location.href.indexOf('?config=') > -1 ){
                curWindLoc = window.location.href.split('?config=')[1];
            } else {
                curWindLoc = '';
            }
            console.log(curWindLoc);
            console.log(this.mapStartConfig);
            console.log(this.configurations);
//            array.forEach(this.configurations,  function (item, index) {
//                console.log(index);
//            });
            for (var eachConfig in this.configurations) {
                console.log(this.configurations[eachConfig]);
                if ( curWindLoc === this.configurations[eachConfig].details.configValue.replace('?config=', '') ) {
                    this.currentConfig = eachConfig;    
                }
            }
            console.log(this.mapStartConfig, this.currentConfig);
            
            if (this.mapStartConfig != this.currentConfig) { 
                this.updateConfig(this.mapStartConfig);
            }
        },

        updateConfig: function (config) {
            console.log('heellllooooo?');
            var newpath = null;
            console.log(config, this.currentConfig);
            if (config.name !== this.currentConfig && (array.indexOf(this.configsToShow, config.name) !== -1)  && this.currentConfig != null) {
                console.log(config.config.details.configValue);
                if (config.config.details.configValue === '') {
                    newpath = window.location.href.split('?config=')[0];
                    window.location =  newpath;
                } else {
                    window.location =  config.config.details.configValue;
                }
                
                
                this.currentConfig = config;
                var ch = this.menu.getChildren();
                console.log(ch);
                array.forEach(ch, function (c) {
                    console.log(c);
                    if (c.id === config) {
                        c.set('iconClass', 'selectedIcon');
                    } else {
                        c.set('iconClass', 'emptyIcon');
                    }
                });
            }
        }
    });
});
