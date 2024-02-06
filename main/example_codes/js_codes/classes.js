class MyClass {
    static staticProperty = 'someValue';
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
    static staticMethod() {
        return 'static method has been called.';
      }
}

// Create an instance of MyClass
let obj = new MyClass('John Doe', 30);

console.log(MyClass.staticProperty); // John Doe
// Use the greet method
obj.greet();