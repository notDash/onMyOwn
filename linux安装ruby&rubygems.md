# linux安装ruby&rubygems
    在linux（centos6）安装ruby&rubygems时一直提示： openssl 1.0.2j /openssl.so: undefined symbol: EC_GROUP_new_curve_GF2m。
    以下是安装步骤和解决方式：由于openssl新版本里动态链接库的信息与ruby里的不兼容，需要手动修改openssl的Makefile编译安装。
    参考：http://blog.csdn.net/zhongruixian/article/details/21076405

## 1. 安装openssl
    以下的操作如果没有权限， 需要在命令前加上  sudo 
    wget http://www.openssl.org/source/openssl-1.0.1f.tar.gz
    tar zxvf openssl-1.0.1f.tar.gz
    cd openssl-1.0.1f
    为了不要和已安装的openssl混淆，这里指定一个新的安装目录
    ./config --prefix=/usr/local/ssl 
    config之后，会生成Makefile，打开Makefile找到gcc，在CFLAG参数列表里加上-fPIC
      CC= gcc    
      CFLAG= -fPIC -DOPENSSL_THREADS -D_REENTRANT -DDSO_DLFCN -DHAVE_DLFCN_H -Wa,--noexecstack -m64 -DL_ENDIAN -DTERMIO -O3 -Wall -     DOPENSSL_IA32_SSE2 -DOPENSSL_BN_ASM_MONT -DOPENSSL_BN_ASM_MONT5 -DOPENSSL_BN_ASM_GF2m -DSHA1_ASM -DSHA256_ASM -DSHA512_ASM -DMD5_ASM -DAES_ASM -DVPAES_ASM -DBSAES_ASM -DWHIRLPOOL_ASM -DGHASH_ASM   
    make && make install
    
  
## 2. 安装ruby 
    wget http://cache.ruby-lang.org/pub/ruby/2.1/ruby-2.1.1.tar.gz
    tar zxvf ruby-2.1.1.tar.gz
    cd ruby-2.1.1
    如果是新下载的编译包， 则可直接编译。否则需要执行
    make clean
    加上openssl安装路径重新configure，如果有安装多个版本的erlang，为了可以方便找到新安装的erl，这里可以指定一个新的安装目录，示例如下：
    ./configure --with-ssl=/usr/local/ssl --prefix=/usr/local/ruby
    编译并安装
    make && make install
   
   
## 3. 安装rubygems
    wget http://production.cf.rubygems.org/rubygems/rubygems-1.3.7.tgz
    tar -zxvf rubygems-1.3.7.tgz
    cd rubygems-1.3.7
    ruby setup.rb
    
    安装完成之后， 如果需要运行 sudo ruby 提示找不到命令，需要添加一个
    连接：
    sudo ln -s /usr/local/ruby /usr/bin
