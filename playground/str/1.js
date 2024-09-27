// 我们应该知道，无论什么数据在计算机内容中都是二进制的数字表示的，因此一个码元就是一个 16 位无符号整数，最大为 0xFFFF。这个数字是需要映射到可见的、有意义的文字符号的，这个映射关系本来是由字符集 Unicode 来负责的，比如数字 65 映射为大写英文字母“A”，数字 0x4E2D 映射为汉字“中”，数字 0x20BFF 映射为“𠯿”。但是，通常来说一个字符的 Unicode 编码值不适合用来直接存储和传输，原因包括：

// 纠错问题，即便错了一二进制位，就会变成另一个合法的字符；
// 前导问题，一个字符的编码值可能是另一个字符的前面一部分。
// 因此，Unicode 编码值会通过算法再次编码转换成另一个数字，来进行存储和传输。这个过程称为字符编码，我们常见的字符编码比如 GBK、GB2312、UTF-8 等等。这个编码过程虽然会浪费一部分空间，但是却拥有了一定的纠错能力，并且规避了前导问题，使得应用程序可以高效、无误地读取。

// 回到字符串的结构上来，JavaScript 的码元就是经过字符编码后的整数，只不过这个编码并不是我们耳熟能详的，而是一个叫做 UTF-16 的编码方案，这是历史原因造成的。相较于 UTF-8 编码后可能是 1byte、2byte、3byte、4byte 而言，大家注意，UTF-16 编码后只可能是 2byte 或 4byte 的。

// Unicode 字符在 JavaScript 的 UTF-16 编码中，会占据 2byte 或者 4byte 空间，也即 1 码元或者 2 码元。而 length 反映的是码元的数量，所以“𠯿”就是占据 4byte 的那一种。
// 在一个基础的 Emoji 编码后面，添加修饰符的编码，中间用 0x200D 来分隔，这样产生的一系列码元，只会显示成一个 Emoji 外观。

// length === 码元个数
console.log('🧑🏽‍🚒'.length); // 7
console.log([...'🧑🏽‍🚒'].length); // 4 === 🚒‍🏽🧑+0x200D

const str1 = '1🧑🏽‍🚒2';
// const str1 = '2𠯿1'; // '1𠯿2'

console.log(str1.split('').reverse().join('')); // '1𠯿2'
console.log([...str1].reverse().join(''));

// 字符串截取
// 数组下标，如果参数在 [0, length - 1] 之外的，返回 undefined，如"我是中国人"[5] === undefined；
// charAt 函数，如果参数在 [0, length - 1] 之外的，返回空串，如"我是中国人".charAt(5) === ""；
// 以上这三种方法的参数都是指码元的位置，因此都会受到双码元的影响
// 在有 Emoji 修饰序列的场景下，因为它不是一个 Unicode 整体，上述任何方法都无法工作

// 可以说几乎全部字符串的操作都是基于码元结构的，在双码元字符、Emoji 修饰序列的影响下就形成了对三种不同字符概念的认知，一是码元字符，二是 Unicode 字符，三是可见的符号字符。大家需关注不同场合下的字符定义，以制定相应的应对之策。

const str3 = 'chuenwei0129';

// 有无匹配
console.log(/\d{2}/.test(str3)); // true
// 不存在返回 -1
console.log(str3.search(/\d{5}/)); // -1

// 获取首个匹配，显然不需要 g 修饰符。这一层需求我们在 RegExp 和 String 各有方法可以实现，而且有意思的是，它们竟然是等价的：
// 注意，只有在没有 g 的条件下它们才等价，有兴趣的同学可以试一试加上 g 修饰符后它们有怎样的输出。
console.log(str3.match(/\d{2}/)); // [ '01', index: 8, input: 'chuenwei0129', groups: undefined ]
console.log(/\d{2}/.exec(str3)); // [ '01', index: 8, input: 'chuenwei0129', groups: undefined ]
console.log([...str3.matchAll(/\d{2}/g)]);
// [
//   [ '01', index: 8, input: 'chuenwei0129', groups: undefined ],
//   [ '29', index: 10, input: 'chuenwei0129', groups: undefined ]
// ]
console.log(str3.match(/\d{2}/g)); // [ '01', '29']
console.log(/\d{2}/g.exec(str3)); // [ '01', index: 8, input: 'chuenwei0129', groups: undefined ]
