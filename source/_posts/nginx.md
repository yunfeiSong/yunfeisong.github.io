---
title: Nginx 简介
tags: [Nginx]
index_img: /img/nginx.jpg
date: 2019-10-10 10:00:00
---

#### <span id="start">安装</span>

1、 在 nginx [官网](http://nginx.org "http://nginx.org")下载指定版本的 tar.gz文件，通过 ftp 工具上传至服务器，解压缩。<br />
也可以通过 `wget` 下载工具直接从网络下载。

    wget nginx.org/download/nginx-1.17.4.tar.gz

2、 安装依赖包：`pcre、pcre-devel、zlib、zlib-devel、openssl、openssl-devel`<br />
pcre 提供正则表达式支持，zlib 提供压缩格式支持，openssl 提供 加密、ssl 和证书支持

> 查看是否安装了相关程序包

    yum list pcre pcre-devel zlib zlib-devel openssl openssl-devel

> 安装程序包

    yum install -y pcre #安装 pcre 的同时，会连带 pcre-devel 一同安装

3、 编译和安装

> 在解压后的目录下有一个二进制执行文件 `configure` 是 nginx 提供的编译执行程序<br />用来生成编译所需的 `makefile` 文件

        cd nginx-1.17.4 #切换到解压文件夹
        ./configure --help #使用 help 参数查看 configure 都支持哪些参数选项
        ./configure #如果不需其他模块支持，直接直接该二进制程序即可，如果需要，后跟 --with-xxx

> 执行完 `configure` 程序后，对项目进行编译和安装，默认的安装路径为 `usr/local/nginx`<br />安装完成后在该目录下的 `sbin` 文件夹下会生成 `nginx` 可执行程序

    make && make install #编译并安装，&& 代表前一条命令执行成功后才会执行右边的命令

#### 启动

> 在 nginx 根目录下的 **sbin** 文件夹中，有一个名为 `nginx` 的二进制文件，通过操作它操作 <font color="red">nginx</font>。

*   操作二进制文件

        nginx -h/?  --查看帮助
        nginx -t    --测试 nginx.conf 文件是否有语法错误
        nginx -s stop/quit/reopen/reload    --停止/优雅的停止/重新打开日志文件/重新加载配置文件
        nginx -g daemon off; --ngnix 运行在前台，禁止在后台运行

> 将`nginx`添加到环境变量 `$PATH` 中

*   查看当前环境变量下都有哪些路径

          echo $PATH

*   `/usr/local/sbin`目录在环境变量中，则创建软连接到 `/usr/local/sbin`目录下，即可将 nginx 命令加入环境变量`$PATH`中

          ln -s /usr/local/nginx/sbin/nginx /usr/local/sbin/nginx

*   也可以将 `/usr/local/nginx/sbin` 路径添加入 `$PATH` 环境变量中
    ```bash
    vim /etc/profile #编辑 profile 文件，在末尾添加如下命令
    export PATH=$PATH:/usr/local/nginx/sbin #追加路径至 $PATH 环境变量中
    source /etc/profile #使修改生效，否则需要重启生效
    ```

> 将`nginx`添加到系统服务`service`中

*   系统服务以`service xxx start/status/stop/restart`等形式执行，实际上是执行的`/etc/init.d/`目录下的名为`xxx`脚本文件，并将参数传入脚本中执行。故需编写`nginxd`脚本文件，置于该目录下：

    ```bash
    #!/bin/bash
    #chkconfig: 35 85 15

    nginxd=/usr/local/nginx/sbin/nginx

    case $1 in

        start)
        echo "starting nginx..."
        $nginxd && echo "start success"
        ;;
        stop)
        echo "stopping nginx..."
        $nginxd -s quit && echo "stop success"
        ;;
        status)
        echo "querying nginx..."
        if [ $(ps -ef|grep nginx|grep -v grep|grep -v $$|wc -l) -eq 0 ];then
        	echo "nginx is not active."
        else
        	echo "nginx is active."
        fi
        ;;
        restart)
        echo "restarting nginx..."
        if [ $(ps -ef|grep nginx|grep -v grep|grep -v $$|wc -l) -eq 0 ];then
        	echo "nginx is not active. start it now."
        	$nginxd
        else
        	$nginxd -s quit && echo "stop success" && $nginxd && echo "restart success"
        fi
        ;;
        reload)
        echo "reloading nginx..."
        if [ $(ps -ef|grep nginx|grep -v grep|grep -v $$|wc -l) -eq 0 ];then
        	echo "nginx is not active. start it now."
        	$nginxd
        else
        	$nginxd -s reload && echo "reload success"
        fi
    esac
    ```

> 将`nginx`添加开机启动

*   开机启动程序配置在`/etc/rc数字.d`文件中，实际上是`/etc/init.d/`目录下脚本的同名软连接，所以 add 命令后直接跟 nginxd 即可，使用 chkconfig 命令添加。<br />
    开机启动实际上是调用脚本文件并传入 start 参数，相当于`service nginx start`或`nginx -s start`

        chkconfig --add nginxd

#### 配置文件 nginx.conf

> 配置文件存放在安装目录下的 **conf** 文件夹中，每个文件都有一个同名的 `.default` 结尾的备份文件，**nginx.conf** 是主配置文件，其他配置文件都与其关联。

*   文件结构
    ```bash
    main                #设置用户和用户组，日志位置，子进程数等
    events{}            #设置处理连接的方式
    http{               #配置处理 http 请求的方式
        server{         #配置虚拟主机，可以配置多个
            location {} #单个虚拟主机中，分为多个文件路径
        }
        ...
    }
    ```

*   完整 nginx.conf 如下：

        #user  nobody; #设置用户和用户组，主进程默认所属用户为 **root**，设置用户只针对工作子进程，默认为 nobody，即不属于任何人
        user root root; #设置用户和组为 root,相应的日志文件等所属一并修改，目的为某些操作提供权限。或者在 执行 configure 编译时，指定 --user=xxx --group=xxx
        worker_processes  1; #工作子进程个数，建议设置为 cpu 个数 * cpu 核数

        #error_log 和 access_log 都是默认开启的，error_log 默认为 error 等级，最详细的是 debug 等级，server 或 location 都可单独配置 log

        access_log off; #关闭 access_log 功能
        error_log /dev/null; #关闭 error_log 功能

        #error_log  logs/error.log;
        #error_log  logs/error.log  notice;
        #error_log  logs/error.log  info;

        #pid        logs/nginx.pid; #设置 pid 的位置，默认在 logs/nginx.pid

        events {
            worker_connections  1024; #单个子进程最大连接数
        }

        http {
            include       mime.types; #引入配置文件，此处为相对路径（/usr/local/nginx/conf）
            default_type  application/octet-stream; #默认的文件类型
            log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                            '$status $body_bytes_sent "$http_referer" '
                            '"$http_user_agent" "$http_x_forwarded_for"';
            #access_log  logs/access.log  main;
            sendfile        on; #开启高效文件传输模式
            tcp_nopush     on; #将响应头和正文一起返回
            tcp_nodelay    on; #取消响应的时延，默认为 on
            server_tokens   off; #关闭在请求响应中 server 信息显示 nginx 版本信息
            
            #keepalive_timeout  0;
            keepalive_timeout  65; #设置长连接超时时间
            gzip  on;
            
            #include 可实现将配置保存在外部文件中，使用 include 引入，使 nginx.conf 看起来不会太冗长
            #include	vhost.conf/upstream.host.conf; #引入单个配置文件
            include	vhost.conf/*.conf; #批量引入文件
            
            autoindex on; #nginx 默认不允许显示目录，当目录下
                          #缺少 index 索引文件时，返回 403 错误
                        #设置目录列表，此处为允许所有虚拟主机均可展示目录详情
                          #也可设置在 server 或 location 内，表示允许的范围不同
            
            #deny all; #禁止所有用户访问所有主机，优先级低于 server 内的配置
            
            server {
        	    listen 80; #指定监听端口号
        	    server_name dongliulin.com; #基于域名配置虚拟主机

        	    location / {
        	        root html/dongliulin; #指定根目录位置
        	        index index.html; #指定首页/缺省页名称
        	    }
            }
            server {
        	    listen 8080;
        	    server_name 192.168.1.156; #基于 IP 配置虚拟主机，并指定端口号 

        	    location / {
        	        root html/dongliulin;
        	        index ip.html;
        	    }
        	    access_log logs/dongliulin/access.log main; #指定日志文件存储路径，支持一个 server 一个日志存储位置
        	    
        	    allow 192.168.1.58; #y允许指定 IP 用户访问
        	    deny all; #禁止其他所有用户访问，内层配置优先于外层配置，即 location > server > http
            }
            server {
                listen       80;
                server_name  localhost;
                #charset koi8-r;
            	access_log  logs/host1.access.log  main;
                root html;
                location / {
                	index index.html index.htm;
                }
                error_page  404              /404.html; #自定义错误页面，响应指定的状态码到指定页面，此处根目录已设置为 html
                error_page  403              http://example.com/403.html; #也可以跳转到线上的某个页面
                error_page  401   =200       /401.html; #修改响应中的状态码为 200
                error_page  400   =          /400.html; #不指定具体的修改值，以跳转后的处理结果的状态码作为此次请求的响应状态码

                # redirect server error pages to the static page /50x.html
                #
                error_page   500 502 503 504  /50x.html; #响应多个状态码以空格分隔，重定向到下面的 location
                location = /50x.html {
                    root   html;
                }
                # proxy the PHP scripts to Apache listening on 127.0.0.1:80
                #
                #location ~ \.php$ {
                #    proxy_pass   http://127.0.0.1;
                #}
                # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
                #
                #location ~ \.php$ {
                #    root           html;
                #    fastcgi_pass   127.0.0.1:9000;
                #    fastcgi_index  index.php;
                #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
                #    include        fastcgi_params;
                #}
                # deny access to .htaccess files, if Apache's document root
                # concurs with nginx's one
                #
                #location ~ /\.ht {
                #    deny  all;
                #}
            }


            # another virtual host using mix of IP-, name-, and port-based configuration
            #
            #server {
            #    listen       8000;
            #    listen       somename:8080;
            #    server_name  somename  alias  another.alias;

            #    location / {
            #        root   html;
            #        index  index.html index.htm;
            #    }
            #}


            # HTTPS server
            #
            #server {
            #    listen       443 ssl;
            #    server_name  localhost;

            #    ssl_certificate      cert.pem;
            #    ssl_certificate_key  cert.key;

            #    ssl_session_cache    shared:SSL:1m;
            #    ssl_session_timeout  5m;

            #    ssl_ciphers  HIGH:!aNULL:!MD5;
            #    ssl_prefer_server_ciphers  on;

            #    location / {
            #        root   html;
            #        index  index.html index.htm;
            #    }
            #}

        }

#### 虚拟主机配置

*   在 nginx 的配置文件 nginx.conf 中有如下一段配置，代表一个虚拟主机的基本配置
        # another virtual host using mix of IP-, name-, and port-based configuration
        #
        #server {
        #    listen       8000; 端口或者 域名/ip 只能选其一
        #    listen       somename:8080;
        #    server_name  somename  alias  another.alias;

        #    location / {
        #        root   html;
        #        index  index.html index.htm;
        #    }
        #}

> 基于端口的配置

*
        server {
            listen          8080;
            server_name     192.168.1.156;
            root            html;

            location / {
                index index.html index.htm;
            }
        }

> 基于 IP 的配置

*
        server {
            listen          8080;
            server_name     192.168.1.156;
            root            html;

            location / {
                index index.html index.htm;
            }
        }

> 基于域名的配置

*
        server {
            listen          8080;
            server_name     www.example.com example.com; #可写多个域名
            server_name     *.example.com; #前缀使用通配符
            server_name     www.example.*; #后缀使用通配符
            server_name     *\.example\.com$; #匹配正则
            
            #优先级：精准域名 > 前缀通配符 > 后缀通配符 > 正则表达式
            
            root            html;

            location / {
                index index.html index.htm;
            }
        }

#### localtion 匹配规则

格式：location 前缀 uri {}，前缀有 `=、^~、~、~*、@` 五种。<br />
除 `=` 精准匹配外，其他匹配原则都是从上到下最大前缀匹配，即 uri 谁匹配的最多选择谁，匹配之后立即退出，余下 location 不在匹配。<br />

> 优先级：**`= > ^~ > ~/~* > 一般匹配`**

> location / xxx{} 和 location = / xxx{} 的区别<br />
> 前者可匹配任意 uri 或网站根目录，代表网站的默认配置，后者只能匹配根目录本身。

> root 和 alias<br />
> 前者会将请求的 uri 和 root 的值进行拼接，后者不会。

*   精确匹配
        location = /ref.htm {
            root   html;
            index  index.html index.htm;
        }

*   一般匹配
        location /ref.htm {
            root   html;
            index  index.html index.htm;
        }

*   正则匹配(区分大小写)
        location ~ /ref {
            root   html;
            index  index.html index.htm;
        }

*   正则匹配(不区分大小写)
        location ~* /ref {
            root   html;
            index  index.html index.htm;
        }

*   不使用正则匹配
        location ^~ /ref {
            root   html;
            index  index.html index.htm;
        }

*   @ 定义 location 块
        location @name /ref {
            root   html;
            index  index.html index.htm;
        }

#### 日志备份

*   日志格式化(在 nginx 中是默认开启的，包括日志的存放位置)
        log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                          '$status $body_bytes_sent "$http_referer" '
                          '"$http_user_agent" "$http_x_forwarded_for"';
        nginx 内置变量：              
        $remote_addr #客户端 ip
        $remote_user #客户端用户名
        $time_local #本地时间
        $request #请求的 uri 和 http 协议类型
        $status #请求的响应状态码
        $body_bytes_sent #发送给客户端主体文件的大小
        http_referer #来路 url 地址
        $http_user_agent #客户端浏览器信息
        $http_x_forwarded_for #客户端 ip 列表，包括经过的代理

*   编写 shell 脚本，执行日志备份

    ```bash
    #!/bin/bash
    #

    echo start logback

    mv -v /usr/local/nginx/logs/access.log
    /usr/local/nginx/data/logback/$(date -d yesterday +%Y-%m-%d).access.log
    #将日志移动到备份日志目录并重命名

    #方式一：使用信号量 -usr1 重新生成新的日志
    touch /usr/local/nginx/logs/access.log #生成新的日志文件
    kill -usr1 `more /usr/local/nginx/logs/nginx.pid` #日志更新，重新打开日志

    #方式二：使用 nginx -s reopen 命令重新生成新的日志
    /usr/local/nginx/sbin/nginx -s reopen #重新打开日志，即创建新的日志文件
    echo end logback
    ```

*   使用 linux 的定时任务 crontab，实现日志的定时备份

    ```bash
    crontab -l#查看当前用户的定时任务列表
    crontab -e#编辑列表
    crontab -r#删除列表
    #编辑列表，键入 cron 表达式，格式为
    #    分 时 日 月 周 命令
    键入 0 0 * * * /usr/local/nginx/logback.sh > /dev/null 2 > &1 #每日的凌晨零点零分进行日志备份，
    #并将脚本执行的输出和结果舍弃保存退出后即时生效
    ```

#### 重写和重定向 rewrite

*   使用 last、break 选项，则为重写，url 地址不变，使用 redirect、permanent 为重定向，url 地址改变

    ```
    server {
        listen 8083;
        server_name 192.168.1.156;
        root html;
        index index.html;
        location / {
            #如果请求的文件不存在，就将请求重写到指定页面
            if ( !-e $request_filename ) {
                rewrite "^/.*" /default.html break;
            }
        }
    }

    rewrite 可后跟四种标志位：
    last        #跳过当前 rewrite 规则，继续下一条
    break       #终止匹配，跳出
    redirect    #临时重定向，url会改变，浏览器会保留旧地址的访问记录
    permanent   #永久重定向，url会改变，浏览器不保留旧地址

    ```

#### 使用 gzip 进行压缩，节省流量

*   gzip 可以设置在 http、server、location 内，达到不同的控制效果
    ```
    gzip                on/off; #开启或关闭 gzip 功能
    gzip_types          test/plain application/javascript test/css; #指定需要压缩的数据类型，
    #不要多图片类型压缩，图片本身已是压缩格式，适得其反
    gzip_buffers        4 20k; #指定压缩文件的存放空间大小
    gzip_min_length     5k; #指定多大长度以上的数据才进行压缩
    gzip_comp_level     4; #指定压缩比例,1-10,推荐 4
    gzip_http_version   1.0; #指定http请求类型进行压缩，默认是 1.1

    ```

#### 缓存 expires 设置过期时间

*   时间未到，浏览器不会再次发起请求
        location ~ \.(js|css)$ {
            expires    12h; #12小时后过期
        }

        location ~ \.(jpg|jpeg|png|gif|swf)$ {
            expires    30d; #30天后过期
        }

#### 反向代理 proxy\_pass 参数

*   使用 proxy\_pass 参数实现请求的跳转
        server {
            listen        80;
            server_name   example.com;
            
            location / {
                proxy_pass http://192.168.1.1; #请求转发至 192.168.1.1
            }
        }

*   proxy\_pass 有关的指令参数
        location / {
                proxy_pass http://testus;
                proxy_set_header Host $host; #传递客户端的请求头
                proxy_set_header X-Real-IP $remote_addr; #传递客户端的真实ip
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
                #将客户端的真实ip追加到请求头后
            }

#### 负载均衡 up\_strean 定义服务器组，在 proxy\_pass 中引用

*   负载均衡（load balance）方式

    1、轮询，默认的方式，即 weight 都是 1；

        upstream testus {
            server 192.168.1.156:8081;
            server 192.168.1.156:8082;
            server 192.168.1.156:8083 backup; #后备主机，当其他主机都宕机后，由该主机处理请求
            server 192.168.1.156:8083 down; #down 表示不参与轮询
        }

    2、权重（加权轮询），即改变主机的权重比例<br />
    所有主机的权重值之和为一轮，每个主机的权重值代表该主机在本轮会被轮询到几次

        upstream testus {
            server 192.168.1.156:8081 weight=1 max_fails=1 fails_timeout=60;
            #max_fails 代表最大失败次数，就把该主机暂停服务，fail_timeout 代表暂停服务的时间
            server 192.168.1.156:8082 weight=3;
            server 192.168.1.156:8083 backup;
        }

    3、ip\_hash<br />
    按照客户端的 ip 地址的 hash 值来分配请求，即做到固定 ip 访问固定虚拟主机，解决 session 共享的问题。<br />
    在该模式下，weight 等参数无效，且不能使用 backup 参数；

        upstream testus {
            ip_hash;
            server 192.168.1.156:8081 weight=1 max_fails=1 fails_timeout=60;
            server 192.168.1.156:8082 weight=3;
            server 192.168.1.156:8083 down;
        }

    4、第三方模块
    需要下载第三方模块并与 nginx 一同编译安装，常用的有 fair 模式，根据服务器响应时间分配，时间短的优先。
*   upstream 和 proxy\_pass

    ```bash
    upstream testStream { #配置服务器组
        server 192.168.1.156:8081 weight=1; #默认的 weight 为 1；
        server 192.168.1.156:8082 weight=1;
    }

    server {#模拟后端服务器1
        listen 8081;
        server_name 192.168.1.156;

        location / {
            root html/8081/test;
            index index.html;
        }

        access_log logs/8081/access.log main;
    }

    server {#模拟后端服务器2
        listen 8082;
        server_name 192.168.1.156;

        location / {
            root html/8082/test;
            index index.html;
        }

        access_log logs/8082/access.log main;
    }

    server {#接收请求地址，进行分发
        listen 8080;
        server_name 192.168.1.156;

        location / {#分发到 testStream 服务器组
            proxy_pass http://testStream;
        }

        access_log logs/dongliulin/access.log main;
    }
    ```

#### 缓存

*   永久缓存，缓存在服务器磁盘上。使用 proxy\_store 指令
    ```
    location / {
        proxy_store on; #开启本地存储
        proxy_store_access user:rw group:rw all:r; #设置缓存文件权限
        proxy_temp_path cache_temp; #设置文件临时存储位置
        if (!-e $request_filename) { #如果缓存中无该请求的文件，再请求后端
            proxy_pass http://testus;
        }

        root /usr/local/nginx/cache; #缓存文件保存的位置
        }
    ···

    ```
*   临时缓存<br />
    使用 proxy\_cache\_path 设置缓存的位置及大小、删除时间等。
    ```bash
    http {
        #设置缓存临时文件目录
        proxy_temp_path     /usr/local/nginx/proxy_temp_dir;
        #设置缓存文件目录
        #levels=1:2 代表层级目录数，2 代表会创建两个子目录
        #keys_zone=cache_one:50m 代表设置缓存区名称和大小 50M
        #inactive=1m 配置删除无访问缓存文件的时间
        #max_size=500m 设置缓存在磁盘的空间大小
        proxy_cache_path    /usr/local/nginx/proxy_cache_dir levels=1:2
                            keys_zone=cache_one:50m inactive=1m  max_size=500m;

        server {
            listen 8080;
            server_name 192.168.1.156;
            add_header X-Via $server_addr; #向响应头中加入服务器ip地址
            add_header X-Cache $upstream_cache_status; #向响应头中加入缓存触发状态，HIT代表命中，
            #即访问了缓存文件
            location / {
                proxy_cache        cache_one; #设置缓存区名称，对应 keys_zone 中的配置
                proxy_cache_key    $host$uri$is_args$args; #设置缓存的 key 值
                proxy_cache_valid  200 10m; #针对不同响应状态码设置不同的缓存时间
                proxy_cache_valid  304 2m;
                proxy_cache_valid  any 1m; #未设置的状态码均采用该设置
                proxy_pass http://testus;
        }
    }

    #proxy_cache_key 中使用的内置变量：
    # $host 服务器域名
    # $uri 域名和参数之间的部分
    # $is_args 是否有参数，有的话值为 ？，无则为空字符串
    # $args 参数，使用 参数名=参数值&参数名=...的格式，没有参数时为空字符串
    ```

> https 配置即 SSL

*   开启 https 需要 http\_ssl\_module 模块的支持，需要重新编译 nginx
        cd /usr/nginx-1.16.1 #进入 nginx 的解压目录
        ./configure --with-http_ssl_module #重新生成编译所需的 makefile 文件，加入 ssl 模块
        make #重新编译 nginx 生成 可执行的二进制文件 “nginx”，
        #在 解压目录下的 objs 文件夹内的名为 nginx 的文件
        cp objs/nginx /usr/local/nginx/sbin #替换原有 nginx 二进制文件

*   生成证书和私钥，使用 openssl 工具生成本地证书，浏览器会提示风险，但可以使用
        mkdir ssl #在 conf 目录下新建目录 ssl 存放证书相关
        cd ssl/
        openssl genrsa -out private.key 2048 # 生成私钥
        openssl req -new -key private.key -out public.csr #生成公钥
        #生成证书文件，指定日期为 30 天
        openssl x509 -req -days 30 -in public.csr -signkey private.key -out server.crt

*   配置 nginx.conf 添加 https 配置
    ```
    server {
        listen       443 ssl;
        server_name  www.dongliulin.com dongliulin.com;

        ssl_certificate      ssl/server.crt; #指定证书文件位置
        ssl_certificate_key  ssl/private.key; #指定私钥位置

        ssl_session_cache    shared:SSL:1m;
        ssl_session_timeout  5m;

       # ssl_ciphers  HIGH:!aNULL:!MD5;
       # ssl_prefer_server_ciphers  on;

        location / {
            root   html;
            index  index.html index.htm;
        }
    }

    ```

#### nginx + KeepAlived 实现 nginx 的高可用性

> 主机 keepalived 定时监控 nginx         服务是否在运行，如果否则尝试重启，重启失败的话，关闭自身，将网络交由从机 keepalived。对外访问的是 keepalived 的虚拟 ip，主从机映射到了相同的虚拟 ip。**主从机通过 112 端口相互访问，防火墙需放开该端口**

*   安装配置 KeepAlived
    ```bash
    #下载 keepalived 到指定路径，keepalived.org 官网地址
    wget https://keepalived.org/software/keepalived-2.0.19.tar.gz
    #解压，编译、安装
    tar keepalived-2.0.19.tar.gz
    cd keepalived-2.0.19
    ./configure
    make && make install
    #添加系统服务、开机启动，默认的脚本执行文件在如下目录
    cp keepalived-2.0.19/keepalived/etc/init.d/keepalived /etc/init.d/
    chkconfig keepalived on 
    #添加配置文件,默认的加载配置文件路径为 /etc/keepalived/
    mkdir /etc/keepalived
    vim /etc/keepalived/keepalived.conf
    #链接配置文件和程序文件
    ln -s /usr/local/etc/sysconfig/keepalived /etc/sysconfig/
    ln -s /usr/local/sbin/keepalived /usr/sbin/

    #即可使用 service 控制 keepalived
    service keepalived start

    journalctl -xe #查看 keepalived 的运行日志，实际上查询的是 systemd 的系统日志
    ```

*   实现 keepalived 高可用
    ```bash
    #两台虚拟机都安装 keepalived 并配置相同的 虚拟 ip，即主从配置
    #编写配置文件
    vim /etc/keepalived/keepalived.conf
    #加入如下配置：
    ! Configuration File for keepalived # ! 代表注释内容
    vrrp_instance VI_1 {
        state MASTER #从机为 BACKUP
        interface ens33 #指定绑定虚拟 ip 到指定的网卡
        virtual_router_id 51 #主从机的 router_id 需一致
        priority 100 #优先级，主机应大于从机
        advert_int 1 #主从机相互访问时间间隔
        authentication {
            auth_type PASS #主从机访问的验证方式，密码
            auth_pass 1111 #密码值
        }
        virtual_ipaddress {
            192.168.1.199 #虚拟 ip 值，此处在虚拟机中配置，需和虚拟机 ip 在同一 ip
                          #段，即 192.168.1.xxx
        }
    }

    主从机配置完成启动后，访问虚拟ip 192.168.1.199 会优先访问主机网络，停掉主机的网络服务后，
    虚拟ip 自动切换到从机的网络
    ```

*   使 keepalived 监测 nginx 服务状态<br />
    需考虑好 nginx 监控脚本的执行时间和 keepalived 中配置的脚本执行时间间隔，否则脚本未执行完，新的监控任务又在执行，会产生混乱
    ```bash
    #修改配置文件，主从机都修改
    vim /etc/keepalived/keepalived.conf
    ! Configuration File for keepalived

    global_defs {
    	enable_script_security #开启脚本安全设置
    	script_user root #设置拥有脚本执行权限的用户
    }
    #定义监控 nginx 服务的脚本执行模块
    vrrp_script check_ngx {
    	script "/etc/keepalived/check_ngx.sh" #指定脚本文件的位置
    	interval 7  #间隔 7 秒执行一次脚本
    	weight -20 #若脚本执行失败，该主机权重减少 20
    	user root #指定脚本执行的用户属主
    }

    vrrp_instance INS_1 {
        state MASTER
        interface ens33 
        virtual_router_id 51
        priority 100
        advert_int 1

        authentication {
            auth_type PASS
            auth_pass 1111
        }
        
        virtual_ipaddress {
            192.168.1.199
        }
        #设置该主机执行哪些脚本配置
        track_script {
            check_ngx
        }
    }
    ```

*   编写监控 nginx 服务的脚本文件 `check_ngx.sh`
    ```bash
    #!/bin/bash
    #

    #count nginx`s process
    count_nginxd_ps()
    {
        echo `ps -C nginx --no-header | wc -l`
        #echo `ps -ef|grep nginx|grep -v grep|grep -v $$ |wc -l`
    }

    if [ `count_nginxd_ps` -eq 0 ]; then
        service nginx start 

    fi

    sleep 5

    if [ `count_nginxd_ps` -eq 0 ]; then
        service keepalived stop 
    fi
    ```

*   关于 主从机配置中的 `priority` 和 `weight` 关系

#### 与 web 容器（apache、tomcat、openResty）整合实现动静分离
