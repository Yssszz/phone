<!-- 要安装Mantine UI的步骤 -->

<!-- 第一步: a安装 Mantine 本体 -->

npm install @mantine/core @mantine/hooks

<!-- @mantine/core 是组件(Avatar、Button 那些),@mantine/hooks 是配套工具. -->

<!-- 第二步: 装 PostCSS -->

npm install --save-dev postcss postcss-preset-mantine postcss-simple-vars

<!-- 然后在项目根目录(跟 package.json 同一层)新建一个档案叫 postcss.config.cjs,内容贴这个: -->

module.exports = {
plugins: {
'postcss-preset-mantine': {},
'postcss-simple-vars': {
variables: {
'mantine-breakpoint-xs': '36em',
'mantine-breakpoint-sm': '48em',
'mantine-breakpoint-md': '62em',
'mantine-breakpoint-lg': '75em',
'mantine-breakpoint-xl': '88em',
},
},
},
};

<!-- 第四步: 启动Mantine -->
<!-- 开 Main.jsx -->

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css'; // 样式放这里
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
<StrictMode>
<MantineProvider>
<App />
</MantineProvider>
</StrictMode>
);

<!-- 问题: -->

PostCSS 到底是什么?为什么以前没做?

先讲它是什么:

Mantine 有些 CSS 写法用了「特殊语法」,浏览器看不懂。PostCSS 就是一个翻译机,负责把 Mantine 那些特殊写法,翻译成浏览器看得懂的普通 CSS。postcss-preset-mantine 就是专门翻译 Mantine 的那本「字典」。

再讲为什么你以前好像没做也没事——两个最可能的原因:

你以前是用 Mantine 的现成模板建的项目。那种模板里 PostCSS 早就帮你配好了,所以你「没做」,其实是「别人帮你做好了」。
或者你以前只用了基本组件(Button、Avatar 摆着用),没碰到需要翻译的进阶功能(像响应式 breakpoint、自己写的 Mantine 样式),所以没翻译也刚好没出问题。
