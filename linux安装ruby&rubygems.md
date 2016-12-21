# linux安装ruby&rubygems
  在linux（centos6）安装ruby&rubygems时一直提示： openssl 1.0.2j /openssl.so: undefined symbol: EC_GROUP_new_curve_GF2m。
  以下是安装步骤和解决方式：由于openssl新版本里动态链接库的信息与ruby里的不兼容，需要手动修改openssl的Makefile编译安装。
  参考：http://blog.csdn.net/zhongruixian/article/details/21076405

## 1. 安装openssl
  wget http://www.openssl.org/source/openssl-1.0.1f.tar.gz
  tar zxvf openssl-1.0.1f.tar.gz
  cd openssl-1.0.1f
  为了不要和已安装的openssl混淆，这里指定一个新的安装目录
  ./config --prefix=/usr/local/ssl 
  config之后，会生成Makefile，打开Makefile找到gcc，在CFLAG参数列表里加上-fPIC
  
  
## 2. 安装ruby 
  wget http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.1.tar.gz
  tar zxvf ruby-2.1.1.tar.gz
  cd ruby-2.1.1
