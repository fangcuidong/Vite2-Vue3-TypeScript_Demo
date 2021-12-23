//工作目录
const workDir = process.cwd();
//目录解析函数
const { resolve } = require('path');

//调查者，用于交互式命令行问答
const { prompt: ask } = require('inquirer');
//一个文件相关的模块，是原生 fs 模块的扩展
const { writeJSONSync } = require('fs-extra');

//此模块可以用 js 执行 shell 命令
// const { exec } = require('shelljs');
//执行 vite
// exec('vite');

//开发配置
let devConfig;
try {
  devConfig = require(resolve(workDir, 'project_modules/dev-tools/dev-config'));
} catch (e) {
  console.log(`
    配置示例：
    module.exports = {
      //环境
      environments: [
        {
          name: '开发环境', //环境名称
          url: 'http://123.456.789.012:34/', //环境地址
          internet: false //内外网：false=内网，true=外网
        },
        ... //有多个环境时继续添加
      ]
    };

    //冻结配置
    Object.freeze(module.exports);

    请在开发配置【project_modules/dev-config.js】进行环境配置【environments】（内容为各个环境的信息），配置示例在这行提示上方。
  `);
  process.exit();
}

//环境
const { environments } = devConfig;

if (!environments || !environments.length) {
  console.log(
    '开发配置【project_modules/dev-config.js】中的环境配置【environments】不能为空'
  );
  process.exit();
}

(async (_) => {
  //问题清单
  const questions = [
    {
      name: 'url',
      type: 'list',
      message: '请选择环境（用于代理）',
      choices: environments.map(({ name, url, internet }) => ({
        name: `${name}丨${internet ? '外' : '内'}网：${url}`,
        value: url,
      })),
    },
  ];

  //答案
  const answers = await ask(questions);

  //把答案写入文件，使得其他文件可以引用答案
  const pathOfDevOptionalConfig = resolve(
    workDir,
    'project_modules/dev-tools/dev-optional-config.json'
  );
  writeJSONSync(pathOfDevOptionalConfig, answers);
})();
