
## 本地开发环境依赖安装

```shell
#创建venv虚拟环境，并激活， 这个用哪个虚拟环境都行
virtualenv -p python3.9 venv
export CC=gcc

source venv/bin/activate

# 有一个坑，需要先安装开发版本的djblets，否则会报错
# 这里版本需要对应
git clone https://github.com/djblets/djblets.git -b release-5.2.x
cd djblets && pip install -e . && cd ..

# 安装python依赖
# pip install -r dev-requirements.txt
# pip install -e .
python ./setup.py develop
# 环境准备
python ./contrib/internal/prepare-dev.py
# 启动开发环境
./contrib/internal/devserver.py


# 运行预初始化脚本
./contrib/internal/prepare-dev.py  
# 手动创建管理员

# 运行项目
./contrib/internal/devserver.py

# 最好去设置里先设置一下server地址为当前的：http://127.0.0.1:8080

http://127.0.0.1:8080/admin/settings/general/
```







