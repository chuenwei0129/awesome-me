def r():
    return "xy"


x, y = "x", "y"

a = "xy"
b = a[:]
c = "xy"
d = "x" + "y"
e = x + y
exec('f = "xy"')
g = r()
a = "xyz"

print("a", id(a), a)
print("b", id(b), b)
print("c", id(c))
print("d", id(d))
print("e", id(e))
print("f", id(f))
print("g", id(g))

# 不要用 is 比较字符串，因为字符串缓存机制指向同一个地址
# immuateble 优化
print(a is b)  # True
