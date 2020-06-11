<template>
  <div class="amap" >
    <div style="  width: 100%;
            height: 100%;
            margin: 0;">
            <div id="container"></div>
            1111111111111111111111111
        <el-amap
            vid='amapDemo'
            :center='center'
            :zoom='zoom'
            class="amap-demo"
            ref="map"
        >

         <!-- zIndex: 12,
            adcode: [code],
            depth: dep,
            styles: {
                'fill': function (properties) {
                    // properties为可用于做样式映射的字段，包含
                    // NAME_CHN:中文名称
                    // adcode_pro
                    // adcode_cit
                    // adcode
                    var adcode = properties.adcode;
                    return getColorByAdcode(adcode);
                },
                'province-stroke': 'cornflowerblue',
                'city-stroke': 'white', // 中国地级市边界
                'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界 -->
            <el-amap-polygon strokeColor='#4ea8f8' strokeOpacity='0.8' fillColor='#c9ebf7' fillOpacity='0.5'
            v-for="(polygon,index) in polygons" :key="index" strokeWeight='1' :path='polygon.F.path'>
            </el-amap-polygon>
        </el-amap>
    </div>
  </div>
</template>
<script>
export default {
data() {
    return {
        zoom:7,
        center:[116.244694,39.517344],
        polygons:[],
        district:null,

    };
},
watch: {
},
methods: {
    drawBounds(){
        var that=this;
        //加载行政区划插件
        if(!that.district){
            // 实例化DistrictSearch
            var opts={
                subdistrict:0,//获取边界不需要返回下级行政区
                extensions:'all',
                level:'city'
            };
            that.district = new AMap.DistrictSearch(opts);

        //     that.district = new AMap.DistrictLayer.Province({
        //     zIndex: 12,
        //     adcode: [410000],
        //     depth: 2,
        //     styles: {
        //         'fill': function (properties) {
        //             // properties为可用于做样式映射的字段，包含
        //             // NAME_CHN:中文名称
        //             // adcode_pro
        //             // adcode_cit
        //             // adcode
        //             var adcode = properties.adcode;
        //             return getColorByAdcode(adcode);
        //         },
        //         'province-stroke': 'cornflowerblue',
        //         'city-stroke': 'white', // 中国地级市边界
        //         'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
        //     }
        // });
        }
        that.district.search()
    }
},
mounted() {
    setTimeout(()=>{
        this.drawBounds('110100',function(status,result){
            that.polygons =[]
            var bounds = result.districtList[0].boundaries;
            if(bounds){
                for(var i=0,l= bounds.length;i<l;i++){
                    var polygon =new AMap.Polygon({
                        strokeWeight:1,
                        path:bounds[i],
                        fillOpacity:0.4,
                        fillColor:'#80d8ff',
                        strokeColor:'#0091ea'

                    });
                    that.polygons.push(polygon);
                }
            }
            AMap.Polygon.bind(that.polygons)
            this.$refs.map.$amap.setFitView(that.polygons)
        })
    },500)
    
},
};
</script>
<style >
.amap-demo{
    height: 800px;
    width: 500px;
}
</style>