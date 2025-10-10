---
title: Gradle 简介
tags: [Gradle]
index_img: /img/gradle.jpg
date: 2019-10-10 10:00:00
---

### 简介

gradle 是基于 **JVM** 的项目构建工具，使用基于 **groovy** 的 **DSL**（领域特定语言）来定制逻辑，替代 xml ，支持 java 或 groovy 语言编写定制逻辑
gradle 从配置文件开始，默认名称为 **build.gradle**

#### helloworld

在build.gradle 文件中写入：创建一个 task （任务），执行一个 action（动作）doLast

```
task helloworld{
    doLast{
        print 'hello world'//groovy 支持省略分号和小括号
    }
}
```

可简写为：
```
task helloworld << {  // doLast 以 <<  符号代替
    println 'hello world'
}
```

命令行输入：**gradle helloworld 【-q】** 运行，将打印出 helloworld，加上 -q 可以省略命令信息，只显示结果

#### 命令行

命令行参数：
* -i 将日志级别提高到 INFO 级别，可以看到更详细的信息
* -s 输出堆栈信息，可查看错误的地方
* -b 后跟脚本名称，构建指定脚本，默认构建 build.gradle 脚本
* -x 执行任务时，排除制定的任务
* -q 省略命令信息，只显示结果
```
    gradle tasks --all // 查看当前存在的任务
    gradle properties
``` 
一个任务只会执行一次，无论是单独执行，还是作为其他任务的依赖执行<br/>
可以使用简写的形式执行任务，使用**任务名每个单词的首字母**，需要保证简写的唯一性：

```
gradle groupTherapy  <=> gradle gT
gradle groupTherapy -x yayGradle0  //  -x ：执行任务时，排除制定的任务
上述命令可简写为 gradle gT -x yG0
```

守护进程：
```
gradle taskName --daemon  // 使用守护进程构建脚本，更快
gradle taskName --no-daemon // 不使用守护进程构建脚本
gradle --stop // 结束守护进程 
```

包装器：
//创建包装器，指定使用 gradle 的版本，
// 包装器可以在没有安装 gradle 的环境中运行，从远端下载指定 gradle 版本，完全还原应用原有环境
// 在新环境下，运行 gradlew.bat/gradlew jettyStart 等 web 容器启动命令，即可直接运行应用
```
task wrapper(type: Wrapper) {
    gradleVersion = '4.10.2'
}
```
命令行执行 gradle wrapper 将会在项目根目录下，生成 gradlew 和 gradlew.bat 文件，分别为 linux 和 windows 下的执行命令
在新环境下，可使用 gradlew / gradlew.bat 还原应用环境 
### Groovy

语法类似java

1. 无需分号结尾
2. 类、方法、属性默认都是 public
3. 方法中最好一个表达式的值为返回值，可以省略 return
4. == 等价于 equals ，没有空指针异常
5. 使用 def 定义变量
6. assert 断言可在任意处使用
7. string类型有三种，‘’--字符串，“”--其中可通过 ${} 引用变量 ，‘’‘ ’‘’--字符串可换行
8. 集合都是用 [ ] 表示，可通过 。 的形式引用元素，对应arrayList 和 linkedHashMap
9. 闭包，代码块，用 { } 来表示

gradle构建项目中的，build.gradle文件：

```
group 'com.fly'
version '1.0-SNAPSHOT'
```

可在项目根目录下新建 gradle.properties 文件，将 group 和 version 等配置到其中
名称一定为 gradle.properties

```
apply plugin: 'java'//引入 java 插件
apply plugin: 'war'// 引入 war 包依赖

sourceCompatibility = 1.7

repositories {
    mavenLocal()
    maven{
        url '/*私服地址*/'
    }
    mavenCentral()//指定中央仓库
}

dependencies {
    //添加测试编译期依赖，RunTime 是运行时依赖
    compile 'log4j:log4j:1.2.17'
    testCompile group: 'junit', name: 'junit', version: '4.12'
}

//闭包
def createDir = {
    path ->
        File dir = new File(path)
        if (!dir.exists()){
           dir.mkdirs()
        }
}
//自定义任务，创建 java-src 相关目录
task makeJavaDir << {// << 表示 doLast 方法
    def paths = ['src/main/java','src/main/resources','test/main/java','test/main/resources']
    paths.each createDir //调用闭包，作为参数，此处省略了（），paths中的值将会传给闭包中的参数
}
//创建 java-web 相关目录
task makeJavaWebDir {
    dependsOn makeJavaDir //不能放在doLast等方法中
    def paths = ['src/main/webapp','src/main/webapp/WEB-INF','src/main/webapp/static']
   doLast {paths.each createDir}
}
```
