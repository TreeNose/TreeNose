public class classes {
    // Fields or instance variables
    private String name;
    private int age;

    // Constructor
    public classes(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter method for name
    public String getName() {
        return name;
    }

    // Getter method for age
    public int getAge() {
        return age;
    }

    // Setter method for name
    public void setName(String name) {
        this.name = name;
    }

    // Setter method for age
    public void setAge(int age) {
        this.age = age;
    }

    // Method to display information about the person
    public void displayInfo() {
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
    }

    public static void main(String[] args) {
        // Creating an instance of the Person class using the constructor
        classes person1 = new classes("John Doe", 25);

        // Displaying information about the person
        person1.displayInfo();

        // Modify
    }

}