x = 10

if x > 0:
    print("x is positive")
elif x < 0:
    print("x is negative")
else:
    print("x is zero")

def provideAccess(user):
    return {
        "username": user,
        "password": "admin"
    }
 
 
def runMatch():
    user = str(input("Write your username -: "))
 
    # match statement starts here .
    match user:
        case "Om":
        case "Vishal":
        case "Rishabh":
        case _:
 
 