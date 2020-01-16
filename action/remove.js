const prompt = require('inquirer').createPromptModule();
const { configFilePath } = require('../config/index');
const { writeFile, readFile } = require('../util/secure.local.file');
const { success } = require('../util/xlog');

module.exports = async () => {
  const config = readFile(configFilePath);
  const { key } = await prompt({
    name: 'key',
    message: '请选择要移除的账号',
    type: 'list',
    choices: Object.keys(config)
  });
  const { bool } = await prompt({
    name: 'bool',
    message: `将要移除 ${key}, 请确认`,
    type: 'confirm',
  });
  if (!bool) process.exit(0);
  delete config[key];
  writeFile(configFilePath, config);
  success('恭喜，移除成功！');
}