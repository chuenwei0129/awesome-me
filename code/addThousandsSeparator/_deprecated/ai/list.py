import sys

sys.getsizeof([0] * 3)    # 输出：[0, 0, 0]
sys.getsizeof([0, 0, 0])
# 类似于 Array(3).fill(0)
sys.getsizeof(0 for _ in range(3))
