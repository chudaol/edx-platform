;(function (define, undefined) {
    'use strict';
    define(['js/edxnotes/views/subview'],
    function (SubView) {
        var RecentActivityView = SubView.extend({
            id: 'edx-notes-page-recent-activity'
        });

        return RecentActivityView;
    });
}).call(this, define || RequireJS.define);
