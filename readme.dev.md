
## 本地开发环境依赖安装

```shell
#创建venv虚拟环境，并激活
virtualenv -p python3.9 venv
export CC=gcc

source venv/bin/activate
# 安装python依赖
pip install -r dev-requirements.txt
pip install -e .

# 本地配置文件
cp contrib/conf/settings_local.py.tmpl settings_local.py
# 将本地配置文件中的数据库路径改为本地路径
'NAME': os.path.join(ROOT_PATH, 'db.sqlite3'),

# 有些包缺失了：
# pnpm install -D @babel/core @babel/cli uglify-js lessc rollup @rollup/plugin-babel

# 运行预初始化脚本
./contrib/internal/prepare-dev.py  
# 手动创建管理员

# 运行项目
./contrib/internal/devserver.py

# 最好去设置里先设置一下server地址为当前的：http://127.0.0.1:8080

http://127.0.0.1:8080/admin/settings/general/
```







