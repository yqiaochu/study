<template>
<!-- 招标管理-招标信息录入 -->
	<div class="">
			
			<div class="queryTable">
				<div class="m_set"> 
                    <el-button type="primary" size="mini" class="m_round_btn" @click="addRow()">增加</el-button>     
                    <!-- <el-button type="primary" size="mini" class="m_round_btn" @click="delData()">删除</el-button>     -->
                    <el-button type="primary" size="mini" class="m_round_btn" @click="copyrow()">复制</el-button> 
				</div>
				<div class="m_table">
					<el-table size="mini"  
                        :header-cell-style="{background:'rgb(245,245,245)'}" 
                        stripe 
                        v-loading="loading" 
                        ref="multipleTable" 
                        :data="tableData" 
                        tooltip-effect="dark" 
                        style="width: 96%" 
                        @selection-change="multipleSelectionChange" 
                       
                        class="m_t" >
						<el-table-column type="selection" width="45"></el-table-column>
                        <el-table-column type="index" :index="indexMethod" label="序号"></el-table-column>
                        <!-- prop绑定tableList中对应的字段值 -->
                        <el-table-column  prop="lgNo" label="合同编号" align="center"  show-overflow-tooltip>
                             <!-- <template slot-scope="bctledger">
                                <el-select v-model="bctledger.row.lgNo" class='m_ipt' placeholder="请选择" @change="onChangeLgname2">
                                    <el-option
                                    v-for="item in options2"
                                    :key="item.lgNo"
                                    :label="item.label"
                                    :value="item.lgNo">
                                    </el-option>
                                </el-select>
                            </template> -->
                             <template slot-scope="bctledger">
                                <el-input v-model="bctledger.row.lgNo" ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="lgName" label="合同名称" align="center" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                <el-input v-model="bctledger.row.lgName" ></el-input>
                            </template>
                        </el-table-column>
                         <el-table-column  prop="lgFirsignunit" label="甲方合同签订单位" align="center"  width="200" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                <el-input v-model="bctledger.row.lgFirsignunit" ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="lgSecsignunit" label="乙方合同签订单位" align="center"  width="200" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                <el-input v-model="bctledger.row.lgSecsignunit" ></el-input>
                            </template>
                        </el-table-column>
                         <el-table-column  prop="lgFirsigntime" label="甲方合同签订时间"  width="200" align="center" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                 <el-date-picker
                                    class="m_ipt"
                                    v-model="bctledger.row.lgFirsigntime"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                         <el-table-column  prop="lgSecsigntime" label="乙方合同签订时间"  width="200" align="center" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                 <el-date-picker
                                    class="m_ipt"
                                    v-model="bctledger.row.lgSecsigntime"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </template>
                        </el-table-column>
						<el-table-column  prop="projectNo" label="项目编号" align="center" show-overflow-tooltip>
                            <template slot-scope="bctledger">
                                 <el-select v-model="bctledger.row.projectNo" class='m_ipt' placeholder="请选择" @change="((val)=>{onChangeLgname(val, bctledger.row)})">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.projectNo"
                                    :label="item.label"
                                    :value="item.projectNo">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
						<el-table-column  prop="projectName" label="项目名称" align="center" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                <el-input v-model="bctledger.row.projectName" :label="bctledger.row.projectName" readonly></el-input>
                            </template>
                        </el-table-column>
						<el-table-column  prop="lgResuser" label="责任人" align="center" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                <el-input v-model="bctledger.row.lgResuser"></el-input>
                            </template>
                        </el-table-column>
						<el-table-column  prop="lgFolluser" label="跟进人" align="center" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                <el-input v-model="bctledger.row.lgFolluser"></el-input>
                            </template>
                        </el-table-column>
                       
                        <el-table-column  prop="lgPlanstatdate" label="计划开工时间" width="200" align="center" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                 <el-date-picker
                                    class="m_ipt"
                                    v-model="bctledger.row.lgPlanstatdate"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker> 
                            </template>
                        </el-table-column>
                        <el-table-column  prop="lgPlanenddate" label="计划竣工时间" width="200" align="center" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                 <el-date-picker
                                    class="m_ipt"
                                    v-model="bctledger.row.lgPlanenddate"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="lgPaymethod" label="支付方式" align="center"  width="100" show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                <el-input v-model="bctledger.row.lgPaymethod"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column  prop="orgNo" label="所属单位" align="center"  show-overflow-tooltip>
                             <template slot-scope="bctledger">
                                <el-input v-model="bctledger.row.orgNo" readonly></el-input>
                            </template>
                        </el-table-column>
						<el-table-column label="合同附件上传"  width="100" align="center">
							<template slot-scope="scope">
								<el-button class='btn-style'  @cell-click="lookDetail(scope.row.consId)" type="text" size="small">查看</el-button>
							</template>
						</el-table-column>
                        <el-table-column label="经法流转单上传"  width="120" align="center">
							<template slot-scope="scope">
								<el-button class='btn-style'  @cell-click="lookDetail(scope.row.consId)" type="text" size="small">查看</el-button>
							</template>
						</el-table-column>

					</el-table>
				</div>
				<div class="m_total">
					<p class="p_total">每页条数:<span class="p_span">10</span>条&nbsp;&nbsp;总条数:<span class="p_span">{{total}}</span>条</p>
				</div>
				<div class="m_pages">
					<el-pagination
						@current-change="handleCurrentChange"
						:current-page.sync="currentPage"
						:page-size="10"
						layout="prev, pager, next, jumper"
						:total=this.total
						class="page">
					</el-pagination>
				</div>
                <div style="text-align:right;">
                    <el-button type="primary" size="large" class="m_full_btn" :loading="loading">取消</el-button>
                    <el-button
                    type="primary"
                    size="large"
                    class="m_full_btn"
                    @click="insert()"
                    :loading="loading"
                    >保存</el-button>
                </div>
            </div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
                searchform:{},
                optionList:[{
                    name:'省公司',
                    value:1
                },{
                    name:'公司',
                    value:2
                }],
                //表格多选选择的数据条目集合
                multipleSelection:[],
                tableData:[],
				total:0,
                currentPage:1,
                options:[{
                    projectName:'11111',
                    projectNo:1
                },
                {
                    projectName:'22222',
                    projectNo:2
                }],
                options2:[],

               
			}
		},
		methods: {
            //重置
            reset(){
                this.searchform={}
            },
            //计算序号
            indexMethod(index) {
                return index+1  +((this.currentPage-1)*10);
            },
			
			//查询操作
			lookUp(){
                var param = this.searchform;
                BCtLedgerquery(param,this.currentPage).then(
                    res => {   
                        this.tableData=res.data.data.list;
                        console.log(this.tableData)
                        this.total=res.data.data.total;
                     
                    },
                )
                .catch(err => {
                //请求数据失败
                console.log('请求数据失败', err)
                })
            },
            
            //选择表格中的数据时触发的事件
			multipleSelectionChange(val){
                this.multipleSelection=val;
			},
			//点击分页时进行的操作
			handleCurrentChange(val) {
				this.lookUp();
            },

            //保存按钮
            insert() {
                console.log(this.tableData);
                var d = new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                var user=getCookie("username");
                addBCtLedgers(this.tableData,user,datetime).then(
                    res => {
                        this.$message({
                            message: '恭喜你，合同信息添加成功',
                            type: 'success'
                        });     
                    },
                ).catch(err => {
                    //请求数据失败
                    this.$message.error('合同信息添加失败');
                })
               
            },

			//增加行
            addRow() {                
                //清空选择项
                var list = {}
                this.tableData.unshift(list)
                console.log("aaaa"+this.tableData)
                this.$refs.multipleTable.clearSelection()
                console.log(this.multipleSelection)
                
                this.multipleSelection=[]
                console.log(this.multipleSelection)
            },
            //复制行
            copyrow() {     
                if(this.multipleSelection.length>1){
                   this.$message.warning('只能选择一个操作对象');
                }else if(this.multipleSelection.length==0){
                    this.$message.warning('请至少选择一个操作对象'); 
                }else{
                    var list = {};
                    this.tableData.unshift( this.multipleSelection[0])
                }
               
            },
            // 删除选中行
            delData() {
                if(this.multipleSelection.length<1){
                    this.$message({
                    message: '只少选中一条数据',
                    type: 'warning',
                    })
                }else if(this.multipleSelection.length>0){
                    console.log(this.multipleSelection.length)
                }
                // 删除完数据之后清除勾选框
                this.$refs.tableData.clearSelection()
            },
           
            
            
            importExcel(files){
                var btUser=getCookie("username");
                var d = new Date();
                var datetime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                let that = this
                // FormData 对象
                var form = new FormData();
                form.append("file", files.file);// 文件对象
                console.log(form )
                
                // XMLHttpRequest 对象
                var xhr = new XMLHttpRequest();
                xhr.timeout = 30000; //设置超时
             
                var flag="2";
                xhr.open("post", "/mp/mpmp/btdbatch/importExcel?flag="+flag+"&btUser="+btUser+"&btCreatetime="+datetime, true);
                let token = sessionStorage.getItem('token')
                xhr.setRequestHeader('token', token);
                xhr.responseType = "json";
                xhr.onload = function () {
                if (xhr.response.success == true) {
                    // that.$message.error(response.message)
                    // return false;
                     that.$message.success('导入成功!')
                }
                   
                };
                    xhr.ontimeout = function () {
                    that.$message.error('数据加载失败，请刷新页面')
                };
                    xhr.onerror = function (res) {
                    that.$message.error('数据加载失败，请刷新页面')
                };
                    xhr.send(form);
			
            },

            download() {
                expbtd(this.searchform)
                .then(response => {
                // 将文件流转成blob形式
                const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
                console.log(blob);
                let filename = '招标信息.xls'
                // 创建一个超链接，将文件流赋进去，然后实现这个超链接的单击事件
                const elink = document.createElement('a')
                elink.download = filename
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href) // 释放URL 对象
                document.body.removeChild(elink)
                })
                .catch(() => {
                this.$message.error('导出失败')
                })
            },


            onChangeLgname(val,row){
                console.log(row)
                console.log(this.tableData)
                for(var i = 0; i < this.options.length; i++) {      
                    if(this.options[i].projectNo === val){
                       row.projectName = this.options[i].projectName;
                        this.tableData.pd=this.options[i].projectId; 
                        this.tableData.orgNo=this.options[i].orgNo; 
                    }
                }
            },
         

          onChangeLgname2(val){
                for(var i = 0; i < this.options2.length; i++) {      
                    if(this.options2[i].lgNo === val){ 
                       this.tableData.lgId = this.options2[i].lgId;
                       this.tableData.lgName = this.options2[i].lgName;
                       this.tableData.lgSigntime = this.options2[i].lgSigntime;
                       this.tableData.lgFirsignunit = this.options2[i].lgFirsignunit;
                      
                    }
                }
            },
           

            //上传文件成功调用的方法
            handleVodUploadSuccess(res, file, fileList) {
                console.log("res")
                console.log(res)
                this.form.dataName=res.fileName
                this.form.dataSize=res.fileSize
                this.form.dataSaveUrl=res.fileUrl
            },


            cellclick(row, column){
                console.log(row[column.property])
                if(row[column.property]){
                    alert(1)
                row[column.property].edit = true;
                setTimeout(() => {
                    this.$refs[column.property].focus()
                }, 20);
                }
            },
            queryPId(){
                queryBRmResre().then(
                    res => {
                        this.options=res.data.data;  
                        console.log(this.options);         
                    },
                    )
                    .catch(err => {
                    //请求数据失败
                    console.log('请求数据失败', err)
                })
            },
             //查询合同编号   
            querylgId(){
                queryBCtLedger().then(
                    res => {
                        this.options2=res.data.data;  
                        console.log(this.options2);         
                    },
                    )
                    .catch(err => {
                    //请求数据失败
                    console.log('请求数据失败', err)
                })
            },
            //数据字典
            // userTypeSelect() {
            //     var api = "/sesa-server/api/sesa/server/dict/getdict";
            //     var param = {
            //         dictTypeCode: "userClassify"
            //     };
            //     this.axios.get(api, { params: param }).then(response => {
            //         this.userTypeOptions = response.data.data;
            //     }).catch(error => {
            //         console.log(error);
            //     });
            // },		
                
            },

            
            mounted() {
                this.lookUp();
                this.queryPId();
                this.querylgId();
                
                

            }
	}
</script>

<style scoped>
 .inline-block {
    display: inline-block;
}
.btn-style{ 
    background-color:#008ECB ;
 }
</style>

