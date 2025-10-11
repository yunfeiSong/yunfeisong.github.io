---
title: Bootstrap-Table 行编辑
categories:
- [Bootstrap]
tags:
- [Bootstrap]
index_img: /img/bootstrap.jpg
date: 2019-10-10 10:00:00
---

### bootstrap-table 行编辑

#### html 代码
```html
<div class="container">
	<div class="asset_title">
		<div class="asset_left"><span>考试管理信息</span></div>
		<div class="asset_right">
			<ul>
				<li class="w80" onclick="insertRow()">添加试题</li>
			</ul>
		</div>
	</div>
	<div id="myTabContent" class="tab-content tab-second ">
		<table id="tableOne" class="text-nowrap"></table>
	</div>
</div>
```

#### js 代码
```javascript
<script type="text/javascript">
$(function(){
	initTable();
	//保存
	$("#saveExamPaper").bind("click",function(){
		var rows = $('#tableOne').bootstrapTable('getData',false);
		for(i=0;i<rows.length;i++){
       	 	if(rows[i].qubankId == null){
       	 		dialog("请先选择题库！");
           	 	return;
       	 	}
       	 if(rows[i].radioCount <= 0 || rows[i].multiCount <= 0 || rows[i].judgeCount <= 0 || rows[i].saqCount <= 0){
    	 		dialog("题目数量不能为零！");
        	 	return;
    	 	}
		}
		$("#form").ajaxSubmit({
			type: "POST",//方法类型
	        dataType: 'json',//预期服务器返回的数据类型
	        url: "<%=basePath%>examPaperWeb/addOrEdit.so",
	        async: true,
	        success: function (result) {
           	 	if(result.success){//保存成功跳转到列表页面
               	 	$.each(rows, function(index, e){
                   	 	e.paperId = result.data;//为考试题库赋值试卷id
                   	 	});
	           	 	$.ajax({
	        			type: "POST",//方法类型
	        	        dataType: 'json',//预期服务器返回的数据类型
	        	        url: "<%=basePath%>examRepoWeb/addOrEdit.so",
	        	        data: {lists: rows},
	        	        async: true,
	        	        success: function (result) {
	                   	 	if(result.success){//保存成功跳转到列表页面
	                       	 	
	                       	 	url = "<%=basePath%>examPaperWeb/listPage.so";
	                   			dialogUrl(result.message, url);
	            			}else{
	            				dialog(result.message);
	            			}
	                    },
	                    error : function() {
	                    	dialog("系统异常，请联系管理员！");
	                    }
	        	    });
    			}else{
    				dialog(result.message);
    			}
            },
            error : function() {
            	dialog("系统异常，请联系管理员！");
            }
	    });
		//删除已关联的题库关联关系
		if(rowList && rowList.length>0){
			$.ajax({
				type: "POST",//方法类型
		        dataType: 'json',//预期服务器返回的数据类型
		        url: "<%=basePath%>examRepoWeb/delByIds.so",
		        data: "rowList="+rowList,
		        async: true,
		        success: function (result) {
	           	 	if(!result.success){//保存成功跳转到列表页面
	    				dialog(result.message);
	    			}
	            },
	            error : function() {
	            	dialog("系统异常，请联系管理员！");
	            }
		    });
		}
	});

	//取消
	$("#return").click(function(){
		window.location.href="<%=basePath%>examPaperWeb/listPage.so";
	
	});
});

//选择题库弹窗
function choiceQU(index, qubankId, id){
	var obj = {};
	obj.choiceNum = qubankId;
	var url = "<%=basePath%>examPaperWeb/quBankPage.so";
	var win = showModalDialog(url,obj,"scroll:yes;status:no;dialogWidth:800px;dialogHeight:450px");
	
	if (win != null) {//重新选择题库，题目设置清零
		$("#tableOne").bootstrapTable('updateRow', {index: index, replace:true, row:{
			id: id,
			qubankId: win[0],
			qubankTitle: win[1],
          	radioCount: 0,
          	radioScore: 0,
          	multiCount: 0,
          	multiScore: 0,
          	judgeCount: 0,
          	judgeScore: 0,
          	saqCount: 0,
          	saqScore: 0
			}});
	}
}

//获取查询参数
function queryParams(params) {
	var quarP={
	        pageSize : params.pageSize, // 每页显示数量
	        pageNo : params.pageNumber, // 当前页
	        paperId : $('#id').val()
	    }
    return quarP;
}

//初始话表格
function  initTable(){
	//先销毁表格
	$('#tableOne').bootstrapTable('destroy');
	//表格数据
	$('#tableOne').bootstrapTable({
	        method: 'post',
	        contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	        url: '<%=basePath%>examRepoWeb/listByPaperId.so',
	        striped: true,//使表格带有条纹
	        pagination: true,//在表格底部显示分页工具栏
	        sortable:true,
	        sortOrder: "asc",
	        clickEdit: true,
	        pageSize: 5,
	        pageList: customPageList,
	        paginationShowPageGo: true,		//显示跳转页码
	        sidePagination: "server",//表格分页的位置
	        search: false,          //是否显示表格搜索，此搜索是客户端搜索，不会进服务端
	        showColumns: false,     //是否显示所有的列
	        minimunCountColumns: 2,
	        showColumns: false, //显示隐藏列  
	        showRefresh: false,  //显示刷新按钮
	        silent : true, 	     // 必须设置刷新事件
	        singleSelect: false,//复选框只能选择一条记录
	        //clickToSelect: true,//点击行即可选中单选/复选框
	        queryParams: queryParams, //参数
	        queryParamsType: "", //参数格式,发送标准的RESTFul类型的参数请求
	        columns:[
	                 {title: '序号',field: 'index',align: 'center',width:'50px',formatter:function(value, row, index){
		                	var pageSize = $('#tableOne').bootstrapTable('getOptions').pageSize;//通过表的#id 可以得到每页多少条
	                        var pageNumber = $('#tableOne').bootstrapTable('getOptions').pageNumber;//通过表的#id 可以得到当前第几页
	                        return pageSize * (pageNumber - 1) + index + 1;//返回每条的序号： 每页条数 * （当前页 - 1 ）+ 序号
							//return index+1;
		             }},
		             //{radio: true,valign:"middle",align:"center",formatter: function (value, row, index){
	    		     //}},//单选框
		             //{field: 'stat',checkbox: true}, //复选框
		             {field: 'id',title: "考试题库id",valign:"middle",align:"center",visible:false},
		             {field: 'qubankId',title: "题库id",valign:"middle",align:"center",visible:false},
		             {field: 'qubankTitle',title: "题库",valign:"middle",align:"center",isTip:false,formatter:function(value,row,index){
		            	 return '<div style="cursor:pointer;" onclick="choiceQU('+index+','+row.qubankId+','+row.id+')">'+value+'</div>';
		             }},
		             {field: 'radioCount',title: "单选题数量",valign:"middle",align:"center",isTip:false,formatter:function(value){
			             return '<div contentEditable="true">' + value + '</div>'}},
		             {field: 'radioScore',title: "单选题分数",valign:"middle",align:"center",isTip:false,formatter:function(value){
				         return '<div contentEditable="true">' + value + '</div>'}},
		             {field: 'multiCount',title: "多选题数量",valign:"middle",align:"center",isTip:false,formatter:function(value){
					     return '<div contentEditable="true">' + value + '</div>'}},
		             {field: 'multiScore',title: "多选题分数",valign:"middle",align:"center",isTip:false,formatter:function(value){
						 return '<div contentEditable="true">' + value + '</div>'}},
		             {field: 'judgeCount',title: "判断题数量",valign:"middle",align:"center",isTip:false,formatter:function(value){
						return '<div contentEditable="true">' + value + '</div>'}},
		             {field: 'judgeScore',title: "判断题分数",valign:"middle",align:"center",isTip:false,formatter:function(value){
						return '<div contentEditable="true">' + value + '</div>'}},
		             {field: 'saqCount',title: "简答题数量",valign:"middle",align:"center",isTip:false,formatter:function(value){
						return '<div contentEditable="true">' + value + '</div>'}},
		             {field: 'saqScore',title: "简答题分数",valign:"middle",align:"center",isTip:false,formatter:function(value){
						return '<div contentEditable="true">' + value + '</div>'}},
		             {field: 'index',title: "操作",valign:"middle",align:"center",isTip:false,formatter: function (value, row, index){
	                    	 var url = '<a href="javascript:void(0)" style="color:blue" onclick="removeRow('+value+','+row.id+')"><img src="skin/meteringTS/custom/images/deletes.png" /></a>';
	                         return url;  
	    		         }}
		    	],
	    	onClickCell: function(field, value, row, $element){
		    	if(field=='qubankTitle' || field=='index')
			    	return;
		    	if(!row.qubankId || row.qubankId == null || row.qubankId == ''){
		    		dialog("请先选择题库！");
			    	return;
		    	}
			    $element.children().blur(function(){
				    var index = $element.parent().data('index');
				    var tdValue = $element.children().html();
				    var reg = new RegExp(/^\+?[1-9][0-9]*$/);
				    if (!reg.test(tdValue)) {
				    	tdValue = value;
				    }
					//校验题库题目数量是否满足所填试题数量
					if(field=='radioCount' || field=='multiCount' || field=='judgeCount' || field=='saqCount'){
						$.ajax({
							type: "POST",//方法类型
					        dataType: 'json',//预期服务器返回的数据类型
					        url: "<%=basePath%>examQuesWeb/list.so",
					        data: {qubankId: row.qubankId},
					        async: true,
					        success: function (result) {
						        console.log(result);
				           	 	if(result.total < tdValue){//保存成功跳转到列表页面
				    				dialog("题库题目数量不足！");
				    				$("#tableOne").bootstrapTable('updateCell', {index: index, field: field,value: value});
				    			}
				            },
				            error : function() {
				            	dialog("系统异常，请联系管理员！");
				            }
			    		});
					}
				    $("#tableOne").bootstrapTable('updateCell', {index: index, field: field,value: tdValue});
				    calcTotal();
				    });
		   	}
	    });
}

function insertRow(){
	//获取对象
	var obj=$('#tableOne');
	var count = obj.bootstrapTable('getData').length;
	//插入数据到末尾
	obj.bootstrapTable('insertRow', {
		index: count,
		row: {
			index: count,
			id: null,
			qubankId: null,
			qubankTitle: '请选择',
          	radioCount: 0,
          	radioScore: 0,
          	multiCount: 0,
          	multiScore: 0,
          	judgeCount: 0,
          	judgeScore: 0,
          	saqCount: 0,
          	saqScore: 0
		}
	  });
	$(".pagination-info").html("总记录"+(count+1)+" 条");
}

//删除一行
var rowList = [];
function removeRow(index, id){
	var count = $("#tableOne").bootstrapTable('getData').length;
	if(id){
		rowList.push(id);
		//删除一行数据
		$("#tableOne").bootstrapTable('remove', {field: 'id',values: [parseInt(id)] });
	}else{
		//删除一行数据
		$("#tableOne").bootstrapTable('remove', {field: 'index',values: [parseInt(index)] });
	}
	$(".pagination-info").html("总记录"+(count-1<0?0:count-1)+" 条");
	calcTotal();//重新计算总分
}
</script>
```