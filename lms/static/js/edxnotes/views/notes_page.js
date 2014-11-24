;(function (define, undefined) {
'use strict';
define([
    'backbone',
    'js/edxnotes/collections/tabs', 'js/edxnotes/views/tabs',
    'js/edxnotes/views/tabs/recent_activity', 'js/edxnotes/views/tabs/search_results'
], function (
    Backbone, TabsCollection, TabsView, RecentActivityView, SearchResultsView
) {
    var NotesPageView = Backbone.View.extend({
        initialize: function (options) {
            _.bindAll(this);
            this.options = options;

            this.tabsCollection = new TabsCollection();

            new RecentActivityView({
                el: $('.edx-notes-page-wrapper').get(0),
                collection: this.collection,
                tabsCollection: this.tabsCollection
            });

            new SearchResultsView({
                el: $('.edx-notes-page-wrapper').get(0),
                tabsCollection: this.tabsCollection,
                token: this.options.authToken,
                user: this.options.user,
                courseId: this.options.courseId,
                createTabOnInitialization: false
            });

            this.tabsView = new TabsView({collection: this.tabsCollection});
            this.tabsView.render().$el.prependTo(this.$('.course-info'));
        }
    });

    return NotesPageView;
});
}).call(this, define || RequireJS.define);
