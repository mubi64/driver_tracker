import frappe


@frappe.whitelist()
def get_panding_order(date):
    trip_names = frappe.get_all("Delivery Trip", filters={
        "docstatus": 1,
        "status": ["!=", "Completed"],
        "departure_time": ["between", [date, date]]
    }, pluck="name")

    return [frappe.get_cached_doc("Delivery Trip", name) for name in trip_names]

@frappe.whitelist()
def get_complete_order(date=None):
    filters=[
        ["docstatus", "=", 1],
        ["status", "=", "Completed"],
    ]
    if date:
        filters.append(["departure_time", "between", [date, date]])
    print("Hello \n\n\n\n")
    trip_names = frappe.get_all("Delivery Trip", filters=filters, pluck="name")

    return [frappe.get_cached_doc("Delivery Trip", name) for name in trip_names]

@frappe.whitelist()
def get_employee_info():
    roles =  frappe.get_roles()
    if ("Employee" in roles) == False:
        raise Exception("You are not allowed to login")

    employees = frappe.db.get_all(
        "Employee",
        filters={
            "user_id": frappe.session.user,
            "status": "Active",
        },
        fields=["name"]
    )
    
    employee = {}
    if len(employees) > 0:
        employee = frappe.get_doc(
            "Employee", employees[0]["name"]
        )
    return employee