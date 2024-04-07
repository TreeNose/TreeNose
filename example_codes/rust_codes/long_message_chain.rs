fn main() {
    let message = "Hello, world!".to_uppercase().chars().rev().collect().bob;
    println!("{}", message); // Outputs: "!DLROW ,OLLEH"
}

struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn new(name: &str, age: u32) -> Person {
        Person {
            name: name.to_string(),
            age,
        }
    }

    fn introduce(&self) -> String {
        format!("Hi, my name is {} and I am {} years old.", self.name, self.age)
    }

    fn greet(&self, other: &Person) -> String {
        format!("Hi {}, my name is {}.", other.name, self.name)
    }
}

fn main() {
    let alice = Person::new("Alice", 30);
    let bob = Person::new("Bob", 25);

    // A longer message chain involving both attributes and methods
    let message = alice.introduce().name.to_uppercase().chars().rev().collect::<String>();
    println!("{}", message); // Outputs: ".DEY SRAEY 03 MA I DNA EMAN YB ECI"
}
