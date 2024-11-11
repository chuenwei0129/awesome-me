# print(1 + "1")  # TypeError: unsupported operand type(s) for +: 'int' and 'str'

print(type(100))
print(type(100.0))
# <class 'int'>
# <class 'float'>

print(isinstance(100, int))

arr = [("name", "Alice"), ("age", 25)]

print(dict(arr))
