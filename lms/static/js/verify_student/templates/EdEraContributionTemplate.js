;
(function (define, undefined) {
    define(["underscore"], function (_) {
        var html, decision;

        decision = '<div class="decision">Ви вирішили оплатити <span class="chosen_price" data-chosen="<%=chosen_price%>"><%=chosen_price%></span> гривень.</div>';

        html = '<div class="contributions-row"></div>' +
                decision;

        return _.template(html);
    });
}).call(this, define || RequireJS.define);