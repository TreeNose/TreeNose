def a():
    return

@__cached__
def b():
    return

class c:
    def __init__(self) -> None:
        pass

    def d(self):
        return
    
# Pseudo Code

def getNameArray():
    nameArray = list('John','Jaclyn','Jim','Joseph')
    for name in nameArray:
        print(name)
    print(1)
    nameArray = list('John','Jaclyn','Jim','Joseph')
    for name in nameArray:
        print(name)
    print(1)
    nameArray = list('John','Jaclyn','Jim','Joseph')
    for name in nameArray:
        print(name)
    print(1)
    nameArray = list('John','Jaclyn','Jim','Joseph')
    for name in nameArray:
        print(name)
    print(1)
    nameArray = list('John','Jaclyn','Jim','Joseph')
    for name in nameArray:
        print(name)
    print(1)

class A:
    def __init__(self) -> None:
        pass

    def a(self):
        pass

    @staticmethod
    def b(self):
        pass
