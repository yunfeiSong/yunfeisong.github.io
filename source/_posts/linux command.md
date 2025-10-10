---
title: Linux 命令
tags: [Linux]
index_img: /img/linux.jpg
date: 2019-10-10 10:00:00
---

### linux command

*   查看文件内容，并清屏显示
    
        more -dc filename

*   more 命令也可以查看 nginx 的进程 id
   
        more logs/nginx.pid
    
    同 cat 命令

        cat logs/nginx.pid
    
*   date命令
    ```bash
    date #查看当前时间
    date -r filename #查看文件最后的修改时间
    date -d yesterday #字符串显示昨天的日期
    date +%Y-%m-%d #格式化显示日期
    ```
*   定时任务 crontab
    
    ```bash
    crontab -l #linux 系统的定时任务，-l 列出定时任务的列表
    crontab -e #-e 编辑定时任务列表
    例子：
    * * * * * command #每分钟执行一次，command 可以是命令也可以是脚本的路径
    5 0 * * * /usr/local/nginx/logback.sh #每天凌晨0点5分执行
    ```

*   系统服务，添加至开机启动 chkconfig
    
    ```bash
    vim /etc/init.d/nginxd #编写可执行的脚本文件，放置于 /etc/init.d/ 下
    insert "#chkconfig 2345 88 11" #在 nginxd 文件头部添加开机启动配置
    chkconfig nginxd #添加至开机启动
    
    #chkconfig 2345 88 11
    2345 表示开机启动的等级，即在什么情况下自动启动
    88  代表开启服务的顺序，越大越晚启动
    11  代表关闭服务的顺序，越小越晚关闭，
        有些任务可能存在依赖关系，自写的服务，应晚启动、晚关闭
    ```
    
    
*   journalctl 检查系统日志 systemd
    
    ```bash
    journalctl -xe #从日志最下方开始，附带说明文本，可用于查看 keepalived 的运行日志
    ```