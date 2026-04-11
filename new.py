import time

# ----------------- User Credentials -----------------
usernameb = "boss"
passwordb = "boss"

usernamem = "manage"
passwordm = "manage"

usernamee = "employee"
passworde = "employee"

# ----------------- Locking System -----------------
failed_attempts = {}
locked_accounts = {}
LOCK_DURATION = 60   # lock for 60 seconds (demo)
MAX_ATTEMPTS = 3

def is_locked(role):
    """Check if account is locked and whether lock has expired."""
    if role in locked_accounts:
        lock_time = locked_accounts[role]
        if time.time() - lock_time < LOCK_DURATION:
            return True
        else:
            # unlock after duration
            del locked_accounts[role]
    return False

# ----------------- File Handling Helpers -----------------
def log_attempt(role, username, success):
    """Log login attempts to a file"""
    with open("login_log.txt","a") as file:
        status = "Success" if success else "Failed"
        file.write(f"{role} | {username} | {status}\n")

def save_reports():
    """Save reports to a file (Boss only)"""
    reports = ["Sales Report Q1", "Employee Performance Report", "Budget Report"]
    with open("reports.txt", "w") as file:
        for report in reports:
            file.write(report + "\n")

def view_reports():
    """Read reports from file"""
    try:
        with open("reports.txt", "r") as file:
            print("Reports:")
            for line in file:
                print("-", line.strip())
    except FileNotFoundError:
        print("No reports found. Please save reports first.")

def log_action(role, action):
    """Log menu actions to a file"""
    with open("actions_log.txt", "a") as file:
        file.write(f"{role} performed: {action}\n")

# ----------------- Menus -----------------
def login():
    print("-------Login System---------")
    print("1. Boss")
    print("2. Manager")
    print("3. Employee")
    print("4. Exit")
    print("-"*25)

def show_menu(role):
    while True:
        if role == "Boss":
            print("\n--- Boss Menu ---")
            print("1. View all reports")
            print("2. Manage employees")
            print("3. Approve budgets")
            print("4. Logout")

            choice = int(input("Please enter your choice:"))
            if choice == 1:
                view_reports()
            elif choice == 2:
                print("Managing employees... (feature coming soon)")
            elif choice == 3:
                print("Approving budgets... (feature coming soon)")
            elif choice == 4:
                print("Logging out......")
                break
            else:
                print("Invalid choice. Try Again!")

        elif role == "Manager":
            print("\n--- Manager Menu ---")
            print("1. Assign tasks")
            print("2. Review team progress")
            print("3. Log out")

            choice = int(input("Please enter your choice:"))
            if choice == 1:
                print("Assigning tasks... (feature coming soon)")
            elif choice == 2:
                print("Reviewing team progress... (feature coming soon)")
            elif choice == 3:
                print("Logging out.....")
                break
            else:
                print("Invalid choice. Try Again!")

        elif role == "Employee":
            print("\n--- Employee Menu ---")
            print("1. View assigned tasks")
            print("2. Update task status")
            print("3. Logout")

            choice = int(input("Please enter your choice:"))
            if choice == 1:
                print("Viewing assigned tasks... (feature coming soon)")
            elif choice == 2:
                print("Updating task status... (feature coming soon)")
            elif choice == 3:
                print("Logging out......")
                break
            else:
                print("Invalid choice. Try Again!")

# ----------------- Login System -----------------
def login_system():
    choice = int(input("Choose between(1-4):"))
    print()

    while choice not in [1,2,3,4]:
        print("Please choose number between 1 to 4 only!")
        choice = int(input("Choose between(1-4):"))

    attempts = 0

    while True:
        if choice == 1:  # Boss
            if is_locked("Boss"):
                print("⚠️ Boss account is locked. Try again later.")
                break

            print("You chose Boss.")
            while attempts < MAX_ATTEMPTS:
                username1 = input("Enter your username:")
                password1 = input("Enter your password:")

                if username1 == usernameb and password1 == passwordb:
                    print("Login Successful. Welcome to the System.")
                    failed_attempts["Boss"] = 0
                    log_attempt("Boss", username1, True)
                    show_menu("Boss")
                    break
                else:
                    attempts += 1
                    log_attempt("Boss", username1, False)
                    print(f"Invalid credentials. Attempts left: {MAX_ATTEMPTS - attempts}")
                    if attempts == MAX_ATTEMPTS:
                        print("🔒 Too many attempts. Boss account locked temporarily.")
                        locked_accounts["Boss"] = time.time()
            break

        elif choice == 2:  # Manager
            if is_locked("Manager"):
                print("⚠️ Manager account is locked. Try again later.")
                break

            print("You chose Manager.")
            while attempts < MAX_ATTEMPTS:
                username2 = input("Enter your username:")
                password2 = input("Enter your password:")

                if username2 == usernamem and password2 == passwordm:
                    print("Login Successful. Welcome to the System.")
                    failed_attempts["Manager"] = 0
                    log_attempt("Manager", username2, True)
                    show_menu("Manager")
                    break
                else:
                    attempts += 1
                    log_attempt("Manager", username2, False)
                    print(f"Invalid credentials. Attempts left: {MAX_ATTEMPTS - attempts}")
                    if attempts == MAX_ATTEMPTS:
                        print("🔒 Too many attempts. Manager account locked temporarily.")
                        locked_accounts["Manager"] = time.time()
            break

        elif choice == 3:  # Employee
            if is_locked("Employee"):
                print("⚠️ Employee account is locked. Try again later.")
                break

            print("You chose Employee.")
            while attempts < MAX_ATTEMPTS:
                username3 = input("Enter your username:")
                password3 = input("Enter your password:")

                if username3 == usernamee and password3 == passworde:
                    print("Login Successful. Welcome to the System.")
                    failed_attempts["Employee"] = 0
                    log_attempt("Employee", username3, True)
                    show_menu("Employee")
                    break
                else:
                    attempts += 1
                    log_attempt("Employee", username3, False)
                    print(f"Invalid credentials. Attempts left: {MAX_ATTEMPTS - attempts}")
                    if attempts == MAX_ATTEMPTS:
                        print("🔒 Too many attempts. Employee account locked temporarily.")
                        locked_accounts["Employee"] = time.time()
            break

        else:
            print("You have successfully logout!")
            break

# ----------------- Program Loop -----------------
while True:
    login()
    login_system()
    again = input("Do you want to login again? (y/n):")
    if again.lower() != "y":
        print("Goodbye!")
        break