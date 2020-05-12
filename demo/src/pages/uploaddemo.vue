<template>
  <div class="uploaddemo">uploaddemo
      <el-button @click="aaa()">111111111111111</el-button>
      <br/><br/><br/><br/><br/><br/>
            <el-upload
                ref="uploadDocFile"
                action="/service/application"
                :http-request="doNothing"
                :on-change="(file, fileList) => {addDocFile(file, fileList, 1)}"
                :before-upload="beforeUploadDocFile"
                :on-remove="removeDocFile"
                multiple
                :limit="1"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">文件1</el-button>
                <div class="el-upload__tip" slot="tip">限制条件</div>
            </el-upload>
            <el-upload
                ref="uploadDocFile"
                action="/service/application"
                :http-request="doNothing"
                :on-change="(file, fileList) => {addDocFile(file, fileList, 2)}"
                :before-upload="beforeUploadDocFile"
                :on-remove="removeDocFile"
                multiple
                :limit="1"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">文件2</el-button>
                <div class="el-upload__tip" slot="tip">限制条件</div>
            </el-upload>
            <el-upload
                ref="uploadDocFile"
                action="/service/application"
                :http-request="doNothing"
                :on-change="(file, fileList) => {addDocFile(file, fileList, 3)}"
                :before-upload="beforeUploadDocFile"
                :on-remove="removeDocFile"
                multiple
                :limit="1"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">文件3</el-button>
                <div class="el-upload__tip" slot="tip">限制条件</div>
            </el-upload>
            <el-upload
                ref="uploadDocFile"
                action="/service/application"
                :http-request="doNothing"
                :on-change="(file, fileList) => {addDocFile(file, fileList, 4)}"
                :before-upload="beforeUploadDocFile"
                :on-remove="removeDocFile"
                multiple
                :limit="1"
                :on-exceed="handleExceed">
                <el-button size="small" type="primary">文件4</el-button>
                <div class="el-upload__tip" slot="tip">限制条件</div>
            </el-upload>
        <el-button type="primary" @click="onSubmit()">上传</el-button>
    <br/><br/><br/><br/>
        用for循环的办法减少代码量的写法，上传按钮和上面公用
        filetypeList里面按顺序放每个按钮需要绑定的类型，用于区分每个文件对应的什么
        <el-upload v-for="i in 4" :key="i"
            ref="uploadDocFile"
            action="/service/application"
            :http-request="doNothing"
            :on-change="(file, fileList) => { addDocFile(file, fileList, filetypeList[i-1])}"
            :before-upload="beforeUploadDocFile"
            :on-remove="removeDocFile"
            multiple
            :limit="1"
            :on-exceed="handleExceed">
            <el-button size="small" type="primary">文件{{i}}</el-button>
            <div class="el-upload__tip" slot="tip">限制条件</div>
        </el-upload>
    </div>
</template>
<script>
export default {
  data() {
    return {
        filetypeList:['项目文件','审核文件','示例文件','其他文件'],
        form: {
            name:'1',
            docFile: [],
        }
    };
  },
  methods: {
      aaa(){
           var formData=new FormData();
            // 通过append()方法追加数据
            formData.append("name","Lori");
            console.log(formData.get("name"))
      },
    doNothing() {
      // 为了使用上传文件之前的钩子before-upload，自定义此空函数，而不是设置auto-upload为false。
    },

    addDocFile(file, fileList,data) {
      if (file.status === 'ready') {
        file.raw.filetype=data  //需求：file和文件上传位置相关联
        console.log(file.raw)
        this.form.docFile.push(file.raw);
      }
    },

    beforeUploadDocFile(file) {
      const maxFileBytes = 400 * 1024 * 1024;
      const isSizeFit = file.size <= maxFileBytes;

      if (!isSizeFit) {
        this.$message.error('不能大于2mb');
      }

      return isSizeFit;
    },

    removeDocFile(file, fileList) {
      let index = this.form.docFile.indexOf(file.raw);
      this.form.docFile.splice(index, 1);
    },

    handleExceed(files, fileList) {
      this.$message.warning('超过个数限制');
    },

    onSubmit() {
        let api='/api'
        let body = new FormData();
        console.log('docFile', body.getAll('docFile'));
            console.log(Object.keys(this.form))
            Object.keys(this.form).forEach(key => {
                if (key === 'docFile') {
                    for (let value of this.form[key]) {
                        body.append(key, value);//往docFile赋予多值formData.append('docFile', file)
                        console.log(body.get(key))
                    }
                    
                } else {
                    body.append(key, this.form[key]);
                }
            });
            console.log('docFile', body.getAll('docFile'));//通过get(key)与getAll(key)来获取相对应的值


            this.axios.post(api,body,{headers:{
                'Content-Type':'multipart/form-data'
            }}).then(() => {
                this.$message.success('上传成功');
            }).catch(code => {
                this.$message.error('上传失败');
            });
    },
  },
    
};
</script>
