<template>
  <div class="home">
      <button @click="tosearch">tosearch</button>
    11111111111111111111111111
    <el-cascader
      v-model="value"
      :options="comminAddr"
      @change="handleChange"
      :props="{ checkStrictly: true }"
      @visible-change="visibleChange"
      filterable
      :before-filter="beforePinyinMatch"
    ></el-cascader>
    <!--  -->
  </div>
</template>
<script src="pinyin-match/dist/main.js"></script>
<script>
export default {
  data() {
    return {
    comminAddra: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      value: [],
      comminAddr: []
    };
  },
  methods: {
      tosearch(){
          this.$router.push({
                path: 'searchdemo',
            })
      },
    handleChange() {
      console.log(this.value);
    },
    visibleChange(val) {
        console.log(val)
        if(val){
            this.$nextTick(()=>{
                var aaa=document.getElementsByClassName('el-cascader-panel')[0]
                // aaa.setAttribute("style","display: block !important");
                aaa.classList.remove("disBlock")

                // aaa.className=
                var bbb=document.getElementsByClassName('el-cascader__suggestion-panel')[0]
                // bbb.setAttribute("style","display: none !important");
                bbb.classList.remove("disNone")
                // bbb.className="disNone"
            })
            
            console.log(document.getElementsByClassName('el-cascader-panel'))
            
            // document.getElementByClassName('el-cascader-panel')[0].style.display='block'
        }
        this.comminAddr =JSON.parse(JSON.stringify(this.comminAddra)) ;
    },
    beforePinyinMatch(keyword){
        this.comminAddr =JSON.parse(JSON.stringify(this.comminAddra)) ;
        console.log(keyword)
        const PinyinMatch = require("pinyin-match");
        if (keyword) {
            var result = [];
            // console.log(keyword);
            this.comminAddr.forEach(i => {
            var m = PinyinMatch.match(i.label, keyword);
            if (m) {
                result.push({
                    'label':i.label,
                    'value':i.value
                });
            }
            });
            console.log(result);
            this.comminAddr = result;
            this.$nextTick(()=>{
                var aaa=document.getElementsByClassName('el-cascader-panel')[0]
                // aaa.setAttribute("style","display: block !important");
                aaa.classList.add("disBlock")

                // aaa.className=
                var bbb=document.getElementsByClassName('el-cascader__suggestion-panel')[0]
                // bbb.setAttribute("style","display: none !important");
                bbb.classList.add("disNone")
                // bbb.className="disNone"
            })
            console.log('this.comminAddr');
            console.log(this.comminAddr);
        } else {
            console.log('111111111111111111111');
            this.comminAddr = this.comminAddra;
            console.log(this.comminAddr);
        }
        // if(val){

        // }else{

        // }
    },
    // PinyinMatch(node, keyword) {
    //     var aaa=document.getElementsByClassName('el-cascader-panel')[0]
    //         // aaa.setAttribute("style","display: block !important");
    //         aaa.className="disBlock"
    //     var bbb=document.getElementsByClassName('el-cascader__suggestion-panel')[0]
    //         // bbb.setAttribute("style","display: none !important");
    //         bbb.className="disNone"
    //         // document.getElementByClassName('el-cascader-panel')[0].style.display='block'
    //     // console.log(keyword)
      
      
    // },
    getMatch(list) {}
  },
  mounted() {
  }
};
</script>
<style >
.disBlock{
    display: inline-block !important;
}
.disNone{
    display: none !important;
}
</style>
