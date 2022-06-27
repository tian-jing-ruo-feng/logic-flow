#!/bin/sh
# 开头是标识为shell脚本，按照shell进行执行
# 出现非0错误 终止脚本
set -e
# 打印当前的目录
pwd
# 查看当前目录下的文件信息
ls -la
# 定义远程仓库变量
remote=$(git config remote.origin.url)
echo 'remote address is: '$remote

# 新建发布项目目录
mkdir git-pages-rp
cd git-pages-rp

# 创建一个新的仓库
# 设置发布的用户名、邮箱（取自环境变量）
git config --global user.email "$GH_EMAIL" >/dev/null 2>&1 # 处理不让其输出信息到控制台
git config --global user.name "$GH_NAME" >/dev/null 2>&1

# 初始化临时仓库
git init
# 同远程仓库建立关联
git remote add --fetch origin "$remote"

# 切换gh-pages分支
# 验证git 是否存在gh-pages分支， 如果存在则切换 不存在则创建一个空历史分支
if git rev-parse --verify origin/gh-pages >/dev/null 2>&1; then
  # 检出分支
  git checkout gh-pages
  # 删除掉旧的文件内容
  git rm -rf .
else 
  git checkout --orphan gh-pages
fi

# 将构建好的文件目录拷贝进去
# cp -a "../${STATIC_RESOURCE}/." .
cp -a "../${STATIC_RESOURCE}/." .
# 将所有文件添加到git
git add -A
# 添加提交内容
git commit --allow-empty -m "Deploy to GitHub pages [ci skip]" # ci skip 是为了跳过ci的构建
# 推送文件
git push --force --quiet origin gh-pages
# 资源回收，删除临时分支与目录
cd ..
rm -rf git-pages-rp

echo "Deploy Successful"