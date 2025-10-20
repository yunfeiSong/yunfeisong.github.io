---
title: Python 基础
categories:
  - [Python]
tags:
  - [Python]
index_img: /img/python.jpg
date: 2025-10-20 10:00:00
---

[TOC]

### 安装

[官网](www.python.org "www.python.org") 下载指定版本的程序包<br />
windows 直接安装即可。
linux 系统一般都自带 python 程序。推荐使用 **python3**

    python --version #查看是否安装了 python2 及其版本
    python3 --version #查看是否安装了 python3 及其版本

    yum install python3 -y #安装 python3

    python #启动 python2 命令行
    python3 #启动 python3 命令行

### 命令行工具

**IDLE** 是 python 提供的 shell 工具

### 基础语法

#### 变量

变量为弱类型，无需指定数据类型，变量命名以数字、字母、下划线组成，不能以数字开头，不能使用关键字

    >>> param = 1 #定义整形变量
    >>> param = "123" #定义字符串变量
    >>> param #使用变量
    >>> print (param) #使用变量

#### 数据类型

##### 基本数据类型

python 为弱类型语言，无需指定具体类型，所包含的数据类型有**整型、浮点型、布尔型、字符串、科学记数法**等

    >>> param = 123
    >>> param = 123.9
    >>> param = True #注意首字母大写
    >>> param = "123"
    >>> param = 1.0e10 #1 的 10 次方

###### 字符串

*   原始字符串

