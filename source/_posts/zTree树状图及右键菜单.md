---
title: zTree 右键菜单自定义实现
categories:
- [zTree]
tags:
- [zTree]
index_img: /img/ztree.jpg
date: 2019-10-10 10:00:00
---

### html代码

```html
<!DOCTYPE html>
<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" /><!-- 兼容ie -->
<html>
<head>
<base href="<%=basePath%>">
<title></title>
<script type="text/javascript">
	var basePath = "${basePath}";
	var staticBasePath = "${staticBasePath}";;
</script>
<!-- jquery 文件-->
<script type="text/javascript" src="skin/meteringTS/jquery/jquery-1.9.1.js" ></script>
<script type="text/javascript" src="skin/meteringTS/jquery/jquery.form.js" ></script>
<!-- bootstrap 文件 -->
<link rel="stylesheet" href="skin/meteringTS/bootstrap/css/bootstrap.css">
<script src="skin/meteringTS/bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="skin/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="skin/ztree/js/jquery.ztree.core.js"></script>
<script type="text/javascript" src="skin/ztree/js/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="skin/ztree/js/jquery.ztree.exedit.js"></script>
<script type="text/javascript" src="skin/ztree/js/jquery.ztree.exhide.min.js"></script>
</head>
<body>
<style type="text/css">
.table {
        table-layout: fixed !important;
    }
.table tbody tr td{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.nav-tabs>LI.active>A {
	color: #fff !important;
	background: #75BEAD !important
}

.nav-tabs>LI>A {
	color: #75B0A6 !important
}

.nav-tabs>LI {
	border-right: 1px solid #8ED7D2
}

.nav-tabs>LI>A {
	margin-right: 0px
}

.nav-tabs {
	border-bottom: 1px solid #8ED7D2 !important
}

.nav>LI>A {
	padding: 6px 12px
}

.tab-pane {
	height: 590px
}

.btn {
	color: #64B9B4;
	border-color: #54B2AC;
}

/* 自动补全数据多时显示下拉框 */
.ui-autocomplete {
	max-height: 200px;
	overflow-y: auto; /* 防止水平滚动条 */
	overflow-x: hidden;
}

/* IE 6 不支持 max-height,我们使用 height 代替，但是这会强制菜单总是显示为那个高度 */
.ui-autocomplete {
	height: 200px;
}

.dist_statis {
	border: none;
	min-width: 500px;
}

.search {
	padding-bottom: 0px;
	min-width: 500px;
}

.fault_btn {
	margin-top: 10px
}

.statis_top ul {
	padding: 0;
	padding-left: 1%
}

.statis_top ul li {
	cursor: pointer
}

.asset_right ul {
	margin-top: 2px
}

.asset_right ul li {
	float: left;
	list-style: none;
	margin-right: 15px;
	cursor: pointer;
	display: inline-block;
	line-height: 24px;
	text-align: center;
	color: #54B2AC
}

.asset_title {
	min-width: 500px;
}

.w80 {
	width: 80px;
	height: 24px;
	background: url(skin/meteringTS/custom/images/btn-bg-80.png)
}

.w120 {
	width: 120px;
	height: 24px;
	background: url(skin/meteringTS/custom/images/btn-bg-120.png)
}

.w80:hover {
	background: url(skin/meteringTS/custom/images/btn-bg-80-on.png)
}

.w120:hover {
	background: url(skin/meteringTS/custom/images/btn-bg-120-on.png)
}

/* 弹出框样式修改 */
.ui-dialog-buttons,.ui-widget-content {
}

.ui-dialog-content {
	border: none !important
}

.ui-dialog-buttons .ui-dialog-content {
}

.ui-dialog-buttonset button {
	border-color: #E3F3F2 !important;
	background-color: #E3F3F2 !important;
	outline: none !important;
}

.onLeft {
	width: 25%;
	height:90%;
	float:left;
	margin: 10px;
	overflow: hidden;
    overflow-y: auto;
	background-color:#F6FCFC;
	border:1px solid #6EC5B9;
}

div.onLeft {
	position: fixed;
	top: 0px;
}

div.inquiry {
    position: relative;
    left: 40px;
    margin: 10px;
    width: 200px;
}

.table > TBODY > TR > TD {
    padding: 4px 8px;
}

div#rMenu {
	position:absolute;
	visibility:hidden;
	top:0;
	text-align: center;
	padding: 2px;
	background:#DFDFDF;
}

div#rMenu ul li{
	margin: 1px 0;
	padding: 0 5px;
	cursor: pointer;
	list-style: none outside none;
	background-color: #DFDFDF;
}

div#rMenu ul{
	padding: 0px;
}

.ztree * {
	font-size: 14px;
}

.ztree li a input.rename {
	height:22px; 
	width:100%; 
	font-size: 14px;
}
 html, body{
	width: 100%;
 	height: 100%;
}
        
.wrap {
    height: 100%;
    position: relative;
    padding-top: 0px;
    padding-bottom: 10px;
    box-sizing: border-box;
}
.right {
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
}
</style>

<div class="container wrap">
	<div class="tab-content onLeft ">
		<label for="key" class="col-sm-3 control-label" style="top:25px">搜索:</label>
		<div class="inquiry">
			<input type="text" id="key" value="" class="" />
			<img src="./skin/meteringTS/custom/images/u975.png"/>
		</div>
		<ul id="treeDemo" class="ztree"></ul>
		<div id="rMenu">
			<ul>
			<li id="m_add" onclick="addTreeNode();">添加</li>
			<li id="m_mov_up" onclick="moveNode(1);">上移</li>
			<li id="m_mov_down" onclick="moveNode(0);">下移</li>
			<li id="m_del" onclick="removeTreeNode();">删除</li>
			<li id="m_rename" onclick="renameEditOpen();">重命名</li>
			</ul>
		</div>
	</div>
<!-- 子页面 -->
	<div class="right" style="border:1px solid #6EC5B9;">
		<iframe id="iframeShow" frameborder="0" style="display: block;" width="100%" height='90%'></iframe>
	</div>
</div>

<!-- 模态弹框 -->
<div id="op_div" style="display:none;">
	<iframe id='op_iframe' frameborder='0' scrolling='auto' width='100%' height='100%'></iframe>
</div>
<!-- end container -->
</body>
</html>
```

