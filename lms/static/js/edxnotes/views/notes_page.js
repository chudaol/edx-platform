;(function (define, undefined) {
'use strict';
define([
    'backbone', 'js/edxnotes/collections/tabs', 'js/edxnotes/views/tabs_list',
    'js/edxnotes/views/tabs/recent_activity', 'js/edxnotes/views/tabs/search_results'
], function (
    Backbone, TabsCollection, TabsListView, RecentActivityView, SearchResultsView
) {
    var NotesPageView = Backbone.View.extend({
        initialize: function (options) {
            _.bindAll(this);
            this.options = options;

            this.tabsCollection = new TabsCollection();

            this.recentActivityView = new RecentActivityView({
                el: this.el,
                collection: this.collection,
                tabsCollection: this.tabsCollection
            });

            this.searchResultsView = new SearchResultsView({
                el: this.el,
                tabsCollection: this.tabsCollection,
                token: this.options.token,
                user: this.options.user,
                courseId: this.options.courseId,
                createTabOnInitialization: false
            });

            this.tabsView = new TabsListView({collection: this.tabsCollection});
            this.tabsView.render().$el.prependTo(this.$('.course-info'));
        }
    });

    return NotesPageView;
});
}).call(this, define || RequireJS.define);
