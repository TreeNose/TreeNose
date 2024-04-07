class MyClass
    def greet(name="World", wow)
        puts "Hello, #{name}!"
      end
    def greet(name:, age:)
        puts "Hello, #{name}! You are #{age} years old."
    end
  end
  
  obj = MyClass.new
  obj.instance_method

class MyClass
    def self.class_method
        puts "This is a class method"
    end
    def greet(a, *names)
      names.each do |name|
        puts "Hello, #{name}!"
      end
    end
end

module MyModule
    def module_method
      puts "This is a module method"
    end
  end
  
  class MyClass
    include MyModule
  end
  
  obj = MyClass.new
  obj.module_method

def outer_method
    outer_var = "Hello"
    inner_method = -> { puts outer_var }
    inner_method.call
end

outer_method