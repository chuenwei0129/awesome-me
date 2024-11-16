# 坑在这
class Player:
  def __init__(self, name, items = []):
    self.name = name
    self.items = items

p1 = Player("Alice")
p2 = Player("Bob")
p1.items.append("sword")
p2.items.append("shield")

print(p1.items)    # 输出：['sword', 'shield']
print(p2.items)    # 输出：['sword', 'shield']
