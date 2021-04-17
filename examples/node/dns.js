const dns = require('dns')

dns.lookup('www.baidu.com', { all: true }, (err, address, family) => {
	if (err) console.log(err)
	console.log(address)
})

// dns.lookup()跟dns.resolve4()的区别
// 两个方法都可以查询域名的ip列表。那么，它们的区别在什么地方呢？

// 可能最大的差异就在于，当配置了本地Host时，是否会对查询结果产生影响。

// dns.lookup()：有影响。
// dns.resolve4()：没有影响。