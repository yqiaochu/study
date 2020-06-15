<template>
  <div class="datamap" >
      <ve-map width='340px' height='400px'  :data="mapchartData" :settings="mapchartSettings" :extend="mapchartExtend" :events="mapchartEvents"></ve-map>
  </div>
</template>
<script>
export default {
  data() {
        //地图
    this.mapchartSettings = {
        positionJsonLink: '../../static/henan.json',//引入地图json
        position: '河南',	
        selectedMode: 'single',	
        itemStyle: {
            normal: {
                borderColor: '#0978B6',
                borderWidth:1,
                color:'rgba(0,0,0,0)',//去除地图上的标签点
            },
            emphasis: {
                    areaColor: 'rgb(255,139,38)',
                    borderWidth: 0,
                    shadowBlur:10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    label:{
                        show: false,
                    }
                }
        },
        label: {//设置地图上文字的样式
            show: false,
            fontSize: 10,
            color: "rgb(196, 208, 214)",
            position: [-10, 0],
        },
        
        beforeRegisterMap (json) {
            return json
        }
    }
    this.mapchartEvents = {//点击事件
        mapselectchanged:(param)=> {
            console.log(param);
            var name=param.batch['0'].name;
            var selected = param.batch['0'].selected[name];
            console.log(selected);
            if(selected==true){
                this.cityName=name;
                this.nowDateLookUp();
            }else if(selected==false){
                this.cityName='';
                this.nowDateLookUp();
            }
        }
    }


    this.mapchartExtend = {
        tooltip: {
            formatter: function(params) { //自定义函数修改给数据加单位
                var str = '';//声明一个变量用来存储数据
                str += '<div>'+ params.name +'</div>';
                str += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'
                    +params.color+';"></span>'+ params.seriesName 
                    +'</span> : <span>'+ (params.value ? params.value+'户' : '暂无') +'</br>';
                return str;
            }
        },
        legend:{//是否展示图例
            show:false
        },
        visualMap: {//设置范围颜色
            type: 'continuous',
            inRange: {
                color: ['rgb(245,223,12)', 'rgb(128,237,97)', 'rgb(27,251,177)'],
                symbolSize: [30, 500]
            },
            // type: 'piecewise',
            // pieces: [
            //     {gt: 100 ,label: '>100', color: '#3164C9'}, 
            //     {gt: 50, lte: 100,label: '50 ~ 100', color: '#0e3E9D'}, 
            //     {gt: 0, lte: 50, label: '0 ~ 50', color: '#093284'},
            // ],
            itemWidth:10,
            itemHeight:50,
            // color: ['rgba(0,0,0,0)'] ,
            // borderColor:'rgb(196, 208, 214)',
            // borderWidth:1,
            bottom:0,
            textStyle:{
                color:'rgb(196, 208, 214)',
            },
        },
    
    }
    
    return{
        maploading:false,
        mapchartData: {
            columns: ['name', '签约用户'],
            rows: [
                { name: "郑州市",签约用户: 80},
                { name: "开封市",签约用户: 0 },
                { name: "洛阳市",签约用户: 0 },
                { name: "平顶山市",签约用户: 0 },
                { name: "安阳市",签约用户: 2 },
                { name: "鹤壁市",签约用户: 0 },
                { name: "新乡市",签约用户: 0 },
                { name: "焦作市",签约用户: 0 },
                { name: "濮阳市",签约用户: 0 },
                { name: "许昌市",签约用户: 0 },
                { name: "漯河市",签约用户: 500 },
                { name: "三门峡市",签约用户: 0 },
                { name: "南阳市",签约用户: 0 },
                { name: "商丘市",签约用户: 0 },
                { name: "信阳市",签约用户: 0 },
                { name: "周口市",签约用户: 0 },
                { name: "驻马店市",签约用户: 0 },
                { name: "济源市",签约用户: 0 },
                
            ]
        },
    }
  },
  methods: {


  },
  mounted() {
    
  }
};
</script>
<style scoped>

</style>
