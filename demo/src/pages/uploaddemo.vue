<template>
  <div class="uploaddemo">uploaddemo
      <br/><br/><br/><br/><br/><br/>
      <el-upload
        ref="uploadDocFile"
        action="/service/application"
        :http-request="doNothing"
        :on-change="addDocFile"
        :before-upload="beforeUploadDocFile"
        :on-remove="removeDocFile"
        multiple
        :limit="5"
        :on-exceed="handleExceed">
        <el-button size="small" type="primary">选择文件</el-button>
        <div class="el-upload__tip" slot="tip">限制条件</div>
      </el-upload>
       <el-button type="primary" @click="onSubmit()">上传</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {

        form: {
            list:[{name:'1'},{name:'2'},{name:'3'},{name:'4'}],
            docFile: [],
        }
    };
  },
  methods: {
    doNothing() {
      // 为了使用上传文件之前的钩子before-upload，自定义此空函数，而不是设置auto-upload为false。
    },

    addDocFile(file, fileList) {
    //   if (this.isPdf(file)) {
    //     return;
    //   }
    console.log(file)

      if (file.status === 'ready') {
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
        if(this.form.list.length==this.form.docFile.length){
            // this.form.list.forEach((e,index)=>{
            //     body.alllist.push(e)
            //     body.alllist[index].docFile=this.form.docFile[index]
            // })
            console.log(Object.keys(this.form))
            Object.keys(this.form).forEach(key => {
                if (key === 'docFile') {
                    for (let value of this.form[key]) {
                        console.log(value)
                    body.append(key, value);//往docFile赋予多值formData.append('docFile', file)
                    }
                    console.log(body)
                } else {
                    body.append(key, this.form[key]);
                }
            });
            console.log(body)
            this.axios.post(api,Object.assign({}, body)).then(() => {
            this.$message.success('上传成功');
            })
            .catch(code => {
            this.$message.error('上传失败');
            });
        }else{
            this.$message.error('请保证每个项目有且只有一个附件');
        }
    },
  },
    
};
</script>
