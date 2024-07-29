遇到 MySQL 的 `ERROR 1045 (28000): Access denied for user 'user'@'localhost' (using password: NO)` 错误时，表示尝试以指定用户登录到 MySQL 服务器时因为权限问题被拒绝。这个错误通常发生在提供了错误的用户名和密码组合，或者是在尝试以未授权的方式访问数据库时。

以下是几种解决这个问题的方法：

### 1. 确认你是否输入了密码

如果你尝试登录时没有提供密码（如错误信息所示的 `(using password: NO)`），但该用户实际上是需要密码的，那么你需要在登录命令中包含密码。使用 `-p` 选项但不直接跟密码，系统会提示你输入密码：

```sh
mysql -u chuenwei -p
```

系统会提示你输入密码。这样做比在命令行中直接包含密码更安全，因为直接包含密码可能会被保存在命令历史中。

### 2. 使用正确的用户名和密码

确保你使用的是正确的用户名和密码。如果你不记得密码，你可能需要重置密码，这通常需要具有管理员权限。

### 3. 重置 MySQL 用户密码

如果你是数据库的管理员，但忘记了密码，你可以通过以下步骤重置密码。首先，需要停止 MySQL 服务：

```sh
brew services stop mysql
```

然后，以安全模式和跳过授权表的方式启动 MySQL：

```sh
mysqld_safe --skip-grant-tables &
```

这将启动服务器并允许无密码登录。接下来，登录到 MySQL：

```sh
mysql -u root
```

在 MySQL 命令行中，用以下命令重置密码（MySQL 5.7.6 及以上版本）：

```sql
FLUSH PRIVILEGES;
ALTER USER 'chuenwei'@'localhost' IDENTIFIED BY '新密码';
```

对于 MySQL 5.7.5 及以下版本，使用：

```sql
FLUSH PRIVILEGES;
SET PASSWORD FOR 'chuenwei'@'localhost' = PASSWORD('新密码');
```

完成后，退出 MySQL，然后重启 MySQL 服务：

```sh
brew services start mysql
```

### 4. 确保用户有权访问

如果用户应该可以访问，但仍然收到权限错误，可能需要检查和调整 MySQL 的用户权限。登录到 MySQL 作为 root 或另一个有权限的用户，然后检查用户权限：

```sql
SHOW GRANTS FOR 'chuenwei'@'localhost';
```

这将显示用户的权限。如果需要，你可以授予用户访问特定数据库的权限：

```sql
GRANT ALL PRIVILEGES ON 数据库名.* TO 'chuenwei'@'localhost';
FLUSH PRIVILEGES;
```

请根据实际情况替换 `数据库名` 和 `新密码`。

### 注意：

- 在处理数据库时要谨慎，特别是在更改用户权限和密码时。
- 如果你不是数据库的管理员，那么你需要联系管理员来帮助解决登录问题。
