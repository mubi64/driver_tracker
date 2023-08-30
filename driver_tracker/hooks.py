app_name = "driver_tracker"
app_title = "Driver Tracker"
app_publisher = "Sowaan"
app_description = "New App"
app_email = "info@sowaan.com"
app_license = "MIT"
# required_apps = []

fixtures = [
	{
        "doctype":"Custom Field",
		"filters":[
			[
				"fieldname",
                "in",
                (   
                "custom_experience", "custom_load", "custom_column_break_qrwwz", "custom_section_break_l4day", "custom_insurance_number", "custom_licence_class", "custom_id_number"
				)
			]
		]
	}
]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/driver_tracker/css/driver_tracker.css"
# app_include_js = "/assets/driver_tracker/js/driver_tracker.js"

# include js, css files in header of web template
# web_include_css = "/assets/driver_tracker/css/driver_tracker.css"
# web_include_js = "/assets/driver_tracker/js/driver_tracker.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "driver_tracker/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {"Delivery Trip" : "public/js/delivery_trip.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
#	"methods": "driver_tracker.utils.jinja_methods",
#	"filters": "driver_tracker.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "driver_tracker.install.before_install"
# after_install = "driver_tracker.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "driver_tracker.uninstall.before_uninstall"
# after_uninstall = "driver_tracker.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "driver_tracker.utils.before_app_install"
# after_app_install = "driver_tracker.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "driver_tracker.utils.before_app_uninstall"
# after_app_uninstall = "driver_tracker.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "driver_tracker.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
#	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
#	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
#	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
#	"*": {
#		"on_update": "method",
#		"on_cancel": "method",
#		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
#	"all": [
#		"driver_tracker.tasks.all"
#	],
#	"daily": [
#		"driver_tracker.tasks.daily"
#	],
#	"hourly": [
#		"driver_tracker.tasks.hourly"
#	],
#	"weekly": [
#		"driver_tracker.tasks.weekly"
#	],
#	"monthly": [
#		"driver_tracker.tasks.monthly"
#	],
# }

# Testing
# -------

# before_tests = "driver_tracker.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
#	"frappe.desk.doctype.event.event.get_events": "driver_tracker.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
#	"Task": "driver_tracker.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["driver_tracker.utils.before_request"]
# after_request = ["driver_tracker.utils.after_request"]

# Job Events
# ----------
# before_job = ["driver_tracker.utils.before_job"]
# after_job = ["driver_tracker.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
#	{
#		"doctype": "{doctype_1}",
#		"filter_by": "{filter_by}",
#		"redact_fields": ["{field_1}", "{field_2}"],
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_2}",
#		"filter_by": "{filter_by}",
#		"partial": 1,
#	},
#	{
#		"doctype": "{doctype_3}",
#		"strict": False,
#	},
#	{
#		"doctype": "{doctype_4}"
#	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
#	"driver_tracker.auth.validate"
# ]

website_route_rules = [{'from_route': '/delivery_tracker/<path:app_path>', 'to_route': 'delivery_tracker'},]