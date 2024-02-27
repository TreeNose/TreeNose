class Calculator:
    def __init__(self, value=0):
        self.value = value

    def add(self, x):
        self.value += x
        return self

    def subtract(self, x):
        self.value -= x
        return self

    def multiply(self, x):
        self.value *= x
        return self

    def divide(self, x):
        self.value /= x
        return self

# Example of a long message chain
result = Calculator(10).add(5).multiply(2).subtract(3).divide(2).value

print(f"Result: {result}")
