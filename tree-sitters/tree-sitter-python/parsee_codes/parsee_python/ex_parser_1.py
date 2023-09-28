from tree_sitter import Language, Parser, Node
import pprint

CODING = 'utf-8'

Language.build_library(
  # Store the library in the `build` directory
  'build/my-languages.so',

  # Include one or more languages
  [
    '../tree-sitter-python'
  ]
)

PY_LANGUAGE = Language('build/my-languages.so', 'python')

parser = Parser()
parser.set_language(PY_LANGUAGE)

with open("parsee_codes/parsee_python/ex_parsee_1.py","r") as f:
  # encoded is required 
  parsee_file = f.read()

tree = parser.parse(bytes(parsee_file,CODING))

print("getting all the code blocks")
for child_node in tree.root_node.children:
  #TODO: decorated definition should be included here too
  if child_node.type == "function_definition":
    print(child_node.text.decode(CODING))
    print("-------------------")


print("traverse the treesitter tree\n")

def traverse(root:Node, ind = 0):
  print("-"*ind + f"{root}")
  for child in root.children:
    if type(child) == ( Node):
      traverse(child, ind + 4)

traverse(tree.root_node)

print("\n\n\n\n")
print("example of a function calling another function\n")
# Call is the final node type that calls another function
print(tree.root_node.children[3].children[-1].children[-3].children[0].children[-1].children[-1].type)

query = PY_LANGUAGE.query("""
(call
  function: (identifier) @function.wow)
""")

captures = query.captures(tree.root_node,start_point = (15, 13), end_point = (15, 24))

print((captures[0]))