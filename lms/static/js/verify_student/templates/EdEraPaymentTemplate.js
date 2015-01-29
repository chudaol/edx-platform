;
(function (define, undefined) {
  define(["underscore"], function (_) {
    var html, contribution, title, subtitle, liqPay;

    title = '<h3>Ви реєструєтеся на курс <%=course_num%> <%=course_name%></h3>';

    subtitle = '<h4>EdEra – освітній проект з соціальною місією – зробити освіту якісною та доступною. ' +
    'Платний запис, на наш погляд, – важливий аспект мотивації та відповідальності. ' +
    'Розуміючи, що потрібно поєднати доступність і цінову політику, ми ввели систему оплати, опираючись на довіру до користувачів нашого проекту.' +
    '</h4>'

    contribution = '<div class="contribution"></div>';

    liqPay = '<form id="pay_form" method="post" action="<%=purchase_endpoint%>">' +
    '<input type="hidden" name="csrfmiddlewaretoken" value="<%=csrf_token %>">' +
    '<input type="hidden" name="course_id" value="<%=course_id%>" />' +
    '<input class="action-primary" type="button" id="pay_button" value="Оплатити зараз!" name="payment">' +
    '</form>';

    html = title + contribution + liqPay;
    return _.template(html);
  });
}).call(this, define || RequireJS.define);