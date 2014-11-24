;(function (define, undefined) {
'use strict';
define([
    'gettext', 'js/edxnotes/views/tab_aggregator', 'js/edxnotes/views/subview'
], function (gettext, TabAggregatorView, SubView) {
    var RecentActivityView = TabAggregatorView.extend({

        SubViewConstructor: SubView.extend({
            id: 'edx-notes-page-recent-activity'
        }),

        tabInfo: {
            name: gettext('Recent Activity'),
            class_name: 'tab-recent-activity'
        }
    });

    return RecentActivityView;
});
}).call(this, define || RequireJS.define);
