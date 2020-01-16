const prompt = require('inquirer').createPromptModule();
const { configFilePath } = require('../config/index');
const { writeFile, readFile } = require('../util/secure.local.file');
const { warning, success } = require('../util/xlog');

module.exports = async () => {
  const { registry } = await prompt({
    name: 'registry',
    message: '输入一个registry',
    type: 'input',
    default: 'https://registry.npmjs.com',
  });
  if (registry === '') process.exit(0);

  const { user } = await prompt({
    name: 'user',
    message: `您的用户名`,
    type: 'input',
  });
  if (user === '') process.exit(0);

  const { password } = await prompt({
    name: 'password',
    message: '密码',
    type: 'input',
  });
  if (password === '') process.exit(0);

  const { email } = await prompt({
    name: 'email',
    message: '邮箱地址',
    type: 'input',
    validate: function (input) {
      const done = this.async();
      if (/^([A-Za-z0-9_\-\\.])+@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/.test(input)) {
        done(null, true);
      } else {
        done('请输入正确的邮箱');
      }
    }
  });
  if (email === '') process.exit(0);

  const config = readFile(configFilePath);
  const key = `${registry}::${user}`;
  if (config[key]) {
    warning(`${key} 已经存在！`);
    process.exit(1);
  }
  config[key] = {
    registry,
    user,
    password,
    email,
  };
  writeFile(configFilePath, config);
  success('恭喜，用户添加成功！');
}