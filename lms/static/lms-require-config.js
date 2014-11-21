var require = {
    waitSeconds: 60,
    paths: {
        'gettext': '/i18n'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        'gettext': {
            exports: 'gettext'
        },

        'jquery': {
            exports: 'jQuery'
        },

        'jquery.cookie': {
            deps: ['jquery'],
            exports: 'jQuery.fn.cookie'
        },

        'underscore': {
            exports: '_'
        },
    }
};
