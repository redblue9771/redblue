+++
date = "2019-01-06"
description = ""
title = "嵌入式「Linux」基础"
[info]
    name = "赤琦"
    url = ""
+++
# 嵌入式 Linux 应用

## 基本概念

### 定义及组成

* 嵌入式系统是以**应用**为中心，以计算机技术为基础，软硬件可裁剪，适应应用系统对功能、可靠性、成本、体积、功耗有严格要求的专用型计算机系统。

* 组成：嵌入式微处理器、外围硬件设备、嵌入式操作系统、特定的应用程序

* 三要数：**嵌入性**、**专用性**、**计算机系统**

### ARM 的硬件结构

* ARM 是 32 位 **RISC** 处理器

* 类型：ARM 710系列、ARM 940T、920T系列、StrongARM

* S3C6410 有 **10** 组外部中断

* S3C6410 寄存器：

    * GPxCON：端口配置寄存器

    * GPxDAT：端口数据寄存器

    * GPxPUD：上/下拉寄存器

    * GPxCONSLP：睡眠模式配置寄存器

    * GPxPUDSLP：睡眠模式上/下拉寄存器

* S3C6410 的中断控制寄存器类型：**EINT 控制寄存器**；其工作模式是：**高/低电平**

### Linux 文件系统

* /bin 存放二进制文件和普通用户常用的命令

* /boot 存放内核和引导文件（例如 GRUB）

* /dev 存放设备文件

* /etc 存放系统配置文件

* /home 普通用户的默认目录

* /lib 存放库文件

* /lost+found 存放系统奔溃或者意外关机产生的碎片文件

* /mnt 存储设备的挂载目录

* /opt 可选目录，即用户可以自定义的安装目录

* /proc 系统运行时的内核和进程信息

* /root 超级权限 root 用户的目录

* /sbin 存放仅超级权限用户可以执行的管理系统的命令

* /tmp 存放程序运行时的临时文件

* /usr 系统存放与程序相关的文件

* /sys 存放系统核心文件

* /media 用于挂载

* /cdrom 光驱目录

* /var 大文件的溢出区

* /usr/local 默认的编译安装目录

### 常用命令

```bash
cp bg.png img
# 复制 bg.png 到 img 目录下

mv costom.css css/index.css
# 移动 custom.css 文件到 css 目录下 并重命名为 index.css

cd ../
# 放回上一级目录

ls
# 列出所有目录和文件

mkdir xxx
# 新建 xxx 目录

rmdir xxx
# 删除 xxx 目录

man rm
# 查看 rm 命令的帮助文档

pwd
# 列出工作路径

find xxx
# 查找 xxx 文件

rm -rf xxx
# 强制删除 xxx 目录所有内容

ifconfig
# 列出网卡配置（同时也可以配置）

ping redblue.ga
# 网络链路测试

lsmod
# 列出模块

insmod xxx
# 安装模块

rmmod xxx
# 移除模块

tar -zxvf xxx.tar.gz
# 解压 xxx.tar.gz

tar -jxvf xxx.tar.bz2
# 解压 xxx.tar.bz2

```

### GCC 的使用

```bash
gcc -E main.c -o main.i
# 预处理时停止

gcc -S main.i -o main.s
# 编译到汇编阶段停止

gcc -c main.s -o main.o
# 汇编成目标文件

gcc main.o -o main
# 链接成为可执行的二进制文件

```

### GDB 的使用

```bash
gcc -Wall -g main.c -o main

gdb -q main
(gdb) l
# 列出源程序
(gdb) b 行号
# 在某行断点
(gdb) n
# 执行下一单步
(gdb) r
# 继续执行
(gdb) p xxx
# 打印 xxx 的值
(gdb) q
# 推出

```

### 字符设备的代码

```c
static struct file_operations keybd_fops = {
    open : keybd_open,
    read : keybd_read,
    release : keybd_release,
};
int keybd_open(struct inode *inode, struct file *filp) 
{
    printk("open ok\n");
    return 0;
}
ssize_t keybd_read(struct file *fp, char *buf,
                   size_t size)
{
    ……
}
int keybd_release(struct inode *inode, struct file *filp)
{
    printk("release ok\n");
    return 0;
}
ssize_t led_write(struct file *fp, char *buf,
                  size_t size)
{
    ……
}
int __init keybd_init(void)
{
    ……
}
static void __exit keybd_exit(void)
{
    devfs_unregister(devfs_keybd);
}
module_init(keybd_init); 
module_exit(keybd_exit); 
```

