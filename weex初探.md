# Weex 初探   （2017/1/6）
    操作参考官方文档： https://weex-project.io/cn/doc/advanced/create-a-weex-project.html
    
## 操作步骤（以新建android项目为例）
  1. 新建一个android项目 (android项目的配置， Android studio的配置详情参见官网或以上提到的weex官网)
  2. 打开模拟器
  3. 创建weex项目
        
        $ weexpack init appName
        
    以上命令会生成如下的目录结构
    - android
     - appframework
     - playground
    - ios
    - src
     - index.we
    - web
     - index.html
    - android.config.json
    - ios.config.json
    - package.json
    - README.md
    - start
    - start.bat
    -- webpack.config.js
    
  4. 安装依赖包
  
        $ cd appName && npm install
        
  5. 如果一切正常即可运行打包
        
        $ weexpack run android
        

    
