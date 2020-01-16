const prompt = require('inquirer').createPromptModule();
const { configFilePath } = require('../config/index');
const { writeFile, readFile } = require('../util/secure.local.file');
const { success } = require('../util/xlog');

module.exports = async () => {
  const config = readFile(configFilePath);
  const { key } = await prompt({
    name: 'key',
    message: '请选择要修改的账号',
    type: 'list',
    choices: Object.keys(config)
  });
  const userInfo = config[key];
  const { password } = await prompt({
    name: 'password',
    message: '密码',
    type: 'input',
    default: userInfo.password,
  });
  if (password === '') process.exit(0);

  const { email } = await prompt({
    name: 'email',
    message: '邮箱',
    type: 'input',
    default: userInfo.email,
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
  config[key] = {
    ...config[key],
    password,
    email
  };
  writeFile(configFilePath, config);
  success('恭喜，更新成功！');
}