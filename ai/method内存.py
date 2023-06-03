class O:
    def f(self):
        pass

o = O()
a = id(o.f)
print(a)
b = id(o.f)
print(a, b)

# 这只是巧合，每次 o.f 都是新的，之所以 id 相同，是因为 内存释放太快，用了同一块内存

# 不要过早优化，编译器无法掌握