### 按键驱动

```c
// 初始化设备，将引脚设置为中断模式
void init_dev(void)
{
    s3c_gpio_cfgpin(key_table[0], S3C_GPIO_SFN(2));
    s3c_gpio_cfgpin(key_table[1], S3C_GPIO_SFN(2));
    s3c_gpio_cfgpin(key_table[2], S3C_GPIO_SFN(2));
    s3c_gpio_cfgpin(key_table[3], S3C_GPIO_SFN(2));
    s3c_gpio_cfgpin(key_table[4], S3C_GPIO_SFN(2));
    s3c_gpio_cfgpin(key_table[5], S3C_GPIO_SFN(2));
    
    unsigned int tmp;
    tmp = readl(S3C64XX_GPNCON);
    printk("%x\n", tmp);
}

// 请求中断
ret = request_irq(key_irqs[num].irq, keys_interrupt, key_irqs[num].flags, key_irqs[num].name, (void *)&key_irqs[num]);

// 等待中断触发事件
wait_event_interruptible(key_waitq, ev_press);

//当中断发生时，调用中断处理函数。当外部中断发生时，request_irq()当中最后一个参数将提供给中断处理函数
static irqreturn_t keys_interrupt(int irq, void *dev_id)
{
    struct key_irq *key_irqs = (struct key_irq *)dev_id;
    int down;
    int number;
    unsigned tmp;

    number = key_irqs->number;
    printk("number = %d\n", number);
    switch (number)
    {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
        tmp = readl(S3C64XX_GPNDAT);
        down = !(tmp & (1 << number));
        break;

    default:
        down = 0;
    }

    if (down != (key_values[number] & 1))
    {
        key_values[number] = '0' + down;
        ev_press = 1;

        wake_up_interruptible(&key_waitq);
    }

    printk("interrupt\n");
    return IRQ_RETVAL(IRQ_HANDLED);
}

// 释放中断
free_irq(key_irqs[i].irq, (void *)&key_irqs[i]);

```

### LED 驱动程序的动态加载

1、 开发板上电，进入 NFS

2、 将 led_app 和 led.ko 拷贝到挂载的NFS文件系统中

3、 切换到串口终端 `ls` 查看是否拷贝成功

4、 动态加载驱动代码 `insmod led.ko`

5、 查看驱动设备号 `cat /proc/devices`

6、 根据驱动设备号创建设备文件 `mknod /dev/myled c 253 0`

7、 `./led_app 1` 来测试灯是否亮；`./led_app 0` 测试关闭灯

### makefile 注释样例

#### 样例 1
```makefile
edit: main.o kbd.o command.o
# 定义目标文件 edit 和源文件 main.o 等
    gcc -o edit main.o kbd.o command.o
    #定义 edit 的编译方法
main.o: main.c defs.h
# 定义目标文件 main.o 和源文件 main.c defs.h
    gcc -c main.c
    # 定义 main.o 的编译方法
kbd.o: kbd.c defs.h command.h
# 定义目标文件kbd.o和源文件
    gcc -c kbd.c
    # 定义 kbd.o 的编译方法
command.o: command.c defs.h command.h
# 定义目标文件command.o和源文件
    gcc -c command.c
    # 定义 command.p 的编译方法
clean:
# 定义伪目标
    rm edit main.o kbd.o command.o display.o insert.o
    # 删除目标文件
```
#### 样例 2
```makefile
CC = /opt/host/armv4l/bin/armv4l-unknown-linux-gcc
# 定义 gcc
LD = /opt/host/armv4l/bin/armv4l-unknown-linux-ld
# 定义 ld
CFLAGS = -I/HHARM9-EDU/kernel/include/linux -Wall
# 定义编译选项
led.o: led.c
# 定义目标和源文件
    $(CC) $(CFLAGS) -g led.c -o led
    # 编译方法
    cp led.o / -f
    # 复制 led.o 到 /
.PHONY: clean
# 定义伪目标
clean:
# 定义clean
    -rm -f *.o
    # 删除中间文件  
```