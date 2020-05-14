<template>
  <div class="drag">
      drag
      <div class="drag_box" v-drag></div>

  </div>
</template>
<script>
export default {
    name:'drag',
  data() {
    return {
    };
  },
  //注册局部组件
  directives:{
      //注册一个局部的自定义指令 v-drag
      //参数 el为dom元素  binding为包含指令属性的对象  https://www.jianshu.com/p/0996ef25a012
      drag:function(el){
          let dragBox= el //获取当前元素
          dragBox.onmousedown = e=>{ //鼠标放上触发
            //开始计算鼠标处距离元素的位置
            console.log(e.clientY)
            console.log(dragBox.offsetTop)
            let disX =e.clientX -dragBox.offsetLeft  //距离可视页面左边距离- 指的是距离它自己左边的距离
            let disY =e.clientY -dragBox.offsetTop

            document.onmousemove =e=>{
                //用鼠标位置减去鼠标相对元素位置得到元素位置
                let left =e.clientX -disX
                let top =e.clientY -disY
                //设置元素位置
                dragBox.style.left = left +'px'
                dragBox.style.top = top +'px'
            }
            //鼠标松开后事件
            document.onmouseup =e =>{
                let disX =e.clientX -dragBox.offsetLeft  //距离可视页面左边距离- 指的是距离它自己左边的距离
                let disY =e.clientY -dragBox.offsetTop

                //鼠标弹起不在移动
                document.onmousemove= null;
                //预防鼠标放上去还会移动
                document.onmouseup =null
            }
          }
      }
  },
  methods: {

  },
  mounted(){
  },
  
};
</script>
<style >
.drag{
    width: 100%;
    height: 500px;
    background: #ccc;
}
.drag_box{
    width: 100px;
    height: 80px;
    background: yellow;
    position: relative;
    top: 100px;
    left: 100px;

    cursor: move;
    z-index: 9999;
}
</style>
