// Regular method
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Regular method
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

// Associated function
impl Rectangle {
    // Associated function (similar to static methods in other languages)
    fn new(width: u32, height: u32) -> Rectangle {
        Rectangle { width, height }
    }
}

// Trait method
trait Summary {
    fn summarize(&self) -> String;
}

struct NewsArticle {
    headline: String,
    author: String,
    content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{} by {}", self.headline, self.author)
    }
}

fn main() {
    let rect = Rectangle::new(5, 10);
    println!("Area of the rectangle: {}", rect.area());

    let article = NewsArticle {
        headline: String::from("Breaking News"),
        author: String::from("John Doe"),
        content: String::from("Something important happened."),
    };
    println!("Summary: {}", article.summarize());
}
