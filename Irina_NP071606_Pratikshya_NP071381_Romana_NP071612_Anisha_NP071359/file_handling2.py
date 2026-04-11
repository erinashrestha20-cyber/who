# Irina_Pratikshya_Romana_Anisha
# NP071606_NP071381_NP071612_NP071359

import os
from datetime import datetime
from getpass import getpass

# ------------------ File Constants ------------------
USERS_FILE = "users.txt"
REPORTS_FILE = "reports.txt"
TASKS_FILE = "tasks.txt"
SUGGESTIONS_FILE = "suggestions.txt"
ENQUIRIES_FILE = "enquiries.txt"
LOG_FILE = "audit_log.txt"

# ------------------ Utility ------------------
def log_record(message):
    """Log actions with timestamp"""
    with open(LOG_FILE, "a") as file:
        file.write(f"{datetime.now()} - {message}\n")

def _append_to_file(filename, line):
    with open(filename, "a") as file:
        file.write(line + "\n")

def _read_file(filename):
    if not os.path.exists(filename):
        return []
    with open(filename, "r") as file:
        return [line.strip() for line in file if line.strip()]

# ------------------ Boss Handling ------------------
def add_boss():
    """Add a new Boss profile to users.txt"""
    import os

    USERS_FILE = "users.txt"

    name = input("Enter boss name: ").strip()
    boss_id = input("Enter boss ID: ").strip()
    password = input("Set boss password: ").strip()
    email = input("Enter boss email: ").strip()

    # Ensure file exists
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, "w") as f:
            pass

    # Append new boss entry
    with open(USERS_FILE, "a") as f:
        f.write(f"{name},{boss_id},{password},Boss,{email}\n")

    print(f"\n✅ Boss {name} added successfully with ID {boss_id}.")
    log_record(f"New boss added: {name} (ID: {boss_id})")

# ------------------ User Handling ------------------
def add_user():
    name = input("Enter name: ")
    user_id = input("Enter ID: ")
    password = input("Enter password: ")
    email = input("Enter your email:")
    role = input("Enter role (Boss/Manager/Employee): ")
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    line = f"{name},{user_id},{password},{role}"
    _append_to_file(USERS_FILE, line)
    log_record(f"User added: {name} ({role})")

def change_password(user_id):
    try:
        lines = _read_file(USERS_FILE)
        updated = False
        with open(USERS_FILE, "w") as file:
            for line in lines:
                parts = [p.strip() for p in line.split(",")]
                if len(parts) < 4:
                    file.write(line + "\n")
                    continue
                name, uid, password, role = parts[:4]
                if uid == user_id:
                    old_password = getpass("Enter old password: ")
                    if old_password != password:
                        print("\n❌ Old password does not match.")
                        file.write(line + "\n")
                        continue
                    new_password = getpass("Enter new password: ")
                    confirm_password = getpass("Confirm new password: ")
                    if new_password == confirm_password:
                        file.write(f"{name},{uid},{new_password},{role}\n")
                        print("\n✅ Password updated successfully!")
                        log_record(f"Password reset for {role} ID {uid}")
                        updated = True
                    else:
                        print("\n❌ Passwords do not match.")
                        file.write(line + "\n")
                else:
                    file.write(line + "\n")
        if not updated:
            print("\n⚠️ Password reset failed.")
    except FileNotFoundError:
        print("users.txt not found. Cannot reset password.")

def edit_profile(user_id, role):
    """Interactive profile editing"""
    print("\n--- Edit Profile ---")
    print("1. Change Name")
    print("2. Change Email")
    print("3. Change Password")
    print("4. Back")

    choice = input("Enter choice: ")

    lines = []
    with open(USERS_FILE, "r") as f:
        for line in f:
            parts = line.strip().split(",")
            if len(parts) >= 4 and parts[1] == user_id:
                if choice == "1":
                    new_name = input("Enter new name: ")
                    parts[0] = new_name
                elif choice == "2":
                    new_email = input("Enter new email: ")
                    if len(parts) > 4:
                        parts[4] = new_email
                    else:
                        parts.append(new_email)
                elif choice == "3":
                    new_pass = input("Enter new password: ")
                    parts[2] = new_pass
                elif choice == "4":
                    return  # back to menu
                line = ",".join(parts) + "\n"
            lines.append(line)

    with open(USERS_FILE, "w") as f:
        f.writelines(lines)

    log_record(f"Profile updated for {user_id}")
    print("✅ Profile updated!")

