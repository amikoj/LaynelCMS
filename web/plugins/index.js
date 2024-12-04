// 环境变量
const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';
let env = config({ path: `../.env.${mode}` }) // 读取.env文件

console.log(`当前环境：${mode}`);
console.log(`环境变量：${JSON.stringify(env)}`);


const plugins = ;



module.exports = plugins;