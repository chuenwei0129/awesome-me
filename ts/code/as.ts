// as 意味着什么？你指着编译器的脸告诉它，这个变量的类型就是这个，不服憋着。
// 为什么要 as 两次？不能直接 as Function？好问题！因为 TS编译器会用报错狠狠的抽你 as 实际上只能转换存在父子类型的关系，对于风马牛不相及的关系它是不理你的，所以你需要先 as 成 any，像中介一样强行把原类型和新类型关联起来。
// 如果要稍微规范一点，应该先 as 成原类型和新类型的父类型，再 as 成新类型

interface Animal {}
interface Deer extends Animal {
  deerId: number
}
interface Horse extends Animal {
  horseId: number
}

let deer: Deer = { deerId: 0 }
// 并不能一步到位
let horse1 = deer as Horse
// 先提升成共同的父类型，再定位到子类型
let horse2 = deer as Animal as Horse
// 先想想我们一般啥时候用 any，比如某个变量实际上就是某个类型，但是由于中途各种操作你没做的严丝合缝，到某一步类型报错了，这个时候可以先 as 成 any，再 as 成你想要的类型，然后你就又有类型提示了（当然，我觉得直接 as any 的情况比较多）。
let horse3 = deer as any as Horse
// 后来，我们有了 unknown，编译器对于关联不相关的两个类型的提示也变成了 “求求你先 as 成 unknown 吧”
let horse4 = deer as unknown as Horse

// 三句话概括一下never的用途：
// 1、配合类型收窄中确保所有的可选项都被穷举到到（if else / switch case）
// 2、配合三目运算符在类型系统中定义一个泛型的类型
// 3、在联合类型里面做“减法”

// 关于 extends，这涉及到协变与逆变相关的部分，在这里你可以简单理解为，左边的类型更加狭窄具体，右边的类型更加宽松广泛时（即，右边类型中有的在左边肯定有！），extends 成立