def view_profile(user_id, role):
    """View profile for Boss, Manager, or Employee"""
    import os

    # Pick the right file based on role
    if role.lower() == "boss":
        filename = "users.txt"
    elif role.lower() == "manager":
        filename = "userss.txt"
    elif role.lower() == "employee":
        filename = "users.txt"
    else:
        print("Invalid role.")
        return

    if not os.path.exists(filename) or os.stat(filename).st_size == 0:
        print(f"No {role} profiles found.")
        return

    with open(filename, "r") as file:
        for line in file:
            parts = [p.strip() for p in line.strip().split(",")]

            # Debugging helper: see what’s being read
            print(f"DEBUG parts: {parts}")

            if len(parts) < 4:
                continue

            name, uid, password, stored_role = parts[:4]
            email = parts[4] if len(parts) > 4 else ""

            # Normalize comparisons
            if uid.strip() == user_id.strip() and stored_role.strip().lower() == role.lower():
                print("\n--- 📋 Profile ---")
                print(f"ID: {uid}")
                print(f"Name: {name}")
                print(f"Role: {stored_role}")
                if email:
                    print(f"Email: {email}")
                return

    print(f"No profile found for {role} with ID {user_id}.")

def search_user(criteria, value):
    """Search user by name/id/email in users.txt"""
    try:
        with open(USERS_FILE, "r") as f:
            found = False
            for line in f:
                parts = line.strip().split(",")
                if len(parts) >= 4:
                    if criteria.lower() == "name" and parts[0].lower() == value.lower():
                        print(f"Name: {parts[0]}, ID: {parts[1]}, Role: {parts[3]}")
                        found = True
                    elif criteria.lower() == "id" and parts[1] == value:
                        print(f"Name: {parts[0]}, ID: {parts[1]}, Role: {parts[3]}")
                        found = True
                    elif criteria.lower() == "email" and len(parts) > 4 and parts[4].lower() == value.lower():
                        print(f"Name: {parts[0]}, ID: {parts[1]}, Email: {parts[4]}, Role: {parts[3]}")
                        found = True
            if not found:
                print("❌ User not found.")
    except FileNotFoundError:
        print("❌ users.txt not found.")

# ------------------ Manager Handling ------------------
def add_manager():
    name = input("Enter manager name: ").strip()
    mgr_id = input("Enter manager ID: ").strip()
    password = input("Set manager password: ").strip()
    email = input("Enter manager email: ").strip()
    _append_to_file(USERS_FILE, f"{name},{mgr_id},{password},Manager,{email}")
    print(f"\n✅ Manager {name} added successfully with ID {mgr_id}.")
    log_record(f"New manager added: {name} (ID: {mgr_id})")

def view_managers():
    """View all managers from users.txt"""
    print("\n--- Managers ---")
    try:
        with open(USERS_FILE, "r") as f:
            found = False
            for line in f:
                parts = line.strip().split(",")
                if len(parts) >= 4 and parts[3].strip().lower() == "manager":
                    print(f"Name: {parts[0]}, ID: {parts[1]}, Role: {parts[3]}")
                    found = True
            if not found:
                print("❌ No managers found.")
    except FileNotFoundError:
        print("❌ users.txt not found.")


def view_employees():
    """View all employees from users.txt"""
    print("\n--- Employees ---")
    try:
        with open(USERS_FILE, "r") as f:
            found = False
            for line in f:
                parts = line.strip().split(",")
                if len(parts) >= 4 and parts[3].strip().lower() == "employee":
                    print(f"Name: {parts[0]}, ID: {parts[1]}, Role: {parts[3]}")
                    found = True
            if not found:
                print("❌ No employees found.")
    except FileNotFoundError:
        print("❌ users.txt not found.")

def delete_manager():
    manager_id = input("Enter manager ID to delete: ").strip()
    managers = _read_file(USERS_FILE)
    updated = [m for m in managers if m.split(",")[1].strip() != manager_id]
    with open(USERS_FILE, "w") as file:
        file.write("\n".join(updated) + ("\n" if updated else ""))
    log_record(f"Manager deleted: {manager_id}")

# ------------------ Employee Handling ------------------
def add_employee():
    try:
        name = input("Enter employee name: ").strip()
        emp_id = input("Enter employee ID: ").strip()
        password = input("Set employee password: ").strip()
        email = input("Enter employee email: ").strip()
        _append_to_file(USERS_FILE, f"{name},{emp_id},{password},Employee,{email}")
        print(f"\n✅ Employee {name} added successfully with ID {emp_id}.")
        log_record(f"New employee added: {name} (ID: {emp_id})")
    except Exception as e:
        print(f"❌ Error adding employee: {e}")


def view_employees():
    """View all employees from users.txt"""
    print("\n--- Employees ---")
    try:
        with open(USERS_FILE, "r") as f:
            found = False
            for line in f:
                parts = line.strip().split(",")
                if len(parts) >= 4 and parts[3].strip().lower() == "employee":
                    print(f"Name: {parts[0]}, ID: {parts[1]}, Role: {parts[3]}")
                    found = True
            if not found:
                print("❌ No employees found.")
    except FileNotFoundError:
        print("❌ users.txt not found.")

