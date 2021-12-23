module.exports = {
  //环境
  environments: [
    {
      name: '测试环境',
      url: 'http://localhost:8888',
      internet: false, //内网
    },
    {
      name: '测试环境',
      url: 'https://www.xxx.com/',
      internet: true, //外网
    },
    {
      name: '正式环境',
      url: 'http://www.xxx.com/',
      internet: true, //外网
    },
  ],
};

Object.freeze(module.exports);
