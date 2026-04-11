# Irina_Pratikshya_Romana_Anisha
# NP071606_NP071381_NP071612_NP071359


import os
from file_handling2 import (
    add_boss, add_user, change_password, add_manager, view_managers,
    add_employee, view_employees, delete_manager, delete_employee,
    log_record, save_reports, view_reports, assign_task, view_tasks,
    view_tasks_by_employee, update_task_status, reset_login_system,
    search_user, edit_profile, submit_suggestion, submit_enquiry,
    view_suggestions, view_enquiries, view_profile
)

USERS_FILE = "users.txt"

def ensure_users_file():                  ### it ensures that the file users.txt is created
    """Ensure users.txt exists"""
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, "w") as f:
            f.write("")  # create empty file

def login(role_choice):
    """Login system with file handling and 3 attempts"""
    ensure_users_file()

    # Check if file is empty
    with open(USERS_FILE, "r") as file:
        if file.read().strip() == "":
            print("No users found. Please create a user.")
            add_user()
            return False, None, None, None              ### if file have no users, the system ask you to create one

    attempts = 0
    while attempts < 3:
        name = input("\nEnter your name: ")
        password = input("Enter your password: ")     ### asks users to enter the password and username
                                                       ### and checks if the user have entered correct credentials or not
        
        with open(USERS_FILE, "r") as file:      ## if any of the details doesn't match system shows error     
            for line in file:
                parts = [p.strip() for p in line.strip().split(",")]
                if len(parts) < 4:
                    log_record(f"Malformed line skipped: {line}")
                    continue
                stored_name, stored_id, stored_password, stored_role = parts[:4]  ###when users enter correct login credentials, he logins successfully and it recorded in log file
                if (stored_name == name and stored_password == password
                    and stored_role.lower() == role_choice.lower()):
                    print(f"\n✅ Login successful! Welcome {stored_role}.")
                    log_record(f"Login successful: {stored_role} {stored_name}")
                    return True, name, stored_role.strip(), stored_id

        attempts += 1     ### if details doesn't match user is provided with 2 other attempts, if user fails to login the program stops and access is denied
        print(f"\n❌ Login failed. Attempts left: {3 - attempts}")

    print("Too many failed attempts. Exiting...")
    return False, None, None, None


def show_menu(role, name, user_id):
    """Role-based menu system with file handling"""
    role = role.strip().lower()  ## "BOSS", "Boss" and "boss" === same
    while True:     ## looop which runs when the condition is true
        if role == "boss":
            print("\n---👑 Boss Menu ---") ### boss can perform any of the task listed in menu
            print("1. Add Manager")
            print("2. Add Employee")
            print("3. Edit Profile")
            print("4. Search Manager/Employee")
            print("5. View Managers")
            print("6. View Employees")
            print("7. Delete Manager")
            print("8. Delete Employee")
            print("9. Add Boss")
            print("10. Assign Task")
            print("11. View Reports")
            print("12. Logout")

            choice = input("\nEnter choice: ")
            if choice == "1":
                add_manager(); log_record(f"{role} {name} added manager")
            elif choice == "2":
                add_employee(); log_record(f"{role} {name} added employee")
            elif choice == "3":
                view_profile(user_id, role); edit_profile(user_id, role)
            elif choice == "4":
                criteria = input("Search by (name/id/email): ")
                value = input("Enter value: ")
                search_user(criteria, value)
            elif choice == "5":
                view_managers()
            elif choice == "6":
                view_employees()
            elif choice == "7":
                delete_manager()
            elif choice == "8":
                delete_employee()
            elif choice == "9":
                add_boss()
            elif choice == "10":
                assign_task()
            elif choice == "11":
                view_reports()
            elif choice == "12":
                print("\nLogging out...")
                break
            else:
                print("\nInvalid choice!")

        elif role == "manager":  ### manager can perform any of the task list in menu
            print("\n---📋 Manager Menu ---")
            print("1. Reset Password")
            print("2. Add Employee")
            print("3. Edit Profile")
            print("4. Search Employee")
            print("5. View Employees")
            print("6. Delete Employee")
            print("7. View Enquiries")
            print("8. View Suggestions")
            print("9. Assign Task")
            print("10. View Tasks by Employee")
            print("11. Update Task Status")
            print("12. Logout")

            choice = input("\nEnter choice: ")
            if choice == "1":
                change_password(user_id)
            elif choice == "2":
                add_employee()
            elif choice == "3":
                view_profile(user_id, role); edit_profile(user_id, role)
            elif choice == "4":
                criteria = input("Search by (name/id/email): ")
                value = input("Enter value: ")
                search_user(criteria, value)
            elif choice == "5":
                view_employees()
            elif choice == "6":
                delete_employee()
            elif choice == "7":
                view_enquiries()
            elif choice == "8":
                view_suggestions()
            elif choice == "9":
                assign_task()
            elif choice == "10":
                view_tasks_by_employee(user_id)
            elif choice == "11":
                update_task_status()
            elif choice == "12":
                print("\nLogging out...")
                break
            else:
                print("\nInvalid choice!")

        elif role == "employee":
            print("\n---👨‍💼 Employee Menu ---") ## employee can perform any of the task listed in menu
            print("1. Reset Password")
            print("2. View Profile")
            print("3. Edit Profile")
            print("4. Submit Suggestion")
            print("5. Submit Enquiry")
            print("6. View Tasks")
            print("7. Submit Report")
            print("8. Logout")

            choice = input("\nEnter choice: ")
            if choice == "1":
                change_password(user_id)
            elif choice == "2":
                view_profile(user_id, role)
            elif choice == "3":
                view_profile(user_id, role); edit_profile(user_id, role)
            elif choice == "4":
                submit_suggestion(user_id)
            elif choice == "5":
                submit_enquiry(user_id)
            elif choice == "6":
                view_tasks()
            elif choice == "7":
                save_reports(user_id)
            elif choice == "8":
                print("\nLogging out...")
                break
            else:
                print("\nInvalid choice!")


def main():
    ensure_users_file() ## ensures file is created
    while True:  
        print("\n" + "="*40)
        print("------🔐Login System ------") ## main login menu to choose role by users
        print("="*40) 
        print("1. Boss")
        print("2. Manager")
        print("3. Employee")
        print("4. Exit")
        print("5. Reset")
        print("-"*40)  

        role_choice = input("\nChoose your role: ") ### users chooses specific role 
        if role_choice == "1":
            role_choice = "Boss"
        elif role_choice == "2":
            role_choice = "Manager"
        elif role_choice == "3":
            role_choice = "Employee"
        elif role_choice == "4":
            print("\nExiting system...")
            print("\nGoodbye\n")
            break
        elif role_choice == "5":
            reset_login_system()

        else:
            print("\nInvalid choice. Try again.")
            continue

        login_successful, name, role, user_id = login(role_choice)
        if login_successful:
            show_menu(role, name, user_id)

        again = input("\nDo you want to login again? (y/n): ").strip().lower()
        if again != "y":
            print("\nGoodbye!\n")
            break


if __name__ == "__main__":
    main()