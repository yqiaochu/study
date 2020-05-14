<template>
<!-- 设计评审信息录入 -->
	<div class="">
        <span @click="$router.back(-1);" class='backbtn'> 返回</span>
        <div class="queryCard" >
            <el-form :rules="rules" ref="reviewMessAddForm" :model="reviewMessAddForm" label-width="180px" style="margin:10px;background:#262d47;text-algin:center">
				<el-form-item label="备注" prop="remark">
					<el-input  size="mini" type="textarea" :rows="2" v-model="reviewMessAddForm.remark" placeholder="请输入备注">
					</el-input>
				</el-form-item>
                <el-form-item size="mini" label="备注" prop="remark">
                    <textarea size="mini" style="width:100%" v-model="reviewMessAddForm.remark" ></textarea>
                </el-form-item>
			</el-form>
            <el-form :inline="true" size="medium"  ref="reviewMessAddForm" :rules="rules" :model="reviewMessAddForm" class="queryForm" label-width="150px" v-loading="loading">
              <!-- <el-row class="el-row">
								<el-col :span="8">
								<el-form-item size="mini" label="项目编号" prop="projectNo">
								<el-input size="mini" class="input" readonly="true" v-model="reviewMessAddForm.projectNo" ></el-input> 
								</el-form-item>
								</el-col>
								<el-col :span="8">
								<el-form-item size="mini" label="项目单位"  prop="orgNo">
								<el-input size="mini" class="input" readonly="true"  v-model="reviewMessAddForm.orgNo" ></el-input> 
								</el-form-item>
								</el-col>
								<el-col :span="8">
								<el-form-item size="mini" label="项目名称" prop="projectName">
									<el-input size="mini" class="input" readonly="true" v-model="reviewMessAddForm.projectName" ></el-input>
								</el-form-item>
								</el-col>
							</el-row>
							<el-row  class="el-row">
								<el-col :span="24">
									<el-form-item size="mini" label="项目内容" prop="projectContent">
										<textarea size="mini" style="width:100%" v-model="reviewMessAddForm.projectContent" ></textarea>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="8">
									<el-form-item size="mini" label="省公司专业处室" prop="specialDeptNo">
										<el-input  class="input" size="mini" readonly="true" style="width:100%" v-model="reviewMessAddForm.specialDeptNo" ></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="项目分类">
										<el-select v-model="reviewMessAddForm.projectType" readonly="true" class='m_ipt'>
											<el-option  v-for='(item,index) in projectTypeOption' :key='index' :label="item.codeName" :value="item.codeValue"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="专业分类">
										<el-select v-model="reviewMessAddForm.projectSpecType" readonly="true" class='m_ipt' @change="projectSpecTypeChange">
											<el-option  v-for='(item,index) in projectSpecTypeOption' :key='index' :label="item.codeName" :value="item.codeValue"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row >
								span=8是三等分，=6是四等分 
								<el-col :span="8">
									<el-form-item label="一级分类">
										<el-select v-model="reviewMessAddForm.firstType" readonly="true" class='m_ipt' @change="firstTypeChange">
											<el-option  v-for='(item,index) in firstTypeOption' :key='index' :label="item.codeName" :value="item.codeValue"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="二级分类">
										<el-select v-model="reviewMessAddForm.secondType" readonly="true" class='m_ipt'>
											<el-option  v-for='(item,index) in secondTypeOption' :key='index' :label="item.codeName" :value="item.codeValue"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item size="mini" label="资本金(万元)"  prop="capitalMoney">
										<el-input  @input="changeMoney()" class="input"  size="mini" style="width:100%" v-model="reviewMessAddForm.capitalMoney" ></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="8">
									<el-form-item size="mini" label="成本金(万元)"  prop="costMoney">
										<el-input @input="changeMoney()" class="input"  size="mini" style="width:100%" v-model="reviewMessAddForm.costMoney" ></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item size="mini" label="总投资(万元)" prop="investTotal">
										<el-input readonly="true" class="input"  size="mini" style="width:100%" v-model="reviewMessAddForm.investTotal" ></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item size="mini" label="年度投资(万元)" prop="yearInvestTotal">
										<el-input  class="input" size="mini" readonly="true" style="width:100%" v-model="reviewMessAddForm.yearInvestTotal" ></el-input>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="8">
									<el-form-item size="mini" label="填报单位" prop="reportOrgNo">
										<el-input  class="input" size="mini" readonly="true" style="width:100%" v-model="reviewMessAddForm.reportOrgNo" ></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item size="mini" label="可研情况" prop="isResearch">
										<el-select v-model="reviewMessAddForm.isResearch" class='m_ipt' readonly="true">
											<el-option  v-for='(item,index) in isResearchOption' :key='index' :label="item.codeName" :value="item.codeValue"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item size="mini" label="是否打捆"  prop="isBinding">
										<el-select v-model="reviewMessAddForm.isBinding" class='m_ipt' readonly="true">
											<el-option  v-for='(item,index) in isBindingOption' :key='index' :label="item.codeName" :value="item.codeValue"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row>
							<el-row>
								<el-col :span="8">
									<el-form-item size="mini" label="重要等级" prop="importLevel">
										<el-select v-model="reviewMessAddForm.importLevel" class='m_ipt' readonly="true">
											<el-option  v-for='(item,index) in importLevelOption' :key='index' :label="item.codeName" :value="item.codeValue"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item size="mini" label="实施年份" prop="implYear">
										<el-input  class="input" size="mini" style="width:100%" readonly="true" v-model="reviewMessAddForm.implYear" ></el-input>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item size="mini" label="可研上传" prop="rePath">
										<el-input  class="input"  accept=".xls" size="mini" type="file" name="file1" style="width:100%"  ></el-input>
									</el-form-item>
								</el-col>
							</el-row> -->
							<el-row  class="el-row">
								<el-col :span="24">
									<el-form-item size="mini" label="备注" prop="remark">
										<textarea size="mini" style="width:100%" v-model="reviewMessAddForm.remark" ></textarea>
									</el-form-item>
								</el-col>
							</el-row>
							<!-- <el-row  class="el-row">
								<el-col :span="24">
									<el-form-item size="mini" label="评审意见" prop="reviewOpinion">
										<textarea   size="mini" style="width:100%" v-model="reviewMessAddForm.reviewOpinion" ></textarea>
									</el-form-item>
								</el-col>
							</el-row>
								<el-row  class="el-row">
								<el-col :span="8">
									<el-form-item size="mini" label="评审结论" prop="reviewResult">
										<el-select v-model="reviewMessAddForm.reviewResult" class='m_ipt' @change="reviewResultChange()">
											<el-option  v-for='(item,index) in reviewResultOption' :key='index' :label="item.codeName" :value="item.codeValue"></el-option>
										</el-select>
									</el-form-item>
								</el-col>
							</el-row> -->
            <div style='text-align:center'> 
                <el-button style='margin: 10px;' type="primary" size='large'  class="m_full_btn" @click="updateReview('reviewMessAddForm')" :loading="loading">保存</el-button>
                <el-button style='margin: 10px;' type="primary" size='large'  class="m_full_btn" @click="reset()" :loading="loading">取消</el-button>
            </div>
            </el-form>
        </div>
	</div>
