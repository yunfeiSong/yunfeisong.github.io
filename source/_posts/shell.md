---
title: Shell 编程
categories:
- [Shell]
tags:
- [Shell]
index_img: /img/shell.jpg
date: 2019-10-10 10:00:00
---

# shell 编程

##### shell 脚本首行开头：#!/bin/bash 或 #!/bin/sh 
##### #! 为固定开头格式，后跟路径为解释器的路径，通常解释器选用 bash 解释器，sh 等价于 bash
##### # 号为注释符号，可以单独一行，也可以放在一行的末尾
man 命令是查询命令手册，后跟命令名称，查询指定命令的具体用法
命令行执行多个命令时，使用分号分隔，会依次执行多条命令

    touch 文件名 ### 若文件不存在，则创建该文件，存在的话更新文件的更新时间等

用户操作指令：

创建用户的同时会创建同名的用户组，组内只有该用户
用户信息保存在 etc 目录下的 passwd 文件中，/ etc / passwd
用户密码保存在 etc 目录下的 shadow 文件中，/ etc / shadow

    useradd/adduser  “username” ；### 添加用户
    usermod -p123456 “username” ；### 修改用户密码，此处不会对密码进行加密存储，而是直接存储
    passwd “username” ；### 使用 passwd 命令修改用户密码，推荐使用此方法，密码将会以加密后的密文形式保存
    userdel  -r  “username” ；### 删除用户，-r 代表连 /home 目录下的用户根目录及其中文件一并删除

用户组操作指令：

用户和用户组是多对多的关系，一个用户可以归属于多个组，一个组可以包含多个用户
用户组信息保存在 etc 目录下的 group 文件中， /etc/group

    groupadd “groupname” ；### 添加用户组
    groupmod -n“new_name”  “old_name” ；### 重命名用户组
    groupdel “groupname” ；### 删除用户组

cp （复制）：

可以复制文件或文件夹，

格式：cp 【选项】 源文件/源路径  目标文件/目标路径

参数选项：	

* -r ：递归操作，复制所有子目录或子文件，复制文件夹时，不加 -r 会报错
* -f ：文件重复时不提示交互操作，直接覆盖		
* -i ：与 -f 相反
* -p ：复制时连同文件权限和创建时间等一同复制
* -n ：文件重复时不再提示，直接跳过

mv（移动）：

可以移动文件或文件夹，

格式：mv 【选项】 源文件/源路径  目标文件/目标路径

参数选项：	

* -f ：文件重复时不提示交互操作，直接覆盖		
* -i ：与 -f 相反

rm （删除）：

删除文件或文件夹

格式：rm 【选项】文件/文件夹

参数选项：

* -r ：递归操作，删除所有子目录或子文件，删除文件夹时，不加 -r 会报错
* -f ：文件重复时不提示交互操作，直接覆盖		
* -i ：与 -f 相反

cp、mv、rm 三个命令默认的参数选项都是 -i，即默认进行交互式确认操作
可以一次操作多个文件，即源文件可以有多个，用空格隔开，最后一个参数为目标地址
多数操作命令都支持正则表达式，即可以对一组名称相近的文件批量操作

目录操作命令：

mkdir、rmdir、cd

mkdir 【选项】文件夹名

参数选项：

* -m ：赋予新建的文件夹权限，mkdir -m 777 testDir
* -p ：递归创建文件夹树，一次可以创建多个文件夹
* -v ：显示打印创建的过程

rmdir 【选项】文件夹名

文件夹不为空，无法删除，使用 rm 命令

参数选项：

* -p ：递归删除文件夹树，一次可以删除多个文件夹，从目标文件夹开始，往上其父文件夹如果为空，也一并删除

cd 文件夹名

    cd ~ / cd ：回到登录目录
    cd - ：回到上一个操作的目录
    cd / ：回到根目录

文件权限命令：

root 用户可以更改所有文件的权限和属主，其他用户只能更改属于自己的文件
chmod（修改文件权限）、chown（修改文件属主）

ll 查看文件的权限，读、写、执行，文件以 - 开头，目录以 d 开头，后跟三组权限值，分别是属主权限，属组权限、其他用户权限，r 读（4），w 写（2），x 执行（1）

chmod 两种格式：一种是字母加对应权限字母，u 代表属主，g 代表属组，o 代表其他用户，+ 代表增加权限，- 代表减少权限，= 代表赋予权限，并取消之前的权限，即覆盖

    chmod u+x,g+w,o+w 文件名
    
