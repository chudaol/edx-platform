;
(function (define, undefined) {
  define(["underscore"], function (_) {
    var html, contribution, title, liqPay;

    title = '<h3>Ви реєструєтеся на курс <%=course_num%> <%=course_name%></h3>';

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