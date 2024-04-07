fn main() {
    let number = 42;

    if number < 0 {
        println!("The number is negative");
    } else if number == 0 {
        println!("The number is zero");
    } else {
        println!("The number is positive");
    }

    // Using conditional expression
    let is_even = if number % 2 == 0 { true } else { false };
    println!("Is the number even? {}", is_even);
}


fn main() {
    let number = 42;

    match number {
        0 => println!("The number is zero"),
        1 | 2 | 3 => println!("The number is a small positive number"),
        4..=10 => println!("The number is between 4 and 10 (inclusive)"),
        _ if number % 2 == 0 => println!("The number is even"),
        _ => println!("The number doesn't match any pattern"),
    }
}
