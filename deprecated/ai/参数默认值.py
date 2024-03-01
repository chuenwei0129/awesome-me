class Player:
  def __init__(self, name, items = []):
    self.name = name
    self.items = items

p1 = Player("Alice")
p2 = Player("Bob")

p1.items.append("sword")
p2.items.append("shield")

print(p1.items) # 输出：['sword', 'shield']
print(p2.items) # 输出：['sword', 'shield']

# 为什么p1和p2的items列表是一样的？
# 因为Python的默认参数是在函数定义的时候计算的，而不是在函数调用的时候计算的。
# 所以，当默认参数是可变对象时，如果你在函数里修改了这个对象，那么下次调用这个函数时，这个对象的值就会被修改。

# 为了避免这个问题，可以把默认参数设为None，然后在函数里判断是否为None，如果是None，就把它设为默认值。
class Player2:
  def __init__(self, name, items = None):
    self.name = name
    if items is None:
      items = []
    self.items = items

p3 = Player2("Alice")
p4 = Player2("Bob")

p3.items.append("sword")
p4.items.append("shield")

print(p3.items) # 输出：['sword']
print(p4.items) # 输出：['shield']
