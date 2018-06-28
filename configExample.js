            configswitcher: {
                include: true,
                id: 'configswitcher',
                type: 'ui',
                placeAt: 'bottom-right',
                position: 30,
                path: 'gis/dijit/Widgets/ConfigSwitcher',
                options: //'config/configSwitcherList'
                    {
                        map: false, // needs a reference to the map
                        mode: 'custom', // mut be either 'agol' or 'custom'
                        mapStartConfig: 'base',
                        configsToShow: ['base', 'ESRI'],
                        // define all valid cmv configurations here.
                        configurations: {
                            //examples of cmv configurations
                            base: {
                                title: 'My Base App',
                                details:  {
                                    id: 'something', 
                                    name: 'other', 
                                    configValue: ''
                                }
                            },            
                            ESRI: {
                                title: 'map with ESRI Basemaps',
                                details: {
                                    id: 'uyososo', 
                                    name: 'othershshs',
                                    configValue: '?config=esriConfig'
                                }
                            }  
                        }
                    }               
            }     
