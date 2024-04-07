class Animal
    def speak
      puts "Animal speaks"
    end
  end
  
class Dog < Animal
    def speak
        puts "Woof!"
    end
end

module Swimmer
    def swim(here = "here")
        @a = here
        puts "Swimming!" + " " + here
        return self
    
    end
end

class Duck
    include Swimmer
end

result = "hello".upcase.reverse.capitalize.chomp("O").gsub(/[aeiou]/, "*").split("").join(" ")