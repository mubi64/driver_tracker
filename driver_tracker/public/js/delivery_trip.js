// Copyright (c) 2017, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Delivery Trip", {
  refresh: function (frm) {
    if (
      frm.doc.docstatus == 1 &&
      frm.doc.delivery_stops.length > 0 &&
      frm.doc.status != "Completed"
    ) {
      frm.add_custom_button(__("Track Delivery"), function () {
        window.location.href = "/delivery_tracker";
      });
    }
  },
});
