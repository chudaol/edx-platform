;(function (define, undefined) {
    'use strict';
    define(['js/edxnotes/views/subview'],
    function (SubView) {
        var SearchResultsView = SubView.extend({
            id: 'edx-notes-page-search-results'
        });

        return SearchResultsView;
    });
}).call(this, define || RequireJS.define);
