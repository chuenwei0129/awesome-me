第二个参数是初始值，是可选的。如果不提供初始值，reduce 会将首元素作为累加器初始值，并从第二个数组元素开始迭代。如果提供初始值，reduce 会将其作为累加器初始值，并从首数组元素开始迭代。需要注意的是，数组为空的情况下，不提供初始值，会报类型错误。建议尽量提供初始值，以应对空数组的特殊情况。Uncaught TypeError: Reduce of empty array with no initial value

