var require = {
    /* The baseURL is overridden when using RequireJS optimizer,
    * but is necessary for local development.
    */
    baseUrl: "/static/",
    waitSeconds: 60,
    paths: {
        'gettext': '/i18n',
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
            deps: ['jquery'],
            exports: '_'
        },

        'underscore.string': {
            deps: ['underscore'],
            exports: '_.string'
        }
    }
};
