<template>
  <div class="home">
      <button @click="tosearch">tosearch</button>
    11111111111111111111111111
    <el-select
      v-model="value"
      placeholder="请选择"
      @visible-change="visibleChange"
      filterable
      :filter-method="PinyinMatch"
    >
      <el-option
        v-for="item in comminAddr"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>

<!-- 
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
              >
                <el-button  slot="trigger" size="mini" type="primary">选取文件</el-button>
                <el-button class="upload_but" 
                  size="mini"
                  type="success"
                  @click="submitUpload"
                >上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload> -->

              <router-view></router-view>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      comminAddra: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      comminAddr: [],
      value: "",
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      
    };
  },
    watch: {
      $route (to, from){
          console.log(to)
          console.log(from)
      },
        $route:{
            immediate: true,
            handler(to,from){
                console.log(to)
                console.log(from)
            }
        },
    },
  methods: {
      tosearch(){
          this.$router.push({
                path: 'searchdemo',
            })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
    visibleChange() {
      this.comminAddr = this.comminAddra;
    },
    PinyinMatch(val) {
        console.log(val)
      const PinyinMatch = require("pinyin-match");
      if (val) {
        var result = [];
        this.comminAddr.forEach(i => {
          var m = PinyinMatch.match(i.label, val);
          if (m) {
            result.push(i);
          }
        });
        this.comminAddr = result;
      } else {
        this.comminAddr = this.comminAddra;
      }
    }
  }
};
</script>
<style >
.el-upload-list{
    width: 50%;
    display: inline-block;
}
</style>