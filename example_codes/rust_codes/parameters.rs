fn add(a: i32, b: i32) -> i32 {
    a + b
}

struct Point {
    x: i32,
    y: i32,
}

fn print_point(p: Point) {
    println!("x = {}, y = {}", p.x, p.y);
}

let point = Point { x: 10, y: 20 };
print_point(point);

struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Associated function with default parameters
    fn new() -> Rectangle {
        Rectangle { width: 10, height: 10 }
    }
}

let rect = Rectangle::new(); // Creates a Rectangle with default width and height

fn print_numbers(numbers: &[i32]) {
    for &num in numbers {
        println!("{}", num);
    }
}

let nums = vec![1, 2, 3, 4, 5];
print_numbers(&nums);

fn modify_string(s: &mut String) {
    s.push_str(" world");
}

let mut greeting = String::from("Hello");
modify_string(&mut greeting);
println!("{}", greeting); // Prints: Hello world

fn increment(mut x: i32) -> i32 {
    x += 1;
    x
}

let num = 5;
let result = increment(num);
println!("{}", result); // Prints: 6
