# npmsu

> npm账号切换工具

## 概述

该工具以`registry`+`username`作为标识，以加密形式将账号信息保存至本地。存储在`$HOME/.npmsurc`文件内。

- 可配置多组账号信息
- 同一个`registry`可配置多个账号
- 在切换账号的同时，切换默认`registry`

## 安装与使用

```
npm install -g npmsu
```

### 切换账号`npmsu`
```bash
$ npmsu

? 选择登录账号 https://registry.npmjs.com::imochen
✔ ｢NPMSU:1.0.0 15:45:57｣: npm registry 切换至 https://registry.npmjs.com
ℹ ｢NPMSU:1.0.0 15:45:59｣: 用户名 ✔
ℹ ｢NPMSU:1.0.0 15:45:59｣: 密码 ✔
ℹ ｢NPMSU:1.0.0 15:45:59｣: 邮箱 ✔
✔ ｢NPMSU:1.0.0 15:46:00｣: Logged in as imochen on https://registry.npmjs.com/.
```

### 添加账号`npmsu add`
```bash
$ npmsu add

? 输入一个registry https://registry.npmjs.com
? 用户名 test
? 密码 test
? 邮箱 test@test.com
✔ ｢NPMSU:1.0.0 15:36:28｣: 恭喜，添加成功！
```

### 修改账号`npmsu config`
```bash
$ npmsu config

? 请选择要修改的账号 https://registry.npmjs.com::test
? 密码 test1
? 邮箱 test@test.com
✔ ｢NPMSU:1.0.0 15:37:34｣: 恭喜，更新成功！
```

### 移除账号`npmsu remove`
```bash
$ npmsu remove

? 请选择要移除的账号 https://registry.npmjs.com::test
? 将要移除 https://registry.npmjs.com::test, 请确认 Yes
✔ ｢NPMSU:1.0.0 15:38:23｣: 恭喜，移除成功！
```