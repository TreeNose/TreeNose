import tree_sitter

class ParentClass:
    def __init__(self, parent_attribute):
        self.parent_attribute = parent_attribute

    def parent_method(self):
        print(tree_sitter.text)
        print("This is a parent method.")

class ChildClass(ParentClass):
    def __init__(self, parent_attribute, child_attribute):
        super().__init__(parent_attribute)
        self.child_attribute = child_attribute

    def child_method(self):
        self.a = "a"
        print(self.a)
        print("This is a child method.")

