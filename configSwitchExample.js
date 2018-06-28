            configSwitch: {
                include: true,
                id: 'configSwitch',
                //type: 'titlePane',
                type: 'domNode',
                srcNodeRef: 'configSwitcher',
                path: 'gis/dijit/ConfigSwitch',
                title: 'Switch Config',
                options: {
                    configs: [
                        {
                            label: 'Config 1',
                            src: 'viewer'
                        },
                        {
                            label: 'Config 2',
                            src: 'config2'
                        }
                    ]
                }
            }
        }
