# Integers
x = 5
y = -10
z = x + y
print(z)  # 输出：-5

# Floats
a = 3.14
b = 1.5
c = a + b
print(c)  # 输出：4.64

# Strings
hello = "Hello,"
world = "world!"
sentence = hello + " " + world
print(sentence)  # 输出：Hello, world！

# Booleans
x = 5
y = 10
print(x < y)  # 输出：True


# None
def greet(name=None):
    if name is None:
        print("Hello, there!")
    else:
        print(f"Hello, {name}!")


greet()  # 输出：Hello, there！
greet("Alice")  # 输出：Hello, Alice！

# Creating a class called Point, which has two attributes, x and y.
# 也就是要把自定义的东西作为字典的键，首先要有hash函数
# 在字典比较键值时，会先判断2个是不是同一个对象，如果是就通过
# 如果不是，就比较hash，不相等就不通过
# hash相等，就比较eq，相等就通过
# 否则不通过


# 装饰器 time 函数是一个参数是函数，返回值也是函数的函数
# @time = time(被修饰的函数)
# @time(10) = time(10)(被修饰的函数)
