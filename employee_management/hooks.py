# -*- coding: utf-8 -*-
from __future__ import unicode_literals

app_name = "employee_management"
app_title = "Employee Management"
app_publisher = "Wayzon Tech"
app_description = "App for Employee Management"
app_icon = "#icon-book"
app_color = "#589494"
app_email = "info@frappe.io"
app_version = "0.0.1"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/employee_management/css/employee_management.css"
# app_include_js = "/assets/employee_management/js/employee_management.js"

# include js, css files in header of web template
# web_include_css = "/assets/employee_management/css/employee_management.css"
# web_include_js = "/assets/employee_management/js/employee_management.js"

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

# Installation
# ------------

# before_install = "employee_management.install.before_install"
# after_install = "employee_management.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "employee_management.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"employee_management.tasks.all"
# 	],
# 	"daily": [
# 		"employee_management.tasks.daily"
# 	],
# 	"hourly": [
# 		"employee_management.tasks.hourly"
# 	],
# 	"weekly": [
# 		"employee_management.tasks.weekly"
# 	]
# 	"monthly": [
# 		"employee_management.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "employee_management.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "employee_management.event.get_events"
# }

