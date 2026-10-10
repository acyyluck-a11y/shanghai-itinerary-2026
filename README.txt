上海四日行程 · GitHub Pages 发布说明
===================================

本发布包是一个独立网页：index.html。
中英文内容、样式和 9 张景点照片已经放进同一个文件；无需安装软件、无需编译、无需额外上传图片文件夹。
双击 index.html 可以先本地预览。右上角及快捷导航中的“中文 / English”可直接切换，不跳转另一个页面。

一、发布到 GitHub Pages

1. 登录 https://github.com ，新建一个 Public（公开）仓库。
   仓库名可使用 shanghai-itinerary-2026；如果已经使用这个名字，也可自选其他名称。
   创建时可以勾选 Add a README file。

2. 解压发布包。进入仓库 Code 页面，选择 Add file → Upload files。
   将 index.html、.nojekyll 和本说明 README.txt 上传到仓库最外层，并点击 Commit changes。
   关键：不要只上传 ZIP，也不要把 index.html 放在额外的一层文件夹中。
   上传完成后，在仓库首页应直接看到 index.html。

3. 打开仓库 Settings → Pages。
   Build and deployment → Source：选择 Deploy from a branch。
   Branch：选择 main；文件夹选择 /(root)，点击 Save。
   如果你的默认分支不是 main，选择实际存放 index.html 的分支。

4. 等 Pages 部署完成，点击 Pages 设置页中的 Visit site 打开。
   实际网址以 GitHub 显示的为准，通常形如：
   https://你的用户名.github.io/你的仓库名/
   这是公开网页地址；github.com 上的仓库文件地址不是网页地址。

二、分享与语言

- 页面默认中文，会记住本浏览器最后选择的语言。
- 在网页地址后加 ?lang=zh 可指定中文，?lang=en 可指定英文。
- 例如： https://你的用户名.github.io/shanghai-itinerary-2026/?lang=en
- 页面“复制分享链接”会附上当前语言；本地预览地址不会被误当作公网地址分享。
- 可用 #day1、#day2、#day3、#day4 定位日期，例如 ?lang=en#day3。
- 打印 / 存为 PDF：打印当前所选语言，自动展开每日补充说明。
- 导游核对勾选只存在当前浏览器，不是预约、付款或对外通知，也不会与访客共享。

三、已经保留的接待边界

- 负责 2026 年 10 月 12–15 日日间游览及午餐安排。
- 12 日晚餐安排保留。
- 住宿，以及 13、14、15 日晚餐均由客人自行安排。
- 酒店仅作集合及接送点。
- 本页面为规划建议；门票、餐位、游船、用车和特殊讲解仍需落实。

四、打不开时检查

- 确认打开的是 Pages 的 Visit site 链接，而非仓库文件页面。
- 确认 index.html 是小写、在所选分支最外层，不是 index.html.txt。
- 确认 Pages 的文件夹是 /(root)，不是 /docs。
- 若 GitHub Actions 显示部署未完成，等完成后再刷新；若失败，查看部署错误。
- 公共托管不需要访客登录，但实际可达性仍受访客网络环境影响。

官方操作说明：
https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

五、图片署名

网页底部的“信息来源与图片署名 / Sources and photo credits”包含来源、作者、许可证及处理说明。
发布或转发时保留这些署名。部分照片采用 CC BY-SA 许可，照片衍生版本继续遵守对应许可。

制作日期：2026 年 10 月 10 日。
