count = 0


def f():
    print(count)  # 0


f()


# 闭包
# 没有作用域链
def g():
    count = 0

    def f():
        nonlocal count
        print(count)  # 0
        count = count + 1

    f()


g()

# 声明变量就发生了作用域提升
# 大概是作用域提升，但不存在作用域链，需要显示声明 count 是外层的
