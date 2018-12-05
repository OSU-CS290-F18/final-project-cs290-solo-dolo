(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['addNotePost'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"post\">\r\n  <label>"
    + alias4(((helper = (helper = helpers.noteText || (depth0 != null ? depth0.noteText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"noteText","hash":{},"data":data}) : helper)))
    + "</label>\r\n  <div class=\"date\">\r\n    <label>"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</label>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();