### js代码

```javascript
<script type="text/javascript">
$(function(){
	//初始化岗位树
	initTree();
	iframeShow("");
	//树型图搜索框事件绑定
	var key = $("#key");
	key.bind("propertychange", searchNode)
	.bind("input", searchNode);
})

//选中单选框并展示该项详细数据
function iframeShow(jobId){
	$("#iframeShow").attr("src","<%=basePath%>relaJobStandardWeb/listPage.so?jobId=" + jobId);
}


//ztree 设置
var setting = {
        view: {
            showIcon: false,
			dblClickExpand: false
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id", 
                pIdKey: "pid",
                rootPId: 0
            }
        },
		callback: {
			onClick: onClick,
			onRightClick: OnRightClick,
			onRename: onRename
		},
		view: {
			fontCss: getFontCss,
			showIcon: false
		}
		,edit: {
			enable: true,
			showRenameBtn: false,
			showRemoveBtn: false,
			editNameSelectAll: true,
			drag: {
				isCopy: false,
				isMove: false
			}
		}
    };

//字体样式
function getFontCss(treeId, treeNode) {
	return (!!treeNode.highlight) ? {color:"#A60000", "font-weight":"bold", "font-size":"18px"} : {color:"#333", "font-weight":"normal", "font-size":"18px"};
}

function initTree(){
	 $.ajax({
			url: '<%=basePath%>jobIdentificationWeb/queryList.so',
			type:"POST", 
			async:false/*是否异步*/,
			data:{},
			dataType: "json"
		}).done(function(data){
			if(data){
				$.fn.zTree.init($("#treeDemo"), setting, data);
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.expandAll(true);
			}
		}).fail(function(data){
			dialog("列表获取失败!");
	});
}

//右键菜单
function OnRightClick(event, treeId, treeNode) {
	console.log(treeNode);
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.selectNode(treeNode);
		showRMenu(event, treeNode, window.event.clientX, window.event.clientY);
}

//右键菜单显示
var rMenu = $("#rMenu");
function showRMenu(event, treeNode, x, y) {
	$("#rMenu ul").show();
	$("#m_del").show();
	$("#m_mov_up").show();
	$("#m_mov_down").show();
	$("#m_add").show();
	if (treeNode.level==0) {
		$("#m_del").hide();
		$("#m_mov_up").hide();
		$("#m_mov_down").hide();
	} else if (treeNode.level==1) {
	} else{
		$("#m_add").hide();
	}
    y=event.target.offsetTop;
	//x=event.target.offsetWidth;
    rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

	$("body").bind("mousedown", onBodyMouseDown);
}
function hideRMenu() {
	if (rMenu) rMenu.css({"visibility": "hidden"});
	$("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event){
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
		rMenu.css({"visibility" : "hidden"});
	}
}

//右键新增节点
var addCount = 1;
function addTreeNode() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	hideRMenu();
	var newNode = { name:"新增" + (addCount++)};
	var parentNode = zTree.getSelectedNodes()[0];
	if (parentNode) {
		$.ajax({
			url: '<%=basePath%>jobIdentificationWeb/addOrEdit.so',
			type:"POST", 
			async:false/*是否异步*/,
			data:{jobName: newNode.name, parentId: parentNode.id},
			dataType: "json"
		}).done(function(data){
			if(data.success){
				newNode.id = data.data.id;
				newNode.sid = data.data.sortId;
				zTree.addNodes(parentNode, -1, newNode);
				zTree.editName(zTree.getNodeByParam("id", newNode.id, null));
			}else{
				dialog("节点添加失败!");
			}
		}).fail(function(data){
			dialog("节点添加失败!");
		});
	} 
	
}

//右键重命名
function renameEditOpen() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	hideRMenu();
	var node = zTree.getSelectedNodes()[0];
	zTree.editName(node);
}

//右键重命名回调
function onRename(event, treeId, treeNode, isCancel) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	if (treeNode && treeNode.name != '') {
		if(treeNode.id!=null){
			$.ajax({
				url: '<%=basePath%>jobIdentificationWeb/addOrEdit.so',
				type:"POST", 
				async:false/*是否异步*/,
				data:{jobName: treeNode.name, id: treeNode.id, parentId: treeNode.pid, sortId: treeNode.sid},
				dataType: "json"
			}).done(function(data){
				if(!data.success)
					dialog("节点重命名失败!");
			}).fail(function(data){
				dialog("节点重命名失败!");
			});
		}else{
			dialog("节点获取失败，稍后尝试!");
		}
	} 
	
}

//右键删除节点
function removeTreeNode() {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	hideRMenu();
	var nodes = zTree.getSelectedNodes();
	var rowlist = [];
	if (nodes && nodes.length>0) {
		if (nodes[0].children && nodes[0].children.length > 0) {
			var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
			if (confirm(msg)==true){
				rowlist.push(nodes[0].id);
				$.each(nodes[0].children, function(index, node){
					rowlist.push(node.id);
					});
			}
		} else {
			rowlist.push(nodes[0].id);
			
		}
		$.ajax({
			url: '<%=basePath%>jobIdentificationWeb/delByIds.so',
			type:"POST", 
			async:false/*是否异步*/,
			data:"rowList="+rowlist,
			dataType: "json"
		}).done(function(data){
			if(data.success)
				zTree.removeNode(nodes[0]);
			else
				dialog(data.message);
		}).fail(function(data){
			dialog("节点删除失败!");
		});
	}
}

//右键移动
function moveNode(e){
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = zTree.getSelectedNodes();
	hideRMenu();
	if(nodes.length>0){
		var node = nodes[0];
		if(e){//上移
			var preNode = node.getPreNode();
			changeNode(preNode, node, "prev");
		}else{//下移
			var nextNode = node.getNextNode();
			changeNode(nextNode, node, "next");
		}
	}
}

//交互两节点的 sid 即顺序
function changeNode(targetNode, treeNode, moveType){
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	if(targetNode && treeNode && targetNode.id && treeNode.id && targetNode.sid && treeNode.sid){
		$.ajax({
			url: '<%=basePath%>jobIdentificationWeb/addOrEdit.so',
			type:"POST", 
			async:false/*是否异步*/,
			data:{jobName: treeNode.name, parentId: treeNode.pid, id: treeNode.id, sortId: targetNode.sid},
			dataType: "json"
		}).done(function(data){
			var _treeNode_sid=treeNode.sid;
			if(data.success){
				treeNode.sid=targetNode.sid;
				$.ajax({
					url: '<%=basePath%>jobIdentificationWeb/addOrEdit.so',
					type:"POST", 
					async:false/*是否异步*/,
					data:{jobName: targetNode.name, parentId: targetNode.pid, id: targetNode.id, sortId: _treeNode_sid},
					dataType: "json"
				}).done(function(data){
					if(data.success){
						targetNode.sid=_treeNode_sid;
						zTree.moveNode(targetNode, treeNode, moveType);
					}else{
						dialog("节点移动失败!");
					}
				}).fail(function(data){
					dialog("节点移动失败!");
				});
			}else{
				dialog("节点移动失败!");
			}
		}).fail(function(data){
			dialog("节点移动失败!");
		});
	}
}

//节点单节回调
function onClick(e,treeId, treeNode) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	if(treeNode.level == 2){
		iframeShow(treeNode.id);
	}else{
		zTree.expandNode(treeNode);
	}
}

var lastValue = "", nodeList = [];

function searchNode(e) {
	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var value = $.trim(key.value);
		if (lastValue === value) return;
		lastValue = value;
		ztreeFilter(zTree,value);  
}

//搜索框实现
function ztreeFilter(zTreeObj,_keywords,callBackFunc) {
	var nameKey = zTreeObj.setting.data.key.name; 
    function filterFunc(node) {
	 if(node && node.oldname && node.oldname.length>0){
            node[nameKey] = node.oldname;
        }
        zTreeObj.updateNode(node);
        if (_keywords.length == 0) { 
            zTreeObj.showNode(node);
            zTreeObj.expandNode(node, true);
            return true;
        }
        if (node[nameKey] && node[nameKey].toLowerCase().indexOf(_keywords.toLowerCase())!=-1) {
            node.highLight = true;
        	zTreeObj.updateNode(node);
            zTreeObj.showNode(node);
            return true; 
        }
        zTreeObj.hideNode(node);
        return false;
    }
    var nodesShow = zTreeObj.getNodesByFilter(filterFunc, false, zTreeObj.getNodeByParam("id", 0));
    processShowNodes(zTreeObj, nodesShow, _keywords);//对获取的节点进行二次处理
}

//对符合条件的节点做二次处理
function processShowNodes(zTreeObj,nodesShow,_keywords){
    if(nodesShow && nodesShow.length>0){
        if(_keywords.length>0){ 
            $.each(nodesShow, function(n,obj){
                var pathOfOne = obj.getPath();//向上追溯,获取节点的所有祖先节点(包括自己)
                if(pathOfOne && pathOfOne.length>0){ //对path中的每个节点进行操作
                    for(var i=0;i<pathOfOne.length-1;i++){
                        zTreeObj.showNode(pathOfOne[i]); //显示节点
                        zTreeObj.expandNode(pathOfOne[i],true); //展开节点
                    }
                }
            });             
        }else{ 
            var rootNodes = zTreeObj.getNodesByParam('level','0');
            $.each(rootNodes,function(n,obj){
                zTreeObj.expandNode(obj,true); 
            });
        }
    }
}

</script>
```