第二种格式：数字代表权限

    chmod 777 文件名 ### 赋予文件最高权限

chown 【选项】要更改成的用户名 文件名

参数选项：

* -R ：递归操作，即变更文件夹下的所有子文件或子目录为指定的用户属主
* -v ：显示执行操作信息

变量替换：

    "hello world" ###  定义一个变量，值为字符串
    ${var1#*l} ### 删除变量中，指定字符首次出现位置之前所有的字符，包含该字符位置
    ${var1##*l} ### 删除变量中，指定字符最后一次出现位置之前所有的字符，包含该字符位置
    ${var1%l*} ### 删除变量中，指定字符从末尾开始首次出现位置之后所有的字符，包含该字符    位置
    ${var1%%l*} ### 删除变量中，指定字符从末尾开始最后一次出现位置之后所有的字符，包含    该字符位置
    ${var1/l/u} ### 替换变量中，指定字符首次出现的位置
    ${var1//l/u} ### 替换变量中，指定字符所有出现的位置
    
例子：
    
    [dongliulin@localhost ~]$ var1="hello world"
    [dongliulin@localhost ~]$ echo $var1
    hello world
    [dongliulin@localhost ~]$ var2=${var1#*l}
    [dongliulin@localhost ~]$ echo $var2
    lo world
    [dongliulin@localhost ~]$ var2=${var1##*l}
    [dongliulin@localhost ~]$ echo $var2
    d
    [dongliulin@localhost ~]$ var2=${var1%l*}
    [dongliulin@localhost ~]$ echo $var2
    hello wor
    [dongliulin@localhost ~]$ var2=${var1%%l*}
    [dongliulin@localhost ~]$ echo $var2
    he
    [dongliulin@localhost ~]$ var2=${var1/l/u}
    [dongliulin@localhost ~]$ echo $var2
    heulo world
    [dongliulin@localhost ~]$ var2=${var1//l/u}
    [dongliulin@localhost ~]$ echo $var2
    heuuo worud

字符串处理：

    ${#var1} ### 计算变量的长度
    `expr length "$var1"` ### 计算变量的长度，使用 expr length 命令，注意反单引号 ```
    `expr index "$var1" ll` ###     计算指定字符在变量中的索引下标，指定为字符串则会拆分为单个字符，返回的是第一个匹配    到的字符的索引下标
    `expr match "$var1" hello` ###     计算指定字符串在变量中的长度，若存在则返回字符串长度，不存在返回 0     ，必须从变量的头部就要匹配上，才算匹配，即首字符开始匹配
    ${var1:1} ### 截取变量，从指定索引下标开始，注意，使用冒号形式，下标从 0 开始。
    ${var1:1:4} ### 从截取的变量中，再截取前4个字符，即指定截取长度
    ${var1: -1} ### 从变量末尾开始截取，注意冒号后的空格
    ${var1:(-1)} ### 加小括号后，不用加空格
    ${var1:(-5):4} ### 从末尾截取得到截取后的变量，再去前4个字符
    `expr substr "$var1" 1 2` ### 使用 expr substr     命令截取变量，变量后接，起始索引下标、截取长度，注意此时的下标从 1     开始，与使用冒号不同

例子：

    [dongliulin@localhost ~]$ echo $var1
    hello world
    [dongliulin@localhost ~]$ echo ${#var1}
    11
    [dongliulin@localhost ~]$ echo `expr length "$var1"`
    11
    [dongliulin@localhost ~]$ echo `expr index "$var1" ll`
    3
    [dongliulin@localhost ~]$ echo `expr match "$var1" hello`
    5
    [dongliulin@localhost ~]$ echo `expr match "$var1" world`
    0
    [dongliulin@localhost ~]$ echo ${var1:1}
    ello world
    [dongliulin@localhost ~]$ echo ${var1:1:4}
    ello
    [dongliulin@localhost ~]$ echo ${var1: -1}
    d
    [dongliulin@localhost ~]$ echo ${var1:(-1)}
    d
    [dongliulin@localhost ~]$ echo ${var1:(-5):4}
    worl
    [dongliulin@localhost ~]$ echo `expr substr "$var1" 1 2`
    he						

编写测试脚本：

    #!/bin/bash
    #

    s="hello world" #定义字符串变量
    #打印输入提示
    function print_tips
    {
    	echo "====================="
    	echo "string is : $s"
    	echo "(1) 打印字符串的长度"
    	echo "(2) 替换world为home"
    	echo "====================="
    }
    
    function print_length
    {
    	echo ${#s}   #输出长度
    }
    
    function replace_world_home
    {
    	echo ${s/world/home}   #替换字符串
    }
    #死循环
    while true
    do
    	print_tips   #打印提示
    	echo
    	read -p "please input selection in {1|2|q|Q}:" choice       #等待输入，将输入的值存储到 choice 变量中
    	# case 语句，注意结束时，反 case，esac
    	case $choice in
    	1) print_length;;
    	2) replace_world_home;;
    	q|Q) exit;;
    	*) echo "input error.";;
    	esac	
    done

命令替换：

    `date +%Y` ### 使用反单引号，将命令括起来，可直接引用命令的结果，date为系统自带的日期函数，+%Y，表示只显示年份
    $(date +%Y) ### 作用同上
    $((365-`date +%j`)) ### $(()) 为计算符号，将计算的表达式放入其中
    cat /etc/passwd | cut -d ":" -f 1 ### 显示当前系统的用户名，cut 截取命令，-d 指定截取的分隔符，-f 指定取截取后的第几部分
    ps -ef | grep mysqld | grep -v grep | wc -l  ### grep -v grep 反选筛选 ‘grep’ 后的结果，即去除包含 grep 的信息，wc 统计字符、行数等，-l 表示计算行数，可以得到，mysql 是否启动
grep 命令在查询时，会自动生成一个 grep 进程，所有要用 -v 操作排除掉

例子：

    #!/bin/bash
    #
    echo "this year is `date +%Y` year"
    echo "this year has passed `date +%j` days"
    echo "this year has passed $((`date +%j`/7)) weeks"
    
    echo "this year has left $((365-`date +%j`)) days"
    echo "this year has left $((365/7-$((`date +%j`/7)))) weeks"

例子：
启动 mysql 服务，若服务未运行

    #!/bin/bash
    #
    mysqld_process_count=`ps -ef | grep mysqld | grep -v grep | wc -l`
    if [ $mysqld_process_count -eq 0 ]; then  ### 注意 if     语句后跟的是中括号，不是小括号，中括号中两端要有空格，使用 fi 结束 if 判断
    	echo "start mysql service" 
    	service mysqld start
    fi

有类型变量：

    declare -i var1 ### 使用 declare 或者 typeset 关键字，进行变量的定义，-i 表示整形，-r 表示只读，-a 表示数组
    declare -a arr ### 定义一个数组
    arr=("join" "the" "pool") ### 为数组赋值，注意是小括号包围
    echo ${arr[@]} ### 输出数组中所有值

expr 进行数学运算:

    expr $var1 + $var2 ### 计算两个变量的值，使用 expr 命令，还可以进行大小比较，$(()) 符号只能进行加减乘除

例子：计算从 1 到所给数值的和

    #!/bin/bash
    #
    while true
    do
    	read -p "please input a number: " num ### 读取命令行参数到 num 变量中
    if [ $num == "q" ] || [ $num == "Q" ];then ### 退出脚本执行，判断，字符用 “==”     判断，数字用 “-eq”
		exit
	fi
	if [ `expr $num \< 0` -eq 1 ];then
		echo "请输入正数"
		continue
	fi
	expr $num + 1 &>/dev/null   ### 只有整数才能进行加 1 运算，否则，$? 的值不为 0，将运算结果舍弃，输出到 null 的位置，即不存在的位置
        if [ $? -ne 0 ];then
                echo "请输入整数"
                continue
        fi
	for((i=0;i<=$num;i++))   ### for 循环采用 双括号的方式，后接 do 和 done 
	do
		sum=`expr $sum + $i`
	done
	echo "和为：$sum"
	sum=0
    done


内置计算器 bc：

可进行浮点型数据运算，^ 表示次方运算、命令行，输入 bc 命令，进入交互式的计算方式

    echo "scale=4;$num1/$num2" | bc ### 采用命令行方式使用 bc ，使用管道符号：“|” 将算数表达式传递给 bc 计算器
    which bc ###  查看 bc 指令的位置

例子：
计算两个浮点数的除法运算

    #!/bin/bash
    #
    while true
    do
    	read -p "please input first number: " num1
    	read -p "please input second number: " num2
    	if [ `expr $num1 \< 0` -eq 1 ] || [ `expr $num2 \< 0` -eq 1 ];then
    		echo "请输入正数"
    		continue
    	fi
    	echo "scale=4;$num1/$num2" | bc
    done	

函数的定义和引用：

注意：函数体外包围的花括号，必须在单独的一行，不能有函数名等在一行

方式一：不加 function 关键字，使用函数名（），的方式，表示是一个函数、
function_name（）
{
#函数体、、、
}

方式二：加 function 关键字，使用 function function_name，的方式，不加小括号。
function function_name
{
#函数体
}

例子 ：为 mysql 服务创建守护进程，当 mysql 停止服务时，重启它：

    #!/bin/bash
    #
    while true
    do
    this_pid=$$ # $$ 代表当前进程，当脚本名和grep 参数名重名时，使用grep -v 过滤掉当前进程
    #echo $this_pid
    #ps -ef | grep mysql | grep -v grep | grep -v $this_pid &>/dev/null
    process_count=`ps -ef | grep mysql | grep -v grep | grep -v $this_pid | wc -l` ###     计算 mysql 服务运行的进程数，小于 0 代表已停止服务
	if [ $process_count -ne 0 ];then ### 也可以使用 $?判断上一步指令的返回值，返回0 代表成功，1 代表失败
		echo "mysql is running well."
		sleep 5 ###睡眠 5 秒
	else
		echo "mysql is dead,restart it now."
		service mysqld restart ### 重启 mysql 服务
	fi
    done

传参：

默认排序参数为 $1、$2、$3、、、，以此类推，，，，$0 代表的是脚本自身的名字
在调用脚本或者函数时，参数之间用空格隔开，脚本或函数中直接使用 上述符号调用传入的参数，无需定义接收。

例子：

    function test_1
     {
        echo "hello $1"
     }

调用 test_1 函数：

test_1 张三
打印输出的是 hello 张三
例子：实现传入三个参数，实现计算器功能：

    #!/bin/bash
    #
    #echo "$1 $2 $3 = `expr $1 $2 $3`"
    echo "$1 $2 $3 = `echo "scale=4;$1 $2 $3" | bc`"  ### 使用 bc     计算器，精度为小数点后 4 位，scale=4；

执行脚本：

    sh example_calc.sh  23.4 \* 4.33  ### 注意，运算符前需加转义符，“\”

返回值：

使用 return 或者 echo 返回函数的返回值，return 多用于返回数字，即状态，echo 多用于返回字符串或者数组等

重构上上个例子：

    #!/bin/bash
    #
    while true
    do
    this_pid=$$
    function is_mysql_running ### 定义函数，判断 mysql 服务是否在服
    {
    	process_count=`ps -ef | grep mysql | grep -v grep | grep -v $this_pid | wc -l`
    		if [ $process_count -ne 0 ];then
    			return ### 返回 0，return 后什么都不加，等价于 return 0
    		else
    			return 1  ### 返回 1
    		fi
    }
    function restart_mysql_service  ### 定义函数，重启 mysql 服务
    {
    	echo "mysql is dead ,restart it now."
    	service mysqld restart
    }
    is_mysql_running && echo "mysql is running well." || restart_mysql_service  ###     第一个表达式为 true 则执行最后的代码，否则执行中间的代码
    sleep 5
    done

使用 echo 返回函数值：

例子：

    #!/bin/bash
    #
    function get_all_username
    {
    	echo "`cat /etc/passwd | cut -d: -f1`"  ### 截取 passwd     文件中的所有用户信息的用户名
    }
    users=`get_all_username`  ### 调用函数
    index=1
    echo $users
    for user in $users   ### for 循环的另一种写法
    do
    	echo "the $index user name is : $user "
    	index=$(($index + 1))   ### 下标自增
    done

变量的作用域：

在 shell 编程中，脚本中的变量都是全局变量，在函数中，必须在函数调用后，变量才会初始化，使用 local 关键字定义局部变量，local 关键字只能用在函数中

    #!/bin/bash
    #
    var1="hello"
    function local_variable
    {
    	local var2="world"
    }
    echo $var1
    echo $var2
    local_variable
    echo $var2

函数库：

将通用的一些代码提取为函数，封装在同一个文件中，在别的脚本中引入该文件即可调用指定的函数
使用 . 路径/函数库文件名，的形式调用函数库，注意路径前，使用 标点符号点：“.”，引入文件
函数库文件名通常以 .lib 结尾，文件开头以  !/bin/echo 来开始

例子：定义一个基本的函数库，base_function：

    #!/bin/echo
    #
    add()
    {
            echo "`expr $1 + $2`"
    }
    sys_load()
    {
            echo "memory is :"
            echo
            free -m
            echo
            echo
            echo "disk usage:"
            df -h
            echo
            echo
    }

引用函数库：引入库文件后，直接以函数名+参数的形式调用指定函数：

    #!/bin/bash
    #
    . /home/dongliulin/lib/base_function.lib
    add 1 2
    sys_load


##### find 命令：

查找文件或目录等，

格式 ：find 【路径】【参数】【参数值】【操作】

当前目录为 ”.“ 可省略 

find 命令后跟的参数有：

* -name “文件名” ,以名称查找，支持模糊查询，find ./ -name "example*"
* -size +1M/-100k ，以文件大小查找，加号代表大于，减号代表小于
* -mtime 3/-3 ，以修改时间查找，正数代表几天之前的所有文件，负数代表几天之内的所有文* 件
* -mmin 30/-30，同 -mtime，只是单位是分钟
* -type d/f，以文件类型查找，d 代表文件夹，f 代表文件
* -perm 744，查找指定权限的文件	

 find 后跟的操作：
* -exec 命令 {} \;， 执行后跟的命令，花括号代表 find 查询的结果，斜杠分号为固定结尾
* -ok 命令 {} \;，同上，只是每次操作都要用户确认，输入 y/n 来进行确认

例子：

    find . -name "example*"
    find ./ -mtime -1
    find -size +1M
    find -name "nohupnew.*" -exec rm -rf {} \;
    find -name "nohup.*" -exec cp {} ./nohupnew.out \;
    find -type f -name "example*" -exec ls -l {} \;

find、locate、whereis、which 的区别：
find 用于全盘搜索，查询较慢，消耗资源
locate 默认模糊搜索系统数据库，每日有定时任务更新数据库，手动更新数据库试用：updatedb 命令
whereis 只查找二进制文件、帮助文档、源代码
which 只查找二进制文件（即可执行程序）

##### grep / egrep 命令：

grep 是 global search regular expression and print out the line 的缩写（全局搜索正则表达式并打印匹配行）
过滤器，过滤文件内容，

格式：grep 【参数】【搜索内容】【搜索目标】

参数：

* -i ，忽略大小写
* -E，匹配正则表达式，等价于 egrep
* -c，对匹配的行数进行统计计数
* -C，连带显示匹配行前后指定行数的内容
* -A，连带显示匹配行之后的指定行数内容
* -B，连带显示匹配行之前的指定行数的内容
* -r，递归操作
* -v，反选

例子：

    grep 'echo' example_function.sh 
    grep -i 'Echo' example_function.sh 
    grep 'echo' example_function.sh  -A 10
    grep 'echo' example_function.sh -c
    grep 'echo' example_function.sh -C 1
    grep 'echo|function' example_function.sh -E
    egrep 'echo|function' example_function.sh 


sed 命令（stream editor）：

格式一：
sed 【参数】“pattern 命令” 文件

格式二：
sout | sed 【参数】“pattern 命令”

参数选项：

* -n ：只匹配 pattern 匹配的行
* -e ：编辑命令，默认的选项，匹配多个 pattern 时，需要显示的指定 -e 参数，一个 * pattern 跟一个 -e
* -f  ：执行保存在文件中的 pattern 和 命令，即将 pattern 和 命令 * 组合成脚本文件，一并执行 
* -r ：支持正则表达式
* -i ：编辑

例子：

-n ：

    sed "p" sed_test.txt  ### 只用命令，没有 pattern ，命令 p 为打印命令
    sed "p" sed_test.txt -n ### 只打印匹配的行，此处无 pattern ，则打印所有行
    sed '/python/p' sed_test.txt  ### /python/ 为指定的 pattern，即需要匹配的字符串，/     / ，为固定格式
    sed '/python/p' sed_test.txt -n
    
-e ：
    
    sed -n -e "/python/p" sed_test.txt  ### 单个 pattern 默认的带有 -e 参数
    sed -n "/python/p" sed_test.txt  ### 等价于上面
    sed -n -e "/python/p" -e "/PYTHON/p" sed_test.txt ### 多个 pattern 需要显示指定多个 -e 参数

-f ：

    sed -nf sed_conf.sed sed_test.txt	### 将 /python/p 匹配模式和执行命令保存在文件中，通过执行文件执行多个命令，每个命令单独一行

-r ：

    sed -nr "/python|PYTHON/p" sed_test.txt ### -r 支持正则表达式，可以在 pattern 中使用 | 等特殊符号
-i ：

    sed "s/love/like/g" sed_test.txt  ### s///g 是文件编辑命令，查找间隔1的匹配项，替换为间隔2

pattern 的匹配模式：

    sed -n "1,2p" sed_test.txt ### 打印1-2行信息
    sed -n "3p" sed_test.txt ### 打印第3行信息
    sed -n "/l/,1p" sed_test.txt ### 打印匹配行及其之后1行的信息
    sed -n "03,+1p" sed_test.txt ### 打印第三行及其之后的1行信息
    sed -n "/^i/p" sed_test.txt ### 打印以 i 开头的行信息
    sed -n "/python/,/PYTHON/p" sed_test.txt ### 打印匹配1开始，到匹配2结束的行信息

命令选项：
执行修改命令时，需加 -i 参数选项，否则只打印结果，不执行
* -p ：打印
* -i ：匹配行之前新建行追加数据
* -a ：匹配行之后新建行追加数据
* -d ：删除匹配的行
* -r ：从外部读入数据插入匹配行下一行
* -w ：将匹配行写入外部文件，若文件已存在，则会覆盖其内容

例子：

    sed -i "/python/a append data" sed_test.txt ### 在匹配行的下一行插入信息
    sed -i  "/python/i append data" sed_test.txt ### 在匹配行的上一行插入信息
    sed -i "/append/d" sed_test.txt ### 删除匹配行
    sed -i "/python/r ./sed_test.txt" sed_test.txt ###     从指定文件读取数据插入匹配行之后的一行
    sed -i "/python/w ./sed_copy.txt" sed_test.txt ### 读取匹配行数据插入到新的文件中

sed 编辑修改文件：
格式 ：“s/pattern/要修改为什么/g”，g代表全局修改，不带 g 表示修改每行的第一处匹配项，后跟数字代表修改每行的第几个匹配项，i 代表忽略大小写，后跟 数字加g，代表从第几个开始之后全修改

    sed "s/love/like/" -in sed_test.txt ### 默认为 1，即只修改每一行第一个匹配项
    sed "s/love/like/g" -in sed_test.txt ### g 代表全局修改，即 1g，每一行从第一个匹配项开始修改
    sed "s/love/like/2" -in sed_test.txt ### 指定数字，每行从指定的位置开始修改替换
    sed "s/love/like/ig" -in sed_test.txt ### i 代表忽略大小写

反向引用 & 和 \1：
使用 & 或 \1 引用 pattern 的值。

    sed -in "s/py..../&s/g" sed_test.txt ### 在以 py 开头的单词后追加 s 字母，& 为全量引用，即代表 pattern 本身
    sed -in "s/\(python\)../\1/g" sed_test.txt ### 去除以 python 为开头的单词的之后所有字母，\1 引用 pattern 中被括号括起来的部分，括号只能出现一次，即 \1 只能使用一次，可以全量引用，也可以部分引用

脚本中使用 sed 命令，操作变量，要用双引号，否则变量会被当作字符串处理

    sed -in "s/$old_str/$new_str/g" sed_test.txt

使用 sed 进行文件内容查找脚本：
输出 my.cnf 文件中的段落名，及每个段落中包含的配置项个数

    #!/bin/bash
    #
    filePath=./my.cnf
    getParts()
    {
    	echo "`sed -n "/\[/p" $filePath | sed -e "s/\[//g" -e "s/\]//g"`"	###     获得每个段落的名称
    }
    getItems()
    {
    	echo "`sed -n "/^\[$1/,/\[.*\]/p" $filePath | egrep -v "^#|^$|^\[" | wc -l`"      ### 对每个段落中的配置项进行统计计数
    }
    index=1
    for part in `getParts`  ### 打印结果
    do
    	echo "$index : $part `getItems $part`"
    	index=`expr $index + 1`
    done
    结果：
    [root@localhost dongliulin]# ./sed_p.sh 
    1 : mysqld 5
    2 : server 3
    3 : user 4



