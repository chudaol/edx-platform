;(function (define, undefined) {
'use strict';
define([
    'jquery', 'underscore', 'backbone', 'js/edxnotes/views/tab_aggregator',
    'js/edxnotes/views/subview'
], function ($, _, Backbone, TabAggregatorView, SubView) {
    var RecentActivityView = TabAggregatorView.extend({

        SubViewConstructor: SubView.extend({
            id: 'edx-notes-page-recent-activity'
        }),

        tabInfo: {
            name: gettext('Recent Activity'),
            class_name: 'tab-recent-activity'
        },

        getCollection: function () {
            return this.collection;
        }
    });

    return RecentActivityView;
});
}).call(this, define || RequireJS.define);
