+++
date = "2018-08-10T13:46:11+08:00"
title = "Visual Studio Code 中的「Go配置」"
author = "赤琦"
original = ""
tags = ["Golang","VS Code","开发环境"]
+++

## 发现问题

>使用静态博客开发后Webstrom对于`{{.SIte}}`这类数据绑定的符号的格式化简直惨不忍睹，而且每次启动对于我的电脑负担真的很大，于是转向使用Visual Studio Code，不得不说对于前端这种简单的编辑使用Visual Studio Code真的是极好，良好的生态扩展和跨平台使用、还免费、极速、格式化不乱……一秒成为真爱粉！JetBrains全家桶由Visual Studio Code完美替代（当然毕竟前者是IDE，本身就大材小用了）

使用Go语言需要安装**Go for Visual Studio Code**插件，是Microsoft提供语言支持包，安装完后重新加载（请先安装golang的环境）

![](/img/go-0.jpg)

初次使用GO需要安装相关依赖，但由于网络或者是一些依赖没有安装会造成安装失败，失败输出如下：

```
Installing 14 tools at C:\User\RedBlue\go\bin
gocode
gopkgs
go-outline
go-symbols
guru
gorename
gomodifytags
goplay
impl
godef
goreturns
golint
gotests
dlv

Installing github.com/nsf/gocode SUCCEEDED
Installing github.com/uudashr/gopkgs/cmd/gopkgs SUCCEEDED
Installing github.com/ramya-rao-a/go-outline FAILED
Installing github.com/acroca/go-symbols SUCCEEDED
Installing golang.org/x/tools/cmd/guru FAILED
Installing golang.org/x/tools/cmd/gorename FAILED
Installing github.com/fatih/gomodifytags SUCCEEDED
nstalling github.com/haya14busa/goplay/cmd/goplay SUCCEEDED
Installing github.com/josharian/impl FAILED
Installing github.com/rogpeppe/godef SUCCEEDED
Installing sourcegraph.com/sqs/goreturns FAILED
Installing github.com/golang/lint/golint FAILED
Installing github.com/cweill/gotests/... SUCCEEDED
Installing github.com/derekparker/delve/cmd/dlv SUCCEEDED

6 tools failed to install.
```

## 解决

1. 打开你的GOPATH，我的目录`C:\Users\RedBlue\go`

    tip:使用`go env`查看GOPATH的位置
  
    ![](/img/go-2.jpg)  
   
    目录下有bin、src文件

2. 打开`\src\github.com`其实在这目录你会发现你安装失败的其实都已经下载好了，是真的安装失败，而不是因为网络问题。
    当然如果你是因为网络问题，你可以这样做：复制类似这样的Installing github.com/nsf/gocode FAILED的`github.com/nsf/gocode`到浏览器访问，然后git clone下来，放到src下同样的目录，像这样`\src\github.com\nsf\gocode`再执行安装（后面有命令）就可以了，对于golang.org这种（golang.org/x/tools/cmd/guru FAILED）同样的可以到[「GitHub」golang里面获取tools仓库](https://github.com/golang/tools)

    下面我就讲具体的tools怎么安装：  

    如果`\src\github.com\golang`里面已经存在`tools`文件夹那么就可以直接复制到`\src\golang.org\x`文件夹。如果不存在的需要在golang文件夹执行
    ```Bash
    git clone https://github.com/golang/tools.git tools
    ```

    你会获得tools文件夹，将整个文件夹复制到`\src\golang.org\x`目录下回到GOPAHT执行安装命令go install + 插件名称，例如安装golang.org/x/tools/cmd/guru

    ```Bash
    go install golang.org/x/tools/cmd/guru
    ```

    等待安装完成，即可

    其他插件按照此方法找对目录，执行git clone再执行git install同样就解决问题了，Go！

    #### 附快捷复制表

    ```Bash
    go install github.com/ramya-rao-a/go-outline

    go install github.com/acroca/go-symbols

    go install golang.org/x/tools/cmd/guru

    go install golang.org/x/tools/cmd/gorename

    go install github.com/josharian/impl

    go install github.com/rogpeppe/godef

    go install github.com/sqs/goreturns

    go install github.com/golang/lint/golint

    go install github.com/cweill/gotests/gotests

    ```

![](/img/Gopher-ru.png)