</template>
<script>
// import * as design from '@/api/design/design.js'
// import * as user from '@/utils/auth.js'
// import * as dict from '@/api/dict/dict.js'
	export default {
		data() {
			var validateInput = (rule, value, callback) => {
              if (value === "" || value == undefined) {
                callback();
              } else {
                var specialKey = "[`~#$^&*()=+|{}':;',\\[\\]<>?~#￥……&*（）——|{}@【】‘；：”“'。，、%  \"  ]‘'";
                for (var i = 0; i < value.length; i++) {
                if (specialKey.indexOf(value.substr(i, 1)) != -1) {
                  return callback(new Error("请勿输入特殊字符！"));
                }
                }
                callback();
              }
			};
			    var checknumber = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    const reg = /^\d+(?=\.{0,1}\d+$|$)/;
                    if (reg.test(value)) {
                    callback();
                    } else {
                    return callback(new Error("请输入正数"));
                    }
                }
            };
			return {
                reviewMessAddForm: {
					// projectId:'',
					// projectNo: '',
					// orgNo: '',
					// projectName:'',
					// projectContent: '',
					// specialDeptNo:'',
					// projectType:'',

					// projectSpecType: '',
					// firstType: '',
					// secondType:'',
					// capitalMoney: '',
					// costMoney:'',
					// investTotal:'',

					// yearInvestTotal: '',
					// reportOrgNo: '',
					// isResearch:'',
					// isBinding: '',
					// importLevel:'',
					// implYear:'',
					remark:'',
					// reviewOpinion:'',
					// reviewResult:'',
					// rePath:'',
					// operator:'',
				},
				loading:false,
				projectTypeOption:[],
                projectSpecTypeOption:[],
                firstTypeOption:[],
				secondTypeOption:[],
				isResearchOption:[],
				isBindingOption:[],
				importLevelOption:[],
				reviewResultOption:[],
				rules: {
					projectContent: [{ required: true,message: '会议内容不能为空', trigger: 'blur' },{validator: validateInput, trigger: 'blur'  }],
					costMoney: [{ required: true,message: '成本金不能为空', trigger: 'blur' },{validator: checknumber, trigger: 'blur'  },{max: 32, message: '字符长度过长', trigger: 'blur' }],
					capitalMoney: [{ required: true,message: '资本金不能为空', trigger: 'blur' },{validator: checknumber, trigger: 'blur'  },{max: 32, message: '字符长度过长', trigger: 'blur' }],
					reviewOpinion: [{ required: true,message: '评审意见不能为空', trigger: 'blur' },{validator: validateInput, trigger: 'blur'  },{max: 1024, message: '字符长度过长', trigger: 'blur' }],
					reviewResult: [{ required: true,message: '评审结论不能为空', trigger: 'blur' }],
					remark: [{validator: validateInput, trigger: 'blur'  },{max: 512, message: '字符长度过长', trigger: 'blur' }],
				},
			}
		},
		methods: {
            //重置
            reset(){
                this.reviewMessAddForm={}
			},
			  //上传可研文件并修改评审信息
			updateReview(reviewMessAddForm){
				this.$refs[reviewMessAddForm].validate((valid) => {
                if (!valid) { 
                    console.log("校验不通过")
                    return;
                }
				let file = document.getElementsByName('file1')[0].files[0]
				//首先判断有没有文件，有的话先上传得到url存入form表单
				if(file!=null){
					let fd = new FormData();
					fd.append("isRecordHis",'false');
					fd.append("moduleName",'储备管理');
					fd.append("file",file);
					design.uploadFile(fd).then(res => {
						if(res.fileUrl!=null&&res.fileUrl!=""){
							this.reviewMessAddForm.rePath=res.fileUrl
							this.reviewMessAddForm.isResearch="01"
							this.update();
						}else{
							this.$message.warning('文件上传失败');
						}
					}).catch(function(error) {
						console.log(error)
					})
				}else{
					this.update();
				}	
				})
			},
			//修改评审信息
			update(){
				this.reviewMessAddForm.operator=user.getUser().username
				var param={
					bRmResre:this.reviewMessAddForm,
					bRmDmResreInfo:{
						meetId:this.$route.query.meetId,
						projectId:this.reviewMessAddForm.projectId,
						projectContent:this.reviewMessAddForm.projectContent,
						capitalMoney:this.reviewMessAddForm.capitalMoney,
						costMoney:this.reviewMessAddForm.costMoney,
						reviewOpinion:this.reviewMessAddForm.reviewOpinion,
						reviewResult:this.reviewMessAddForm.reviewResult,
						remark:this.reviewMessAddForm.remark,
						operator:user.getUser().username,
					}
				}
				design.modifyProjAndInfo(param).then(res => {
                    if(res.data.code==200){
                        this.$message.warning('修改评审信息成功');
                    }else{
						this.$message.warning('修改评审信息失败');
						//删除上传的文件
						if(document.getElementsByName('file1')[0].files[0]!=null){
							design.deleteFile(this.reviewMessAddForm.rePath)
						}
                    }
                }).catch(function(error) {
					console.log(error)
					//删除上传的文件
					if(document.getElementsByName('file1')[0].files[0]!=null){
						design.deleteFile(this.reviewMessAddForm.rePath)
					}
				})
			},
            //计算序号
            indexMethod(index) {
                return index+1  +((this.currentPage-1)*10);
            },
			
			//查询操作
			lookUp(){
				
				var param = {
					meetId:this.$route.query.meetId,
					projectId:this.$route.query.projectId,
                };
                design.queryProjAndInfo(param).then(res => {
                    if(res.data.code==200){
						this.reviewMessAddForm=res.data.data.project
						this.reviewMessAddForm.remark=res.data.data.info.remark
						this.reviewMessAddForm.reviewOpinion=res.data.data.info.reviewOpinion
						this.reviewMessAddForm.reviewResult=res.data.data.info.reviewResult
						
                    }else{
                        this.$message.warning('查询评审信息失败');
                    }
                }).catch(function(error) {
					console.log(error)
				
                })
            },
           
              //项目分类数据字典
				projectTypeSelect() {
					dict.getDict("project_type").then(res => {
							if(res.data.code==200){
								this.projectTypeOption = res.data.data;
							}
						}).catch(function(error) {
						console.log(error)
					})
                },
                //专业分类数据字典
				projectSpecTypeSelect() {
					dict.getDict("project_spec_type").then(res => {
							if(res.data.code==200){
								this.projectSpecTypeOption = res.data.data;
							}
						}).catch(function(error) {
						console.log(error)
					})
                },		
                //一级分类数据字典
				firstTypeSelect() {
					dict.getDict("first_type").then(res => {
							if(res.data.code==200){
								this.firstTypeOption = res.data.data;
								this.firstTypeOption.forEach(e => {
									//查询处理
									if(e.codeValue==this.reviewMessAddForm.firstType){
										dict.getDictById(e.id).then(res => {
											if(res.data.code==200){
												this.secondTypeOption = res.data.data;
											}
											}).catch(function(error) {
											console.log(error)
										})
									}
								});
							}
						}).catch(function(error) {
						console.log(error)
					})
                },	
                 //可研情况数据字典
				isResearchSelect() {
					dict.getDict("is_ research").then(res => {
							if(res.data.code==200){
								this.isResearchOption = res.data.data;
							}
						}).catch(function(error) {
						console.log(error)
					})
				},	
				 //是否打捆数据字典
				isBindingSelect() {
					dict.getDict("alert_sys").then(res => {
							if(res.data.code==200){
								this.isBindingOption = res.data.data;
							}
						}).catch(function(error) {
						console.log(error)
					})
				},
				//重要等级数据字典
				importLevelSelect() {
					dict.getDict("Import_level").then(res => {
							if(res.data.code==200){
								this.importLevelOption = res.data.data;
							}
						}).catch(function(error) {
						console.log(error)
					})
				},	
				//评审结果数据字典
				reviewResultSelect(){
					dict.getDict("review_result").then(res => {
							if(res.data.code==200){
								this.reviewResultOption = res.data.data;
							}
						}).catch(function(error) {
						console.log(error)
					})
				},
				projectSpecTypeChange(val){
                    this.reviewMessAddForm.firstType=val
                },
                firstTypeChange(val){
                    this.reviewMessAddForm.projectSpecType=val
                    this.firstTypeOption.forEach(e => {
                        //查询处理
                        this.reviewMessAddForm.secondType=''
                        if(e.codeValue==val){
                            dict.getDictById(e.id).then(res => {
                                if(res.data.code==200){
                                    this.secondTypeOption = res.data.data;
                                }
                                }).catch(function(error) {
                                console.log(error)
                            })
                        }
                    });
                },		
			 //当成本金，资本金改变时，计算总金额
			 changeMoney(){
				this.reviewMessAddForm.yearInvestTotal=this.reviewMessAddForm.investTotal=parseFloat(this.reviewMessAddForm.costMoney)+parseFloat(this.reviewMessAddForm.capitalMoney)
			 },
			 reviewResultChange(){
				this.$forceUpdate()
			 },
		},
		mounted() {
			// this.lookUp();
			// this.projectTypeSelect();
            // this.projectSpecTypeSelect();
            // this.firstTypeSelect();
			// //this.secondTypeSelect();
			// this.reviewResultSelect();
			// this.isBindingSelect();
			// this.isResearchSelect();
			// this.importLevelSelect();
		
		}
	}
</script>

<style scoped>
.queryForm{
    padding: 20px 50px;
}
.queryForm>>> .el-form-item__content{
    width:calc(100% - 150px) !important;
}
</style>

