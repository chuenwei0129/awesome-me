a = None

if a is None:
    print("a is None")

# False: 0, 0.0, [], {}, (), set(), None
if a:
    print("a is not None")

# 会被重载
if a == None:
    print("a is None")
