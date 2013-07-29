window.Conan = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Conan.appRouter = new Conan.Routers.AppRouter();

    Backbone.View.prototype.goTo = function (loc) {
      Conan.appRouter.navigate(loc, true);
    };

    Backbone.View.prototype.renderNested = function( view, selector ) {
      var $el = (selector instanceof $) ? selector : this.$( selector );
      view.setElement($el).render();
    };

    // Hack to make backbone handle different querystrings (xxx?yyy=xxx) as different queries
    window.addEventListener("popstate", function(e) {
      Conan.appRouter.navigate(location.pathname + location.search, {trigger:true, replace: true});
    });

    Backbone.history.start({
      pushState: true,
      hashChange: false
    });
  }
};

$(document).ready(function(){
  Conan.initialize();

  // configure moment & i18n to the selected locale
  var defaultLocale = 'es';
  var locale = $('html').attr('lang') || defaultLocale;
  moment.lang(locale);
  I18n.defaultLocale = defaultLocale;
  I18n.locale        = locale;
  I18n.fallbacks     = true;

  $('[data-role="tab"], [data-role="pill"]').each(function(){
    new Conan.Views.TabsView({el: this}).delegateEvents();

    if(!location.search) {
      var activeTabId = $(this).find('.tab-pane.active').first().attr('id');
      var search = "?tab=" + activeTabId;
      Conan.appRouter.navigate(location.pathname + search, {trigger:false, replace: true});
    }
  });

  $('[data-view="CommentsView"]').each(function(){
    new Conan.Views.CommentsView({el: this}).parse();
    document.getElementById('comments-end').scrollIntoView();
  });

  $('.js-scenes-view').each(function(){
    new Conan.Views.ScenesView({el: this}).parse();
  });
});