---
title: 前后端数据传输
toc: content
---

在今天这个极客满天飞的世界里，前端和后端为了捣鼓出一个成功的应用，时常需要互相传递数据。就像是你和你的朋友打电话，不仅仅只有“喂，你好”，还得聊点实质内容。那么，该如何优雅地传递这些“实质内容”呢？今天我们就通过 Express 框架，来看看前端和后端数据传输的五种常见方式，举几个例子，还加点日常实际开发中的花絮。

### 场景一：URL 参数 (URL Param)

**背景介绍：** 假如我们的用户“编号为 1 的老王”来访问某个页面，我们需要获取老王的信息。于是，URL 参数就派上用场了！

**服务器端代码：**

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    // 假装从数据库获取用户信息
    const user = { id: userId, name: '老王', age: 58 };
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`服务器跑起来了：http://localhost:${PORT}`);
});
```

**前端代码：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <script>
        async function getUser() {
            const response = await axios.get('http://localhost:3000/user/1');
            console.log('用户信息：', response.data);
        }
        getUser();
    </script>
</body>
</html>
```

### 场景二：查询字符串 (Query String)

**背景介绍：** 现在，老王的老婆需要根据名字和年龄筛选出和她一样的一群风华绝代的女士。于是，查询字符串登场！

**服务器端代码：**

```javascript
app.get('/users', (req, res) => {
    const { name, age } = req.query;
    // 假装从数据库筛选用户信息
    const users = [
        { id: 1, name: '老王', age: 58 },
        { id: 2, name: '大美', age: 45 }
    ];
    const filteredUsers = users.filter(user => user.name.includes(name) && user.age == age);
    res.json(filteredUsers);
});
```

**前端代码：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <script>
        async function filterUsers() {
            const response = await axios.get('http://localhost:3000/users', {
                params: {
                    name: '大美',
                    age: 45
                }
            });
            console.log('筛选出的用户：', response.data);
        }
        filterUsers();
    </script>
</body>
</html>
```

### 场景三：表单数据 - URL 编码 (Form-URLencoded)

**背景介绍：** 老王的儿子小王注册了一个网站账号，不得不说，表单提交是标配。于是，咱们得搞点表单传输。

**服务器端代码：**

```javascript
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    const { name, age } = req.body;
    // 假装将数据保存到数据库
    const newUser = { id: Date.now(), name, age };
    res.json(newUser);
});
```

**前端代码：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qs/dist/qs.js"></script>
</head>
<body>
    <script>
        async function registerUser() {
            const response = await axios.post('http://localhost:3000/register', Qs.stringify({
                name: '小王',
                age: 28
            }), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            console.log('注册的新用户：', response.data);
        }
        registerUser();
    </script>
</body>
</html>
```

### 场景四：JSON

**背景介绍：** 老王觉得年纪大了，非得自称“老王”。那好吧，我们用 JSON 来优雅地为他更新一下信息。

**服务器端代码：**

```javascript
app.use(bodyParser.json());

app.post('/update-user', (req, res) => {
    const { id, name, age } = req.body;
    // 假装将数据更新到数据库
    const updatedUser = { id, name, age };
    res.json(updatedUser);
});
```

**前端代码：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <script>
        async function updateUser() {
            const response = await axios.post('http://localhost:3000/update-user', {
                id: 1,
                name: '威猛老王',
                age: 58
            });
            console.log('更新后的用户：', response.data);
        }
        updateUser();
    </script>
</body>
</html>
```

### 场景五：表单数据 (Form-Data)

**背景介绍：** 前几天，老王上传了一张自拍照，上传文件这事儿，我们得严肃点，用 Form-Data 处理一下！

**服务器端代码：**

```javascript
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
    console.log('文件信息：', req.file); // `file` 对象包含上传文件的信息
    console.log('表单字段：', req.body); // `body` 对象包含其他表单字段
    res.json({ message: '文件上传成功', file: req.file });
});
```

**前端代码：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    <input id="fileInput" type="file"/>
    <script>
        const fileInput = document.querySelector('#fileInput');

        async function uploadAvatar() {
            const formData = new FormData();
            formData.append('avatar', fileInput.files[0]);
            const response = await axios.post('http://localhost:3000/upload-avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('上传结果：', response.data);
        }

        fileInput.addEventListener('change', uploadAvatar);
    </script>
</body>
</html>
```

### 大杂烩：综合应用场景

既然聊了这么多，看上去有那么一点乱，那不妨来个大杂烩，我们搭建一个简单的用户管理应用，包含用户注册、查询、更新和头像上传功能！

**服务器端代码：**

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const upload = multer({ dest: 'uploads/' });

// 假装的用户列表
let users = [];

// 用户信息获取
app.get('/user/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    res.json(user);
});

// 用户筛选
app.get('/users', (req, res) => {
    const { name, age } = req.query;
    const filteredUsers = users.filter(user => (!name || user.name.includes(name)) && (!age || user.age == age));
    res.json(filteredUsers);
});

// 用户注册
app.post('/register', (req, res) => {
    const { name, age } = req.body;
    const newUser = { id: Date.now(), name, age };
    users.push(newUser);
    res.json(newUser);
});

// 用户信息更新
app.post('/update-user', (req, res) => {
    const { id, name, age } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        user.name = name;
        user.age = age;
        res.json(user);
    } else {
        res.status(404).json({ message: '用户未找到' });
    }
});

// 头像上传
app.post('/upload-avatar', upload.single('avatar'), (req, res) => {
    res.json({ message: '文件上传成功', file: req.file });
});

app.listen(PORT, () => {
    console.log(`服务器跑起来了：http://localhost:${PORT}`);
});
```

**前端代码：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/qs/dist/qs.js"></script>
</head>
<body>
    <input id="fileInput" type="file"/>
    <script>
        async function getUser() {
            const response = await axios.get('http://localhost:3000/user/1');
            console.log('用户信息：', response.data);
        }

        async function filterUsers() {
            const response = await axios.get('http://localhost:3000/users', {
                params: { name: '大美' }
            });
            console.log('筛选出的用户：', response.data);
        }

        async function registerUser() {
            const response = await axios.post('http://localhost:3000/register', Qs.stringify({
                name: '小王',
                age: 28
            }), {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            console.log('注册的新用户：', response.data);
        }

        async function updateUser() {
            const response = await axios.post('http://localhost:3000/update-user', {
                id: 1,
                name: '威猛老王',
                age: 58
            });
            console.log('更新后的用户：', response.data);
        }

        const fileInput = document.querySelector('#fileInput');

        async function uploadAvatar() {
            const formData = new FormData();
            formData.append('avatar', fileInput.files[0]);
            const response = await axios.post('http://localhost:3000/upload-avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            console.log('上传结果：', response.data);
        }

        fileInput.addEventListener('change', uploadAvatar);

        // 调用函数测试每一个功能点
        // getUser();
        // filterUsers();
        // registerUser();
        // updateUser();
    </script>
</body>
</html>
```
