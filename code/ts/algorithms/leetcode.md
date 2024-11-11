# 程序员界的《五年高考，三年模拟》

## 链表

### 前序遍历判断回文链表

👉 [【LeetCode 直通车】：234 回文链表（简单）](https://leetcode-cn.com/problems/palindrome-linked-list/)

#### 题解

利用链表的后续遍历，使用函数调用栈作为后序遍历栈，来判断是否回文

<details><summary>展开查看</summary>

```js
/**
  *
  */
var isPalindrome = function(head) {
    let left = head;
    function traverse(right) {
        if (right == null) return true;
        let res = traverse(right.next);
        res = res && (right.val === left.val);
        left = left.next;
        return res;
    }
    return traverse(head);
};
```

</details>

<!-- TODO -->
