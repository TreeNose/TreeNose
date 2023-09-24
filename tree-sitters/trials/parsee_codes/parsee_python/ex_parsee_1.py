import math

def square_area(v):
    """Get area of a square with the side length."""
    a = v*v
    return a

def circle_area(r):
    """Get area of a circle with radius."""
    a = math.pi * r * r
    return a

def compare_area(v):
    """Compare areas of the circle and the square with the same parameter."""
    circle = circle_area(v)
    square = square_area(v)
    largest = max(circle, square)
    return largest


if __name__ == "__main__":
    pass