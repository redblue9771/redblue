+++
date = "2018-08-10T13:46:11+08:00"
title = "Visual Studio Code 中的「Go配置」"
slug = "visual-studio-code-for-go"
[info]
    name = "赤琦"
    url = ""
+++
## 发现问题

期末考过去了，之前就有决定把博客从那个美国巨慢服务器+WordPress上迁移过来，于是选择了静态博客部署，之前一直用JetBrains的Webstrom进行前端开发，后来发现使用静态博客开发后Webstrom对于 {{.SIte}} 这类数据绑定的符号的格式化简直惨不忍睹，而且每次启动对于我的电脑负担真的很大，于是转向使用Visual Studio Code，不得不说对于前端这种简单的编辑使用Visual Studio Code真的是极好，良好的生态扩展和跨平台使用、还免费、极速、格式化不乱……一秒成为真爱粉！JetBrains全家桶由Visual Studio Code完美替代（当然毕竟前者是IDE，本身就大材小用了）

可是当我开心的运用Visual Studio Code写代码的时候，问题来了！由于需要使用Go语言写些东西，打开扩展商店的时候轻松搜索到了**Go for Visual Studio Code**插件，是Microsoft提供语言支持包，安装完后重新加载

![](/img/go-0.jpg)

本以为可以愉快的写代码了，结果提示需要update or install相关插件！你说安装就算了吧，画面是这样的：

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

突然崩溃，虽然有点小错误是正常的，我一直以为是需要翻墙，可是当我打开代理的时候，它还是FAILED！翻遍百度，各种复杂的配置（这真的是我以为的配置简单的VSCode吗？！？！

## 解决

根本不需要那么复杂的配置

下面的会从头讲安装，已经配置好Go环境需要直接修复FAILED请往下走

### 安装Go Programming Language

尽管2018年8月传出Google定制回归的消息，但是Go Programming Language的官网始终是上不去的，你有几种选择

* 翻墙（显然不合适）
* [GitHub](https://github.com/golang/go) 源码安装 - 懂得技术安装
* 当然是一键[安装包](https://studygolang.com/dl)了（推荐） 选择适合你系统版本的安装包进行安装（一直下一步就不说了）

安装完后在Windows PowerShell中执行go env查看环境是否正确配置，主要查GOROOT和GOPATH是否有值，一般这个操作不会出问题，一键安装包已经帮你搞定了

![](/img/go-1.jpg)

如若真的翻车，请使用百度

### 安装Visual Studio Code

这个不多说了吧，我起先在Visual Studio Code的官网发生了被墙事件，转而到[Visual Studio官网](https://visualstudio.microsoft.com)下载

### 配置GO for Visual Studio Code

安装完微软提供的插件，任意打开一个\*.go文件右下角会出现update或者Install tool的提示，点击后会有一些插件正常安装，如一开始提到的错误代码

然后对于FAILED的工具我们进行这样的操作：

1. 打开你的GOPATH，这个目录在上述运行go env中就有，VSCode在默认配置下使用系统环境（当然你也可以自行配置），我的目录C:\\Users\\RedBlue\\go
  
    ![](/img/go-2.jpg)  
   
    目录下有bin、src文件
2. 打开\\src\\github.com其实在这目录你会发现你安装失败的其实都已经下载好了，是真的安装失败，而不是因为网络问题。当然如果你是因为网络问题，你可以这样做：复制类似这样的Installing github.com/nsf/gocode FAILED的github.com/nsf/gocode到浏览器访问，然后git clone下来，放到src下同样的目录，像这样\\src\\github.com\\nsf\\gocode再执行安装（后面有命令）就可以了，对于golang.org这种（golang.org/x/tools/cmd/guru FAILED）同样的可以到[GitHub golang里面获取tools仓库](https://github.com/golang/tools)，下面我就讲具体的tools怎么安装：  
如果\\src\\github.com\\golang里面已经存在文件夹那么就可以直接复制到\\src\\golang.org\\x文件夹。如果不存在的需要在golang文件夹执行
```
 git clone https://github.com/golang/tools.git tools
```
你会获得tools文件夹，将整个文件夹复制到\\src\\golang.org\\x目录下回到GOPAHT（我的：C:\\Users\\RedBlue\\go）执行安装命令go install + 插件名称，例如安装golang.org/x/tools/cmd/guru
```
go install golang.org/x/tools/cmd/guru
```
等待安装完成，即可
其他插件按照此方法找对目录，执行git clone再执行git install同样就解决问题了，Go！

![](/img/Gopher-ru.png)