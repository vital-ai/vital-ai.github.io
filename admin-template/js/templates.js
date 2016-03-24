this["JST"] = this["JST"] || {};

this["JST"]["templates/add-customer.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"box\">\n                <div class=\"box-header\">\n                  <h3 class=\"box-title\">Add New Customer</h3><hr>\n                </div><!-- /.box-header -->\n                <div class=\"box-body no-padding\">\n         <div class=\"col-sm-6 col-sm-offset-3\">\n                  <form>\n  <div class=\"form-group\">\n    <label for=\"exampleCustomerID\">Customer ID</label>\n    <input type=\"text\" class=\"form-control\" id=\"CustomerID\" placeholder=\"ID\">\n  </div>\n  <div class=\"form-group\">\n    <label for=\"usr\">Customer Name</label>\n    <input type=\"text\" class=\"form-control\" id=\"usr\" placeholder=\"Name\">\n  </div>\n \n  <div class=\"checkbox\">\n    <label>\n      <input type=\"checkbox\"> Locked\n    </label>\n  </div>\n<div class=\"checkbox\">\n    <label>\n      <input type=\"checkbox\"> Create Braintree Account\n    </label>\n  </div>\n  <div class=\"checkbox\">\n    <label>\n      <input type=\"checkbox\"> Test Account\n    </label>\n  </div>\n    <div class=\"form-group\">\n    <label for=\"usr\">Business Name</label>\n    <input type=\"text\" class=\"form-control\" id=\"usr\" placeholder=\"Name\">\n  </div>\n<div class=\"form-group\">\n    <label for=\"text\">Business Category</label>\n    <input type=\"text\" class=\"form-control\" id=\"text\" placeholder=\"Category\">\n  </div>\n<div class=\"form-group\">\n    <label for=\"text\">Business URL</label>\n    <input type=\"url\" class=\"form-control\" id=\"url\" placeholder=\"URL\">\n  </div>\n<div class=\"form-group\">\n    <label for=\"text\">Mobile Phone</label>\n    <input type=\"text\" class=\"form-control\" id=\"text\" placeholder=\"Number\">\n  </div>\n<div class=\"form-group\">\n    <label for=\"text\">Telephone</label>\n    <input type=\"text\" class=\"form-control\" id=\"text\" placeholder=\"Number\">\n  </div>\n <center><button type=\"submit\" class=\"btn btn-default\">Cancel</button>&nbsp;&nbsp;&nbsp;\n     <button type=\"submit\" class=\"btn btn-primary\">Add</button>\n</form></center>\n                <br>\n                </div><!-- /.box-body -->\n                    </div>\n              </div><!-- /.box -->";
},"useData":true});