def delete_employee():
    emp_id = input("Enter employee ID to delete: ").strip()
    employees = _read_file(USERS_FILE)
    updated = [e for e in employees if e.split(",")[1].strip() != emp_id]
    with open(USERS_FILE, "w") as file:
        file.write("\n".join(updated) + ("\n" if updated else ""))
    log_record(f"Employee deleted: {emp_id}")
    print(f"\n✅ Employee {emp_id} deleted successfully.")


# ------------------ Reports Handling ------------------
def save_reports():
    report = input("Enter report content: ").strip()
    _append_to_file(REPORTS_FILE, report)
    print("\n✅ Report saved.")
    log_record("Report saved")

def view_reports():
    reports = _read_file(REPORTS_FILE)
    print("\n📊 Reports:")
    if not reports:
        print("⚠️ No reports found.")
    for r in reports:
        print(r)

# ------------------ Task Handling ------------------
def assign_task():
    emp_id = input("Enter Employee ID: ")
    task = input("Enter task: ")
    with open(TASKS_FILE, "a") as f:
        f.write(f"{emp_id},{task},Pending\n")
    log_record(f"Task assigned to {emp_id}")
    print("✅ Task assigned!")

def view_tasks():
    tasks = _read_file(TASKS_FILE)
    print("\n📋 All Tasks:")
    if not tasks:
        print("⚠️ No tasks found.")
    for t in tasks:
        print(t)

def view_tasks_by_employee(manager_id):
    """View tasks for a specific employee, logged by manager"""
    emp_id = input("Enter Employee ID: ")   # ✅ define emp_id
    print(f"\n📋 Tasks for Employee {emp_id}:")
    found = False
    try:
        with open(TASKS_FILE, "r") as f:
            for line in f:
                parts = line.strip().split(",")
                if parts[0] == emp_id:
                    print(line.strip())
                    found = True
        if not found:
            print("❌ No tasks found for this employee.")
    except FileNotFoundError:
        print("❌ tasks.txt not found.")
    log_record(f"Manager {manager_id} viewed tasks for {emp_id}")

def update_task_status():
    task_id = input("Enter task ID to update: ").strip()
    new_status = input("Enter new status (Pending/Completed): ").strip()
    tasks = _read_file(TASKS_FILE)
    updated = []
    found = False
    for t in tasks:
        parts = [p.strip() for p in t.split(",")]
        if len(parts) >= 4:
            tid, assigned_to, description, status = parts[:4]
            if tid == task_id:
                updated.append(f"{tid},{assigned_to},{description},{new_status}")
                found = True
            else:
                updated.append(t)
    with open(TASKS_FILE, "w") as file:
        file.write("\n".join(updated) + ("\n" if updated else ""))
    if found:
        print("\n✅ Task status updated.")
        log_record(f"Task {task_id} status updated to {new_status}")
    else:
        print("⚠️ Task not found.")

# ------------------ Suggestions & Enquiries ------------------
def submit_suggestion(user_id):
    suggestion = input("Enter your suggestion: ").strip()
    _append_to_file(SUGGESTIONS_FILE, f"{user_id},{suggestion}")
    print("\n✅ Suggestion submitted.")
    log_record(f"Suggestion submitted by {user_id}")

def submit_enquiry(user_id):
    enquiry = input("Enter your enquiry: ").strip()
    _append_to_file(ENQUIRIES_FILE, f"{user_id},{enquiry}")
    print("\n✅ Enquiry submitted.")
    log_record(f"Enquiry submitted by {user_id}")

def view_suggestions():
    suggestions = _read_file(SUGGESTIONS_FILE)
    print("\n💡 Suggestions:")
    if not suggestions:
        print("⚠️ No suggestions found.")
    for s in suggestions:
        print(s)

def view_enquiries():
    enquiries = _read_file(ENQUIRIES_FILE)
    print("\n❓ Enquiries:")
    if not enquiries:
        print("⚠️ No enquiries found.")
    for e in enquiries:
        print(e)

# ------------------ System Reset ------------------
FILES_TO_RESET = [
    USERS_FILE,
    REPORTS_FILE,
    TASKS_FILE,
    SUGGESTIONS_FILE,
    ENQUIRIES_FILE,
    LOG_FILE
]

def reset_login_system():
    """Clear all data files to reset the login system."""
    for filename in FILES_TO_RESET:
        try:
            with open(filename, "w") as f:
                f.write("")  # empty the file
            print(f"✅ Cleared {filename}")
        except Exception as e:
            print(f"⚠️ Could not clear {filename}: {e}")

    print("\n🔄 Login system reset complete. Run shri.py again to start fresh.")
    log_record("System reset performed")