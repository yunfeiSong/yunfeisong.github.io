---
title: Docker 入门
categories:
- [Docker]
tags:
- [Docker]
index_img: /img/docker.jpg
date: 2019-10-10 10:00:00
---

### 简介

docker 基于 **GO** 语言开发实现。[docker官网](www.docker.com "www.docker.com")<br />
基于 linux 的 **LXC**（linux container） 技术实现。<br />
三大核心概念：**镜像**、**容器**、**仓库**。<br />
docker 设计理念借鉴了 **git**，所有有很多相似之处。

### 安装（centos7）

参照[官网](https://docs.docker.com/install/linux/docker-ce/centos/ "https://docs.docker.com/install/linux/docker-ce/centos/")关于社区版安装步骤：

*   卸载旧版
    ```bash
    yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine

    #或者查看是否安装了 docker ：
    yum list docker*

    yum remove docker*
    ```

*   安装启动新版
    ```bash
    #安装依赖环境
    yum install -y yum-utils device-mapper-persistent-data lvm2
    #添加 yum 源
    yum-config-manager --add-repo  https://download.docker.com/linux/centos/docker-ce.repo
    #使用 yum 安装
    yum install docker-ce docker-ce-cli containerd.io
    #启动 docker
    systemctl start docker
    ```

### 镜像

*   操作镜像，可以通过 name 或 id 来操作镜像
    ```bash
    #搜索镜像（从dockerhub 远程仓库），带有 official 的是官方镜像
    docker search [参数] 搜索值 ：docker search redis
    #获取镜像，使用 pull 命令，不指定 tag 默认拉取 latest 版本，即最新版
    docker [image] pull name[:tag-version] 
    #查看本地镜像列表
    docker images
    #查看指定镜像详细信息/历史记录
    docker inspect/history name
    #删除镜像，-f 强制删除，以创建容器的镜像无法被删除
    docker image rm name / docker rmi name
    #清除未使用的镜像和临时镜像
    docker image prune
    #创建镜像方式一：通过已有容器创建镜像
    docker commit -m "test" -a "myName" 容器id 镜像名称:版本
    #创建镜像方式二：通过本地模板创建
    docker import 文件 镜像名:版本
    #创建镜像方式三：通过 DockerfIle 创建
    docker build filename
    #导出镜像到本地文件
    docker save -o filename 镜像名：tag名 / 镜像id
    #从本地文件导入镜像
    docker load -i filename
    #上传镜像到 dockerhub，类似于 git push 操作
    docker login #登陆 dockerhub 账号
    #给要上传的镜像打 tag，格式为：dockerhub账号名/镜像名:tag版本
    docker tag image-name:tag dockerhub-name/image-name:tag
    #push 到 dockerhub 上，类似 github
    docker push dockerhub-name/image-name:tag
    ```

### 容器

*   操作容器，可以通过 name 或 id 来操作容器
    ```bash
    #查看容器，-a 全部，-l，默认选项，只列出运行中的容器
    docker ps -a/-l 
    #查看容器完整信息，json 格式
    docker inspect name/id
    #查看容器内进程
    docker top name/id
    #查看容器运行状态
    docker stats name/id
    #创建容器，处于停止状态，未运行，--help 查看完成参数列表
    docker create -it nginx:latest
    #启动容器，以指定 id 或 nme 启动容器
    docker start id/name 
    #创建并运行容器，-d 在后台运行，-p 将容器内部端口（右）映射到物理主机上（左），等价于 create + start
    docker run -it -d --name mynginx -p 8888:80 nginx
    #停止容器
    docker stop id/name
    #暂停/取消暂停容器
    docker pause/unpause id/name
    #重启容器
    docker restart id/name
    #进入容器方式一，不推荐使用，可能会造成容器终止运行
    docker attach id/name
    #进入容器方式二，exec 后接两个参数，第一个为容器 id 或 name，第二个为要执行的命令
    docker exec -it id/name /bin/bash
    #删除容器
    docker rm id/name
    #导出容器
    docker export -o filename id/name
    #导入文件到本地镜像库，导入的是容器快照文件，docker load 是导入完整的镜像文件
    docker import filename -- dongliulin/mynginx:v1
    #复制文件到容器中
    docker cp filename id/name:路径
    #查看容器端口映射情况
    docker port id/name
    #更改容器配置，--help 查看参数列表
    docker update id/name

    # --rm 在容器运行结束后立即删除容器，不能与 -d 同时使用
    docker run -it --rm nginx nginx
    ```

### 仓库

> 公有仓库

[dockerHub](https://hub.docker.com "hub.docker.com") 是 docker 官方的公有仓库

```bash
#在公有仓库中搜索镜像
docker search name
#拉取镜像，不指定 tag 默认拉取最新版本，即 latest 版本
docker pull name[:tag]
#登录 docker hub，将本地镜像上传到 docker hub 进行托管
docker login #输入用户名密码进行验证
#推送本地镜像
docker push name:tag
```

> 私有仓库

dockerHub上提供有 **registry** 镜像，可搭建本地私有仓库

```bash
#拉取并启动 registry 镜像版本 2，映射到本地 5000 端口，私有仓库已搭建完成
docker run -it -d -p 5000:5000 registry:2
#上传镜像到私有仓库，先将本地镜像打上标签，标签名为：私有仓库物理机的 IP：端口号/镜像名
docker tag name 私有仓库 IP：端口/name
#将刚刚标签的镜像上传到私有仓库
docker push name

#高版本的 docker 默认使用 ssl 连接，即 https，本地私有仓库为 http 协议，
#可以配置 ssl 证书，或者让客户机信任私有仓库所在物理机的 ip 地址：
vim /etc/docker/daemon.json
写入:
{
#值为私有仓库物理机的 ip:端口，多个用 “，” 分隔
	"insecure-registries": ["192.168.1.154:5000"]
}
#重启 docker 使配置生效
systemctl daemon-reload
systemctl restart docker
```

### 数据管理

> 数据卷<br />
> 可供容器使用的特殊目录，将物理机目录映射入容器中，实现数据的共享<br />
> 创建的卷存储在 **/var/lib/docker/volumes/** 路径下。

*   操作数据卷

    \#创建/删除/清除未引用的/查看详细信息/查看卷列表
    docker volume create/rm/prune/inspect/ls volume\_name

*   绑定数据卷

指在运行容器时指定本地路径映射到容器中的指定路径，所创建的数据卷类型。

    #-v 指定数据卷绑定映射到容器，本地路径:容器路径，nginx 容器启动时，需执行：nginx -g 'daemon off;' 命令，
    #使 nginx 运行在前台，否则容器无法一直运行，在启动后会立即退出，ro 代表只读，即容器内不能修改数据卷中
    #也就是物理机目录的文件，默认的是 rw 读写
    docker run -it -d -p 8008:80 -v /root/webapp:/opt/webapp:ro\
    192.168.1.154:5000/mynginx nginx -g 'daemon off;'

> 数据卷容器<br />
> 在物理机上创建数据卷，并挂载到容器中，该容器称为数据卷容器，其他容器可以在运行时直接通过
> `--volumes-from 容器 name` 参数挂载同一个数据卷。

*   创建数据卷容器

    \#运行容器前，会在物理机创建数据卷，名称为一个随机长字符串，并挂载到容器的 /volumedb 目录下，
    \#在容器内修改该目录，文件会保存在数据卷中，其他容器挂载该数据卷可实现数据共享

    # -v 后参数少了左半部分，即没有指定物理机路径，此时使用的是默认路径，

    \#/var/lib/docker/volumes/xxxxx，此处只指定了容器内挂载的路径
    docker run -itdP --name base\_volume -v /volumedb centos
    \#运行新容器，并通过数据卷容器挂载数据卷
    docker run -itdP --name test --volumes-from base\_volume nginx
    \#通过已挂载数据卷容器的容器，挂载相同的数据卷
    docker run -itdP --name test1 --volumes-from test nginx

*   数据备份与还原

```bash
#备份数据卷容器中的数据，运行新容器，将本地路径 /data/backup 挂载到容器内
#/data/backup 路径，通过需要备份的数据卷容器挂载数据卷，
#将数据卷中的内容打包备份到 /data/backup 路径下，打包的同时，物理机上 /data/backup
#下，也有了备份文件
docker run -itdP --name backup -v /data/backup:/data/backup\
--volumes-from base_volume centos tar cvf /data/backup/backup.tar /volumedb

#还原备份的文件，创建新容器，挂载本地保存备份文件的路径，并在容器内，解压文件
docker run -itdP --name revert -v /data/backup:/data/backup centos\
tar xvf /data/backup/backup.tar
```

### 端口映射和容器互联

*   端口映射<br>
    在执行 `docker run` 时，添加 `-p/-P` 参数，指定端口映射，只能一对一，可指定多对，<br />
    未指定端口，无法从外部访问容器内端口

```bash
#-p 后指定端口映射关系，物理机端口：容器内端口，-P 参数随机指定物理机端口映射到容器内的 80 端口
docker run -itd -p 8080:80 nginx nginx
#在物理机上，不进入容器，查看容器的日志信息
docker logs -f 容器 id/name
#查看容器的端口映射关系
docker port 容器 id/name
```

*   容器互联<br />
    在执行 `docker run` 时，添加 `--link` 参数，指定要链接到的容器名，在新建的容器内，即可访问链接到的容器，**互联仅单方向可行，被链容器无法访问链接容器**

```bash
# --link 后跟要连接的容器名:别名，之后在容器内可通过别名访问被链接的容器
docker run -itdP --link base_volume:bv nginx nginx
#安装 ping 指令，测试
apt-get install -y iputils-ping 
ping bv
```

### Dockerfile 构建镜像

*   Dockerfile 文本配置文件，可以自定义镜像，创建文件，文件名为 Dockerfile 即可。

    \#使用 “#” 作为注释行
    \#声明父镜像，必须以 FORM 开头
    FROM nginx\:latest
    \#执行的命令
    RUN apt-get update && apt-get install vim -y && apt-get install iputils-ping -y
    \#创建数据卷，挂载到容器的 /root/webapp 目录下
    VOLUME \["/root/webapp"]
    \#创建容器后，执行的命令
    CMD \["nginx", "-g", "daemon off;"]

*   使用 `docker build` 命令，构建镜像

    \#Dockerfile 文件放置在 /root/docker.conf/ 路径下，-t 指定生成的镜像的名称和版本号
    docker build -t dongliulin/mynginx:1.0 /root/docker.conf/

### 常用镜像

*   alpine
    迷你版的 linux 系统，适合作为基础镜像，体积小，支持 linux 指令多，支持 `apk` 安装命令

    \#拉取镜像
    docker pull alpine
    \#运行容器
    docker run -itd --name test\_alpine alpine
    \#进入容器
    docker exec -it alpine容器 id sh

### 容器安装 ssh 服务

以 alpine 为基础镜像，创建容器，并安装 ssh 服务，通过 ssh 访问容器。

    #启动 alpine 容器，指定端口映射
    docker run -it -name alpine-ssh alpine
    #容器内安装 openssh、openssh-server、openrc
    apk add openssh openssh-server openrc
    #添加开机启动，alpine 中未安装 bash，使用 openrc 代替
    rc-update add sshd
    #查看 sshd 状态
    rc-status
    #生成 softlevel 文件
    mkdir -p /run/openrc/
    touch /run/openrc/softlevel
    #重置 root 用户密码
    passwd
    #修改 ssh 配置文件，放开注释行，primitrootlogin 修改参数为 yes ，开启 root 登陆认证
    vi /etc/sshd/sshd_config
    #启动 ssh 服务
    /etc/init.d/sshd start

    #将运行的容器打包生成新的镜像，包含 ssh 服务
    docker commit -m "alpine-ssh" 容器 id 192.168.1.154:5000/alpine-ssh:1.0.0

    #使用包含 ssh 服务的 alpine 的镜像，创建容器，此时容器内的 ssh 服务处于损坏状态
    docker run -itd --name alpine-sshd -p 8022:22 192.168.1.154:5000/alpine-ssh:1.0.0
    #重启容器内的 ssh 服务
    docker exec 容器 id /etc/init.d/sshd restart