使用 `r` 定义原始字符串，即忽略字符串中的特殊字符，字符串不能以 `\` 结尾，可以拼接 `"\\"` 实现

    >>> param = r"origin str let's"
    >>> param = r"origin str""\\" #以 \ 结尾需要单独制定，并转意

*   长字符串

使用 `"""` 三个引号前后包围字符串

    >>> param = """
                def a long str.
                def a long str.
                def a long str.
                """

*   字符串的一些方法

<!---->

    >>> param = " title title "
    >>> param.title() #首字母大写，每个单词首字母大写，连写的两个单词只会大写第一个
    >>> param.upper() #全部转为大写
    >>> param.lower() #全部转为小写
    >>> param.strip() #截取字符串两端的空白
    >>> param.lstrip()#截取左侧空白
    >>> param.rstrip()#截取右侧空白

###### 数字

数字分为整数、浮点数，支持算数运算符，小括号等。`**`代表平方运算

    2 ** 3 #结果为 8 ，代表 2 的 3 次方运算

数字和字符串拼接时，需显示指定使用`str()`将数字转换为字符串类型

    param = 23
    message = "hello " + str(param)

###### 类型转换

使用 `int()、str()、float()` 方法进行类型转换。

    >>> param = 123
    >>> param1 = str(param) #整型转字符型
    >>> param2 = float(param)　#整型转浮点型
    >>> param3 = int(param1) #字符型转整型

##### 列表

类似数组，以 `[]` 定义，元素间以 `，` 分隔，使用索引引用元素的值 `[0/1/2]`，元素是有序可重复的<br />
python 提供了下标 `[-1]` 来访问列表的最后一个元素，以此类推，`[-2/-3/...]`

*   基础操作

<!---->

    names = ["james","paul","jili"]
    names = [] #创建空列表
    names[0] = "jame" #修改指定位置的元素
    names.append("geogle") #列表末尾追加元素
    names.insert(0, "first") #列表指定索引位置，添加元素
    names.pop() #弹出列表末尾的元素，和 remove 都有返回值
    names.remove("first") #移出列表中的指定元素，多个相同值只会移出第一个
    del names[0] #删除列表中的指定元素
    names.index("james") #返回指定值的位置，多个相同值取第一个的位置
    names.count("james") #统计指定元素在列表中的个数
    names.clear() #清空列表
    names.sort() #排序，会永久性影响列表中元素的顺序
    names.sorted() #同 sort ，不会影响列表的顺序，暂时性的排序
    names.reverse() #将列表元素颠倒顺序，永久性的
    len(names) #计算列表中元素的总数

*   遍历列表

<!---->

    #使用 for 循环遍历列表中的每个元素
    >>> for name in names:
    	print(name)

*   数值列表

<!---->

    >>> range(1,5,[1]) #生成一组数值，从 1 到 4 （不包含末尾），默认步长为 1 （即每次加 1 ）

    >>> numbers = []
    #使用 for 循环为数值列表赋值
    >>> for value in range(1,11):
            numbers.append(value)
            
    >>> numbers = list(range(1,11)) #使用 range 函数生成一组数字，使用 list 函数，将这组数字转换为列表

    >>> numbers = [value ** 2 for value in range(1,11)] #列表解析，将代码缩减为一行，写入 【】 内

    >>> min/max/sum(numbers) #计算列表中小的数、最多的数、和

*   切片

列表的一部分，称为切片，使用 `[0:4:1]` 的形式截取列表数据，`0` 是起始下标 `4` 是终止下标 **不包含末尾下标的值** `1` 是步长。<br />
不指定的代表从开头或到末尾结束，步长默认为 `1`

    >>> numbers[::2] #每隔 2 取值
    >>> numbers[0:4] #截取下标 0 到下标 3 的数据
    >>> numbers[:4] #作用同上，截取列表头部开始，到下标 3 的数据
    >>> numbers[3:] #截取下标 3 到列表末尾的数据
    >>> numbers[-3:0] #截取列表最后 3 个元素
    >>> numbers[:]  #截取列表的全部，即复制列表

    #复制列表
    >>> copys = numbers #两个变量指向同一列表，一个改变，另一个也会受影响
    >>> copys = numbers[:] #复制列表的副本，两者互不影响

*   元组

不能修改的列表，称为元组，使用 `（）` 定义，切片规则也适用于元组<br />
`tuple()` 函数将字符串转换为元组

    numbers = (1,2,3,4)
    str = "abcd"
    tup = tuple(str) # <=> ('a', 'b', 'c', 'd')
    nums = (1,) # 定义只有一个元素时，必须以逗号结尾

##### 字典

使用 `{}` 定义字典，相当于 `map` 数据类型，只是字典的键可以是任意值，字符串、数字等。<br />
字典提供了 `keys()、values()、items()` 得到字典的所有键、所有值、所以键值对的列表

    #遍历字典中的数据
    numbers = {1:2, 3:4}
    for key,value in numbers.items():
    print(key:value)

    del numbers[1] #删除字典中的元素

    numbers[1] #使用字典的数据，通过 key 引用

*   字典复制

使用 `copy()` 函数或者 `copy.deepcopy()` 复制字典的内容，前者为浅拷贝，非基本类型数据只建立新的引用，不开辟新的内存空间，后者为 `copy` 模块的深度拷贝方法，所有数据不论类型都使用新的内存空间

    x={"name":[1,2,3]}
    y=x.copy() # 浅拷贝

    import copy
    y=copy.deepcopy(x) # 深度拷贝

*   操作字典

`get(key[, default])` 方法，作用同 `dict[key]` 的使用方式，当键不存在于字典时，返回默认值，默认值默认为 **None**

    x={"name":"james"}
    x.get("name1", "lilei") # key不存在，返回默认值，未指定默认值，返回 None

`setdefault(key[, value])` 方法，向字典中追加数据，若 key 已存在，则返回原 key 的值，若不指定 value 值，则默认为 None

    x.setdefault("age", 23)

`update()` 方法，将字典复制到其他字典中

    x.update({"sex":"male"})

*   嵌套使用

列表和字典可以嵌套使用

    numbers = [{1:2, 2:3}, {3:4, 4:5}, {5:6, 6:7}] #列表中嵌套字典

    numbers = {1:[1,2,3], 2:[4,5,6]} #字典中嵌套列表

    numbers = {1:{1:1,2:2}, 2:{2:2, 3:3}, 3:{3:3, 4:4}} #字典中嵌套字典

##### 集合

`set` 为集合类型，无序不可重复，使用 `set()` 函数生成集合，或者使用 `{}`，有时会和字典产生歧义，字典的部分操作适用于集合

    x={1,2,3} # 使用 {} 生成集合
    x=set("abcd") # 会生成一个 {a,b,c,d} 的集合
    x.add("efg")
    x.update("hijk")
    x.discard("a") # 删除元素，不存在略过，remove() 元素不存在会报错
    x=frozenset("abcd") # 生成不可修改的集合

#### 运算符

*   `=` 赋值运算符

<!---->

    a,b,c=1,2,3 # 按顺序对应复制
    a=b=1 # 赋同一值，链式赋值
    a=1,2,3 # 创建元组
    a,b=b,a # 互换两值

*   `and or not` 逻辑运算符(短路与、短路或)

<!---->

    2>3 and 3<2

*   `//` 除法取商

<!---->

    13//6 # 结果为 2，即除法的商

*   三元运算符

<!---->

    # a = X if test else Y  test 成立则 a = X 否则为 Y
    a=3 if 1>2 else 4 

#### 流程控制

判断添加支持 `== != > < >= <= in not in` 等判断符，`in` 和 `not in` 用来判断列表中是否包含某个值<br />
使用 `and or` 关联两个判断条件

*   if else

<!---->

    if "james" in names :
    ...
    else:
    ...

*   if elif else

<!---->

    if test :
    ...
    elif test:
    ...
    elif test:
    ...
    else:
    ...

*   while else 循环

可使用 `break` 打断循环，使用 `continue` 结束本次循环

    #注意缩进
    while True:
        mess = input("please insert some numbers:\n")
        if mess == "q":
            break
        else:
            print("numbers is :" + mess)
    else:
        print("while end")

*   for else 循环

<!---->

    for i in range(1,10): # 输出 1 到 9 所有的整数
        print(i)
    else:
        print("for over")
        
    a = {"name":"james", "age":12}
    for i, param in a.items():      # 获取字典中的键值对
        print(Str(i) + " is " + param)

*   判断列表是否为空

          if names : #列表为空则为 False

#### 获取用户输入

使用 `input()` 函数获取用户输入，返回值为用户输入的内容，为字符串类型，python2 中为 `raw_input()`

    #在用户输入完成后，才会执行 print 语句
    message = input("input some numbers:\n")
    print("message is :" + message)

#### 函数

功能性的代码块，使用 `def` 进行定义。形参和返回值可为基本类型和列表、字典等。

    #为函数参数指定默认值，也可不指定默认值，则调用函数时，必须传入参数值
    def hello(name="paul",age="14"):
    """python function doc"""  #使用 3引号来定义函数文档信息
    #使用 return 返回结果
        return "hello " + name + ", age = " + age

    #有默认值的参数可不传值，否则会报错
    print(hello())
    #根据形参顺序匹配
    print(hello("james", "20"))
    #指定匹配关系，直接为形参赋值
    print(hello(name="rock", age="40"))

*   可变参数

使用 `*` 或 `**` 加在形参前，标识为可变形参。多个实参传递到函数会以 **元组("\*")** 或 **字典("\*\*")** 的形式保存，注意的是，只有一个实参的话，形参接收的元组中末尾会有一个 `，` 逗号，和普通形参可混合使用

    def hello(*name):
        return str(name)
        
    print(hello("james","paul"))
    #和普通参数混用
    def hello(age, **name):
        return str(name)
        
    print(hello(123,name1="james",name2="paul"))

*   模块化

使用 `import` 导入其他模块，即 `.py` 结尾的文件。使用 `as` 设置别名

    #导入指定模块
    import temp [as 别名]
    #使用 模块名.方法名 调用其中的方法
    temp.function_name()

    #导入指定模块的任一方法或全部方法
    from temp import function_name/* [as 别名]
    function_name()

    import math #导入内置模块 math ，用于数学运算
    dir(math)  #dir 查看模块包含哪些函数
    help(math.pow) # help 查看函数的使用方法

##### 内置函数

###### range()

    range(1, 5 [, 1]) #生成一组数值，从 1 到 4 （不包含末尾），默认步长为 1 （即每次加 1 ）

###### zip() & zip(\*)

    #将字典的键值对互换
    myinfor = {"name":"qiwsir","site":"qiwsir.github.io","lang":"python"}
    info = dict(zip(myinfor.values(), myinfor.keys()))

###### enumerate(list \[, start=1])

    # 得到列表的索引和元素对
    a = [1, 2, 3]
    b = enumerate(a) # 默认 start 为 0，即索引从 0 开始
    >>> list(b)
    >>> [(0, 1), (1, 2), (2, 3)]

###### 涉及函数式编程的内置函数 `lambda()、map()、reduce()、filter()`

    # lambda 替代简单的运算函数功能
    def add(a, b):
        return a + b
    <=>
    lambda a, b:a + b

    # map 对序列中的每个元素进行相同操作
    a = [1,2,3,4,5]
    map(lambda x:x**2, a) # 对列表中的每个元素进行平方操作

    # reduce 调用同一函数依次传入序列中的每个元素，得到单一结果值
    from functools import reduce # python3 将 reduce 收纳于 functools 模块中
    reduce(lambda x, y:x * y, a) # 得到所有元素的积

    # filter 过滤部分元素
    filter(lambda x:x > 3, a)
    <=>
    [x for x in a if x > 3]

#### 杂项

*   注释

python 使用 `#` 作为注释行的起始符

*   python 之禅

执行 `import this`，会打印出 python 作者给出的一些编码建议

### 类

类以 `class` 关键字定义，类名使用驼峰命名方式，类的构造方法 `__init__` 左右各**两个下划线**，`self` 代表类本身的一个实例，基类默认继承自 `object` 类

#### 定义类

    # 编写 people.py 模块，模块中可定义多个类
    # 类的注释，文档内容
    """model 类"""


    #class People(object): 基类可以省略小括号
    class People:
        
        def __init__(self, name, age):
            self.name = name
            self.age = age

        def getAge(self):
            return self.age

    class Student(People):#继承自 People 类

        def __init__(self, name, age, teacher):
            super().__init__(name, age) #先调用父类的构造方法
            self.teacher = teacher

        def getTeacher(self):
            return self.teacher

#### 类属性和实例属性

实例是类的一个对象，类是生产实例的工厂。类中定义的变量为类属性

```
# 定义一个类，类属性 x 默认值为 3
class People:
 x = 3
 
 >>> People.x  # 调用类属性
 >>> People.y = 4 # 为类增加类属性，同时，该类的实例也拥有了该属性
 
 >>> li = People() # 创建一个实例
 >>> li.x # 通过实例调用类属性
 >>> li.y = 5 # 添加实例属性，只属于该实例，并不影响类属性
 
```

#### 命名空间

分为`内置、全局、本地`命名空间三中，分别对应`内置函数、模块、模块内函数`。使用 `locals()` 函数访问本地命名空间，`globals()` 访问全局命名空间。命名空间中数据存储以`字典类型`存储

    class People:

        print(globals())
        
        def test1(name, age):
            print(locals())

#### 继承&多继承

子类的同名属性或方法会覆盖父类，多个父类中属性或方法同名，采用`广度优先`的原则匹配，即从子类定义的父类顺序从左至右，父类中没有，就搜索父类的父类，依次类推。python2 采用`深度优先`的原则，即从子类的单个父类依次往上搜索，没有则从子类的第二个父类依次往上搜索，依次类推。

    class YoungTeen:
        def __init__(self, name, age):
            print("YoungTeen=>name=" + name)
            print("YoungTeen=>age=" + age)


    class Male:
        def __init__(self, name):
            print("Male=>name=" + name)


    # 多继承
    class Student(YoungTeen, Male):
        def __init__(self, name, age):
            super(Student, self).__init__(name, age) # <=> super().__init__(name, age) 调用 YoungTeen 的初始化方法
            super(YoungTeen, self).__init__(name) # 调用 Male 的初始化方法

*   mro法则

`mro` 即 `method resolution order` (方法解释顺序)，主要用于在多继承时判断属性的路径(来自于哪个类)<br />
python3 采用 c3 算法，python 的内置函数 `__mro__/mro()`，可以打印类的 mro 顺序

#### 静态方法和类方法

使用`@staticmethod` 和 `@classmethod` 两个注解标注方法为静态方法和类方法，静态方法没有形参，不能访问类的属性。<br />
两种方法都可以被实例调用，也都可以使用类直接调用

    class Student(YoungTeen, Male):
       
        @staticmethod
        def static_test():
            print("static method")

        @classmethod
        def classic_test(cls):
            print("class method")

#### 属性私有化

使用 `__` 两个下划线加在属性名前，定义为私有属性，外部无法直接访问，通过 getter 方法访问。

    class People:
        __name = "james"

        def __init__(self):
            self.__age = "13"

        def get_name(self):
            return self.__name

        def get_age(self):
            return self.__age


    li = People()
    print(li.get_name())
    print(li.get_age())

#### 导入其他模块中的类

    from people import *

    #构建实例对象
    xiao_li = People('xiao_li', 23)
    #xiao_li.age = 23

    print(xiao_li.getAge())

    xiao_hong = Student("xiao_hong", 18, "teacher_li")
    print(xiao_hong.getTeacher())

*   python 标准库

python 提供的一系列模块的组合。

### IO

#### 文件读取

*   使用 `open()` 函数读取外部文件，使用 `with` 让 python 程序自动关闭文件读取，否则要使用 `close()` 方法手动关闭，文件路径可以是相对或绝对路径

<!---->

    #文件整个读取
    with open("mnk.py") as file:
        print(file.read()) #读取整个文件内容到内存中

    #逐行读取文件
    with open("mnk.py") as file:
        for line in file:
            print(line)  #file 为一个列表，使用 for 循环逐行读取

    #读取到列表中，供外部使用
    with open("mnk.py") as file:
        lines = file.readlines() #readlines 方法返回的是列表，file.readline() 返回一行

    print(lines) #读取操作内定义的列表，在操作之外也能访问

    #读取大文件
    import fileinput
    for line in fileinput.input("123.txt"):
        print line, # 使用 for 循环和 fileinput 模块的 input() 函数，逐行读取文件内容，‘，’是为了省略空行

*   open() 方法

open(filename, operate) 方法，有两个形参，第一个为文件路径，第二个为操作，默认只读 `r`、写 `w`、读写 `r+`、附加模式 `a`(向文件末尾追加内容)，`w+`(清空文件后，以读写模式打开)，`a+`(以读写模式打开文件，向文件末尾追加内容)，`b`(二进制形式打开文件)

#### 写入文件

*   同样使用 `open()` 方法写入文件内容, 第二个形参指定 `w` 写操作，也可以使用 `r+` 读写操作<br />
    写操作会**清空文件之前的内容**，**文件不存在则自动创建**，不覆盖只追加，应使用 `a` 附加模式

<!---->

    with open("file_out.txt", "w") as file:
        file.write("test open w oprate")
        file.write("汉字")

#### 查看文件状态

使用内置模块 `os`，查看文件的状态信息，使用内置模块 `time` 格式化显示时间

    import os
    import time

    f_stat = os.stat("123.txt") #stat 函数参数为文件路径
    time.localtime(f_stat.st_atime) # 格式化文件的时间

#### 重读文件内容

`readline()` 函数读取文件一行后，指针下标会增大，使用 `seek()` 函数操作指针的位置，指针从 0 开始

    f = open("123.txt")
    f.readline()
    f.seek(0)
    f.readline()
    f.tell()

### 异常处理

使用 `try except else` 代码块处理异常，类似于 `try catch`，使用 `pass` 忽略异常，直接跳过

    try:
        5/0
    except ZeroDivisionError:
        #pass
        print("除 0 异常")
    else:
        print("无异常")

使用 json 模块处理数据，`dump（）` 存储 json 数据到文件中， `load()` 加载 json 文件

    import json

    # 使用 dump 和 load 方法，存储和加载 json 文件
    with open("test.json", "w") as file:
        json.dump({"james": "34"}, file)
        
    # 读取 json 格式的配置文件
    with open("test.json", "r") as file:
        json_file = json.load({file)
        
    print(json_file)

### 单元测试

使用 `unittest` 模块，进行单元测试，`setUp()` 方法，用于在测试方法前执行， 测试类继承 `TestCase` 类即可<br />
使用 `unittest` 的 `main()` 方法执行测试方法，命令行 `python 文件名` 执行测试类，使用 `main()` 进行测试，测试方法都需以 `test` 开头

    import unittest

    from People import *


    class TestPeople(unittest.TestCase):
        def setUp(self):
            self.people = People("james", 23)
            self.student = Student("paul", 11, self.people)

        def test_get_age(self):
            age = self.people.get_age()
            self.assertEqual(age, 23)

        def test_get_teacher(self):
            teacher = self.student.get_teacher()
            self.assertEqual(teacher, self.people)


    if __name__ == '__main__':
        unittest.main()