this["JST"]["templates/contentheader.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "   <!-- Content Header (Page header) -->\n        <section class=\"content-header\">\n          <h1>\n            "
    + alias4(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"header","hash":{},"data":data}) : helper)))
    + "\n            <small>"
    + alias4(((helper = (helper = helpers.subheader || (depth0 != null ? depth0.subheader : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subheader","hash":{},"data":data}) : helper)))
    + "</small>\n          </h1>\n          <ol class=\"breadcrumb\">\n            <li><a href=\"#\"><i class=\"fa fa-home\"></i>"
    + alias4(((helper = (helper = helpers.directory1 || (depth0 != null ? depth0.directory1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"directory1","hash":{},"data":data}) : helper)))
    + "</a></li>\n              <li><a href=\"#\">"
    + alias4(((helper = (helper = helpers.directory2 || (depth0 != null ? depth0.directory2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"directory2","hash":{},"data":data}) : helper)))
    + "</a></li>\n            <li class=\"active\">"
    + alias4(((helper = (helper = helpers.directory3 || (depth0 != null ? depth0.directory3 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"directory3","hash":{},"data":data}) : helper)))
    + "</li>\n          </ol>\n        </section>";
},"useData":true});

this["JST"]["templates/customertable.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr>\n                    \n                      <td>"
    + alias4(((helper = (helper = helpers.index || (depth0 != null ? depth0.index : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "</td>\n                      <td>"
    + alias4(((helper = (helper = helpers.name1 || (depth0 != null ? depth0.name1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name1","hash":{},"data":data}) : helper)))
    + "</td>\n                      <td>"
    + alias4(((helper = (helper = helpers.name2 || (depth0 != null ? depth0.name2 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name2","hash":{},"data":data}) : helper)))
    + "</td>\n                    <td>"
    + alias4(((helper = (helper = helpers.status || (depth0 != null ? depth0.status : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"status","hash":{},"data":data}) : helper)))
    + "</td>\n                        <td><button type=\"button\" class=\"btn btn-warning\">Lock</button>&nbsp;\n<button type=\"button\" class=\"btn btn-secondary\">Retire</button>&nbsp;\n<button type=\"button\" class=\"btn btn-danger\">Danger</button>&nbsp;\n            <button type=\"button\" class=\"btn btn-info\">Details</button></td>\n                    </tr>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"box\">\n                <div class=\"box-header\">\n                  <h3 class=\"box-title\">Customers</h3>\n                </div><!-- /.box-header -->\n                <div class=\"box-body no-padding\">\n                    <div class=\"col-lg-6\" style=\"float:left\">\n    <div class=\"input-group\">\n      <input type=\"text\" class=\"form-control\" placeholder=\"Search\">\n      <span class=\"input-group-btn\">\n        <button class=\"btn btn-default\" type=\"button\"><i class=\"fa fa-search\"></i></button>\n      </span>\n    </div><!-- /input-group -->\n  </div><!-- /.col-lg-6 -->\n<br><br><br>\n         \n                  <table class=\"table table-striped\">\n                    <tr>\n                      <th style=\"width: 10px\">Index</th>\n                      <th>ID</th>\n                      <th>Name</th>\n                      <th style=\"width: 40px\">Status</th>\n                        <th></th>\n                    </tr>\n                    "
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n                    \n                  </table>\n                 <hr>\n                    <center><ul class=\"pagination pagination-sm no-margin\">\n                      <li><a href=\"#\">&laquo;</a></li>\n                      <li><a href=\"#\">1</a></li>\n                      <li><a href=\"#\">2</a></li>\n                      <li><a href=\"#\">3</a></li>\n                      <li><a href=\"#\">&raquo;</a></li>\n                    </ul></center><br>\n                   \n                </div><!-- /.box-body -->\n              </div><!-- /.box -->";
},"useData":true});

this["JST"]["templates/footer.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "   <footer class=\"main-footer\">\n       <center> <strong>Copyright &copy; 2016 <a href=\"http://haley.ai\">Haley.ai</a>.</strong></center>\n      </footer>";
},"useData":true});

this["JST"]["templates/leftnavigation.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<!-- Left side column. contains the logo and sidebar -->\n      <aside class=\"main-sidebar\">\n        <!-- sidebar: style can be found in sidebar.less -->\n        <section class=\"sidebar\">\n          <!-- Sidebar user panel -->\n          <!-- /.search form -->\n          <!-- sidebar menu: : style can be found in sidebar.less -->\n          <ul class=\"sidebar-menu\">\n            <li class=\"header\">ADMIN</li>\n           \n              <a href=\"#\">\n                <li class=\"active\"> <i class=\"fa fa-home\"></i> <span>Home</span>\n                </a></li>\n      \n           \n            <li class=\"treeview\">\n              <a href=\"customers.html\">\n               <i class=\"fa fa-users\"></i>\n                <span>Customers</span>\n                <i class=\"fa fa-angle-left pull-right\"></i>\n              </a>\n              <ul class=\"treeview-menu\">\n                <li><a href=\"add-customer.html\"><i class=\"fa fa-plus\"></i>Add Customer</a></li>\n              \n              </ul>\n            </li>\n           <li class=\"treeview\">\n              <a href=\"#\">\n                <i class=\"fa fa-cube\"></i>\n                <span>Products</span>\n                <i class=\"fa fa-angle-left pull-right\"></i>\n              </a>\n              <ul class=\"treeview-menu\">\n                <li><a href=\"pages/layout/top-nav.html\"><i class=\"fa fa-plus\"></i>Add Product</a></li>\n              \n              </ul>\n            </li>\n            <li class=\"treeview\">\n              <a href=\"#\">\n                <i class=\"fa fa-edit\"></i>\n                <span>Service Contracts</span>\n              </a>\n            </li>\n            <li class=\"treeview\">\n              <a href=\"#\">\n                <i class=\"fa fa-book\"></i>\n                <span>Invoices</span>\n              </a>\n            </li>\n            <li class=\"treeview\">\n              <a href=\"#\">\n                <i class=\"fa fa-edit\"></i> <span>Invitation Requests</span>\n                <i class=\"fa fa-angle-left pull-right\"></i>\n              </a>\n              <ul class=\"treeview-menu\">\n                <li><a href=\"pages/forms/general.html\"><i class=\"fa fa-plus\"></i>Add Invitation</a></li>\n              </ul>\n            </li>\n            <li class=\"treeview\">\n              <a href=\"#\">\n                <i class=\"fa fa-comment\"></i> <span>Admin Services</span>\n              </a>\n            </li>\n            <li>\n              <a href=\"pages/calendar.html\">\n                <i class=\"fa fa-user\"></i> <span>Admin</span>\n                <i class=\"fa fa-angle-left pull-right\"></i>\n              </a>\n                <ul class=\"treeview-menu\">\n                <li><a href=\"pages/forms/general.html\"><i class=\"fa fa-plus\"></i>Add Admin</a></li>\n              </ul>\n            </li>\n             <li>\n              <a href=\"pages/mailbox/mailbox.html\">\n                <i class=\"fa fa-bar-chart\"></i> <span>Predictive Models</span>\n                  <i class=\"fa fa-angle-left pull-right\"></i>\n              </a>\n                 <ul class=\"treeview-menu\">\n                <li><a href=\"pages/forms/general.html\"><i class=\"fa fa-circle-o\"></i>Load Model</a></li>\n              </ul>\n            </li>\n            <li>\n              <a href=\"pages/mailbox/mailbox.html\">\n                <i class=\"fa fa-file-text\"></i> <span>Files</span>\n                <i class=\"fa fa-angle-left pull-right\"></i>\n              </a>\n                <ul class=\"treeview-menu\">\n                <li><a href=\"pages/forms/general.html\"><i class=\"fa fa-circle-o\"></i>Enron</a></li>\n                    <li><a href=\"pages/forms/general.html\"><i class=\"fa fa-circle-o\"></i>Commerce</a></li>\n                    <li><a href=\"pages/forms/general.html\"><i class=\"fa fa-circle-o\"></i>Commerce Admin</a></li>\n                    <li><a href=\"pages/forms/general.html\"><i class=\"fa fa-circle-o\"></i>Test App</a></li>\n              </ul>\n            </li>\n             <li>\n              <a href=\"pages/mailbox/mailbox.html\">\n                <i class=\"fa fa-wrench\"></i> <span>Vital Service</span>\n                <i class=\"fa fa-angle-left pull-right\"></i>\n              </a>\n                 <ul class=\"treeview-menu\">\n                <li><a href=\"pages/forms/general.html\"><i class=\"fa fa-plus\"></i>Add App</a></li>\n                     <li><a href=\"pages/forms/general.html\"><i class=\"fa fa-plus\"></i>Add VitalService / Database</a></li>\n              </ul>\n                 \n            </li>\n             <li>\n              <a href=\"#\">\n                <i class=\"fa fa-file-code-o\"></i> <span>Datascripts</span>\n              </a>\n            </li>\n             <li>\n              <a href=\"#\">\n                <i class=\"fa fa-server\"></i> <span>Domain Models</span>\n              </a>\n            </li>\n  \n     \n          </ul>\n        </section>\n        <!-- /.sidebar -->\n      </aside>";
},"useData":true});

this["JST"]["templates/topheader.hbs"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "\n\n<header class=\"main-header\">\n\n        <!-- Header Navbar: style can be found in header.less -->\n        <nav class=\"navbar navbar-static-top\" role=\"navigation\">\n            \n          <!-- Sidebar toggle button-->\n          <a href=\"#\" class=\"sidebar-toggle\" data-toggle=\"offcanvas\" role=\"button\">\n            <span class=\"sr-only\">Toggle navigation</span>\n          </a>\n        \n            <a href=\"#\" class=\"navbar-brand\"><img src=\"img/vitalai_offwhite.png\" width=\"100px\"></a>\n            \n     <!-- Collect the nav links, forms, and other content for toggling -->\n            <div class=\"collapse navbar-collapse pull-left\" id=\"navbar-collapse\">\n              <ul class=\"nav navbar-nav\">\n                  \n                  <li class=\"active\"><a href=\"#\">Admin<span class=\"sr-only\">(current)</span></a></li>\n                  \n                \n              </ul>\n            \n            </div><!-- /.navbar-collapse -->          \n            \n            \n          <!-- Navbar Right Menu -->\n          <div class=\"navbar-custom-menu\">\n            <ul class=\"nav navbar-nav\">\n              <!-- Messages: style can be found in dropdown.less-->\n              <li class=\"dropdown messages-menu\">\n                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                  <i class=\"fa fa-key\"></i>\n                  \n                </a>\n                <ul class=\"dropdown-menu\">\n                  <li class=\"header\">Admin Keys</li>\n                  <li>\n                    <!-- inner menu: contains the actual data -->\n                    <ul class=\"menu\">\n                      <li><!-- start message -->\n                          <div class=\"col-sm-10\" \"col-sm-offset-1\">\n                        <div class=\"form-group\"><br>\n    <label for=\"usr\">Admin Key Code</label>\n    <input type=\"text\" class=\"form-control\" id=\"text\" placeholder=\"Code\">\n                      <br>      <button type=\"submit\" class=\"btn btn-default\">Delete</button>&nbsp;&nbsp;&nbsp;\n     <button type=\"submit\" class=\"btn btn-primary\">Save</button>\n  </div>\n                          </div>\n                      </li><!-- end message -->\n                    </ul>\n                  </li>\n                </ul>\n              </li>\n\n              <!-- User Account: style can be found in dropdown.less -->\n              <li class=\"dropdown user user-menu\">\n                <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\n                  <img src=\"img/user.png\" class=\"user-image\" alt=\"User Image\">\n                  <span class=\"hidden-xs\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span>\n                    \n                </a>\n                <ul class=\"dropdown-menu\">\n                  <!-- User image -->\n                  <li class=\"user-header\">\n                    <img src=\"img/user.png\" class=\"img-circle\" alt=\"User Image\">\n                    <p>\n                      "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\n                    </p>\n                      \n                  </li>\n        \n                  <!-- Menu Footer-->\n                  <li class=\"user-footer\">\n                   \n                    <div class=\"row\" align=\"center\">\n                      <a href=\"#\" class=\"btn btn-default btn-flat\">Sign out</a>\n                    </div>\n                  </li>\n                </ul>\n              </li>\n                \n            </ul>\n          </div>\n\n        </nav>\n      </header>";
},"useData":true});