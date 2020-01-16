const { exec, execSync } = require('child_process');
const prompt = require('inquirer').createPromptModule();
const { configFilePath } = require('../config/index');
const { readFile } = require('../util/secure.local.file');
const { error, warning, success, info } = require('../util/xlog');

module.exports = async () => {
  const config = readFile(configFilePath);
  if (Object.keys(config).length === 0) {
    warning('请先添加账号');
    process.exit(0);
  }
  const { key } = await prompt({
    name: 'key',
    message: '选择登录账号',
    type: 'list',
    choices: Object.keys(config)
  });
  const userInfo = config[key];
  let timer = null;
  execSync(`npm config set registry=${userInfo.registry}`);
  success(`npm registry 切换至 ${userInfo.registry}`);
  const child = exec(`npm login --registry=${userInfo.registry}`);
  child.stderr.on('data', data => {
    error(data);
    clearTimeout(timer);
    timer = setTimeout(() => {
      process.exit(1);
    }, 100);
  })
  child.stdout.on('data', data => {
    const string = data.toLowerCase();
    if (string.includes('username')) {
      child.stdin.write(`${userInfo.user}\n`);
      info('用户名 ✔');
    }
    if (string.includes('password')) {
      child.stdin.write(`${userInfo.password}\n`);
      info('密码 ✔');
    }
    if (string.includes('email')) {
      child.stdin.write(`${userInfo.email}\n`);
      info('邮箱 ✔');
    }
    if (string.includes('logged')) {
      success(data);
    }
  });
}