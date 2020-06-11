<template>
  <div class="energyMonitor-wrap" @click="searchStatus=false">
    <div class="float-btn" @click="goEnergyMonitorTable">
      <p>能耗监测</p>
    </div>
    <div class="left">
      <el-amap 
      v-loading="loading1" element-loading-background="rgba(0, 0, 0, 0.5)"
      class="amap-box" 
      vid="amapDemo"
      :events="events"
      :zoom="zoom" 
      :center="center" 
      :amap-manager="amapManager"
      ref="map"
      expandZoomRange="true"
      :plugin="plugin"
      :zoomEnable="true"
      :dragEnable="true"
      >

        <el-amap-marker
        :visible="areaScale == 'province'"
        v-for="marker in provinceMarkers" 
        :key="marker.position[0]"
        icon="./static/map-markers/energyMonitor/position.png"
        :events="marker.events"
        :position="marker.position"
        :offset="[-30,-50]"
        ></el-amap-marker>

        <el-amap-info-window
        v-if="showProvinceWindow.visible"
        :position="showProvinceWindow.position" 
        :visible="showProvinceWindow.visible"
        :offset="[-10,0]"
        :content="showProvinceWindow.content">
        </el-amap-info-window>

        <el-amap-marker
        :visible="areaScale == 'city'"
        v-for="marker in cityMarkers" 
        :key="marker.position[0]"
        icon="./static/map-markers/position.png"
        :position="marker.position"
        :offset="[-10,-30]"
        :events="marker.events"
        ></el-amap-marker>
        

        <el-amap-info-window
        v-if="showCityWindow.visible"
        :position="showCityWindow.position" 
        :visible="showCityWindow.visible"
        :offset="[-10,0]"
        :content="showCityWindow.content">
        </el-amap-info-window>

        <el-amap-marker
        :visible="areaScale == 'county'"
        v-for="marker in countyMarkers" 
        :key="marker.position[0]"
        :template="getCountyMarkerContent(marker)"
        :position="marker.position"

        :events="marker.events"
        ></el-amap-marker>

        <el-amap-info-window
        v-if="showWindow.visible"
        :position="showWindow.position" 
        :visible="showWindow.visible"
        :offset="[0,0]"
        :content="showWindow.content">
        </el-amap-info-window>
      </el-amap>
    </div>
  </div>
</template>
<script>
const exampleComponents = {
  props: ['text'],
  template: `<div>{{text}}</div>`
}
import Vue from "vue";
// import options from "@/utils/henanprovince.js";

import {AMapManager,lazyAMapApiLoaderInstance} from "vue-amap"
let amapManager = new AMapManager();

import VueAMap from "vue-amap";
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  // 高德的key
  key: "527f771ec9dec681f7d6e2ca9949adab",
  // 插件集合
  plugin: [
    "AMap.Geocoder",
    "AMap.Geolocation",
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.DistrictSearch",
  ],
  v: "1.4.4",
  uiVersion: '1.0'
});

export default {
  name: "energyMonitor",
  watch: {
  },
  data() {
    let self = this;
    return {
      dataStatus:false,
      pageSize:10,
      pageNum:0,
      regionCodes:[],
      industryCodes:[],
      industryData:[],
      classCodeData:[],
      typeCodeData:[],
      enterpriseData:[],
      unitRadio:1,
      scopesData:[
          {name:'全厂',code:'1'},
          {name:'生产工序',code:'2'}
      ],
      queryform:{
        unit:1,
      },
      searchForm:{},
      toggleCountData:[
        {
          codeName:'全部',
          codeValue:'',
          status:true,
        },
        {
          codeName:'正常',
          codeValue:0,
          status:false,
        },
        {
          codeName:'异常',
          codeValue:1,
          status:false,
        },
      ],
      toggleUnitData:[
        {
          codeName:'万吨标准煤',
          codeValue:1,
          status:true,
        },
        {
          codeName:'吨标准煤',
          codeValue:2,
          status:false,
        },
      ],
      Visible:false,
      searchStatus:false,
      dialoading:false,
      diatableData:[],
      currentPage:0,
      diapageTotal:0,
      regionCodeinfo:'',
      loading1: true,
      loading2: true,
      loading3: true,
      lastDay:'',
      contentRender: (h, instance) => h(exampleComponents,{style: {}, props: {text: '50'}}, ['xxxxxxx']),
      handlerValue:true,
      options:[],
      optionValue:"",
      optionsData:[],
      amapManager,
      areaScale:'province',
      setZoomSize:5,
      zoom: 7,
      center: [113.85233, 34.03570],
      markers: [],
      showProvinceWindow:{
        position:[],
        visible:false,
        content:``
      },
      showCityWindow:{
        position:[],
        visible:false,
        content:``
      },
      showWindow:{
        position:[],
        visible:false,
        content:``
      },
      district: null,
      polygons: [],
      plugin: [
        // {
        //   pName: "ToolBar", //工具条插件
        //   position: "RB",
        //   liteStyle: true
        // },
        // {
        //   pName: "Geolocation",//获得当前定位
        //   events: {
        //     init(o) {
        //       // o 是高德地图定位插件实例
        //       o.getCurrentPosition((status, result) => {
        //         // if (result && result.position) {
        //         //   self.lng = result.position.lng;
        //         //   self.lat = result.position.lat;
        //         //   self.center = [self.lng, self.lat];
        //         //   self.loaded = true;
        //         //   self.$nextTick();
        //         // }
        //       });
        //       o.getCurrentPosition();
        //     }
        //   }
        // }
      ],
      events:{
        init (o) {
          // o.setMapStyle('darkblue')
          amapManager._map.setMapStyle('amap://styles/darkblue')
          o.getCity(result => {
          })
          lazyAMapApiLoaderInstance.load().then(() => {
          })
          // mapStyle:'amap://styles/a92c23c68ca519ec235825c3be99462b'
          // AMapUI.loadUI(['overlay/SimpleMarker'],function(SimpleMarker){
          //   const marker=new SimpleMarker({
          //     iconLabel: {
          //     innerHTML: '<i style="color:red;">河南片区</i>', //设置文字内容
          //     style: {
          //       color: '#fff',
          //       width:'100px'
          //     }
          //     },
          //     iconStyle: 'green',
          //     map: o,
          //     position: o.getCenter()
          //   })
          // })
        },
        zoomend: (e) => {
          self.showWindow.visible = false
          self.showProvinceWindow.visible = false
          self.showCityWindow.visible = false
　　　　　　//获取当前缩放zoom值
          let nowZoom = amapManager._map.getZoom()
          // let nowZoom1 = self.$refs.map.$$getInstance().getZoom()
          if(nowZoom < 12 && 9 < nowZoom){
            self.areaScale = 'county'
            // amapManager._map.setZoom(10);
            // self.countyMarkers = []
            // self.drawBounds();
          }
          if(nowZoom < 9){
            self.countyMarkers = []
            self.areaScale = 'province'
            self.optionValue = this.options[0].value,
            self.zoom = 7
            amapManager._map.setZoom(7);
            self.center = [113.85233, 34.03570]
            // self.getRegionEnterpriseInfo()
            self.getIndustryStructureData()
            self.getEnterpriseReportedInfo()

            // amapManager._map.remove(self.polygons)
            // self.polygons = [];
          }

        },
        click: e => {

          // amapManager._map.setZoom(9);
          // self.center = [e.lnglat.lng,e.lnglat.lat]

        }
      },
      provinceMarkers:[],
      cityMarkers:[],
      countyMarkers:[],
      chartRingDataTwo: {
        columns: ["类别", "家"],
        rows: []
      },
      chartRingData: {
        columns: ["industryName", "enterpriseCount"],
        rows: [
          {color: "#2891fc" },
          {color: "#fcc93c" },
          {color: "#38dc88" },
          {color: "#fd8888" },
          {color: "#ed85fd" },
          {color: "#7695fc" },
          {color: "#42e0f9" },
        ]
      },
    };
  },
  methods: {
    toggleUnit(val){
      var radio;
       this.toggleUnitData.forEach((e)=>{
        e.status=false;
        if(e.codeName==val.codeName){
          e.status=true;
          radio=e.codeValue
        }
      })
      if(radio==''){
        this.queryform.unit=null;
      }else{
        this.queryform.unit = radio;
      }
      // this.searchform();
      if(this.queryform.date&&this.queryform.date.length>0){
              this.queryform.beginTime=this.queryform.date[0];
              this.queryform.endTime=this.queryform.date[1];
          }
          if(!this.queryform.comprehensiveConsumptionMinf){
              this.queryform.comprehensiveConsumptionMin=null;
          }else{
              this.queryform.comprehensiveConsumptionMin=Number(this.queryform.comprehensiveConsumptionMinf)
          }
          if(!this.queryform.comprehensiveConsumptionMaxf){
              this.queryform.comprehensiveConsumptionMax=null;
          }else{
              this.queryform.comprehensiveConsumptionMax=Number(this.queryform.comprehensiveConsumptionMaxf)
          }
          if(!this.queryform.physicalConsumptionDiscountMaxf){
              this.queryform.physicalConsumptionDiscountMax=null;
          }else{
              this.queryform.physicalConsumptionDiscountMax=Number(this.queryform.physicalConsumptionDiscountMaxf)
          }
          if(!this.queryform.physicalConsumptionDiscountMinf){
              this.queryform.physicalConsumptionDiscountMin=null;
          }else{
              this.queryform.physicalConsumptionDiscountMin=Number(this.queryform.physicalConsumptionDiscountMinf)
          }
          if(!this.queryform.physicalConsumptionMaxf){
              this.queryform.physicalConsumptionMax=null;
          }else{
              this.queryform.physicalConsumptionMax=Number(this.queryform.physicalConsumptionMaxf)
          }
          if(!this.queryform.physicalConsumptionMinf){
              this.queryform.physicalConsumptionMin=null;
          }else{
              this.queryform.physicalConsumptionMin=Number(this.queryform.physicalConsumptionMinf)
          }
          this.search(this.queryform)
    },
    toggleCount(val){
      var radio;
      this.toggleCountData.forEach((e)=>{
        e.status=false;
        if(e.codeName==val.codeName){
          e.status=true;
          radio=e.codeValue;
        }
      })
      debugger
      if(radio==''){
        this.queryform.dataQuality=null;
      }else{
        this.queryform.dataQuality =radio;
      }
      this.searchform();
    },
    handleCurrentChange(val) {
        //  this.loading = true;
          // this.pageSize = val;
          this.pageNum = val;
          this.queryform.pageSize = this.pageSize;
          this.queryform.pageNum = this.pageNum;
          this.search(this.queryform)
    },
    reset(){
        this.optionsData=this.options;
    },
    iptChange(val){
        console.log(val)
        this.optionsData=this.options;
        const PinyinMatch = require('pinyin-match');
        if(val){
        var result=[];
        this.optionsData.forEach((e)=>{
            var m=PinyinMatch.match(e.label,val);
            if(m){
            result.push(e);
            }
        })
        this.optionsData=result;
        }else{
        this.optionsData=this.options;
        }
        console.log( this.optionsData);
    },
    dateChange() {
      this.getEnterpriseReportedInfo()
    },
    reChange(val){
      if(this.queryform.enterpriseCodes&&this.queryform.enterpriseCodes.length>0){
          this.queryform.enterpriseCodes=[];
      }
      console.log(val);
      console.log(this.regionCodes);
      this.queryform.regionCodes=this.regionCodes;
      this.getEnterprise();

    },
    cascaderChange(){
      this.loading2 = true
      let self = this
    //   this.handlerValue = !this.handlerValue
      if(this.optionValue== this.options[0].value){
        this.areaScale = 'province'
        this.center = [113.85233, 34.03570]
        amapManager._map.setZoom(7);
        this.getRegionEnterpriseInfo()
        this.getIndustryStructureData()
        this.getEnterpriseReportedInfo()
      }else{
        this.areaScale = 'city'
        let result = {}
        this.options.forEach((e)=>{
            if(e.value== this.optionValue){
                result=e
            }
        })
        // let result = this.options.filter((i,j)=>{
        //   return i.value == this.optionValue
        // })
        console.log('result==================='+JSON.stringify(result) )
        let i = {
          position: [result.longitude,result.latitude],
          regionCode: result.value,
        }
        this.getDistrictEnterpriseInfo(i)
        this.getIndustryStructureData()
        this.getEnterpriseReportedInfo()
      }
      this.getIndustryStructureData()
    },
    goEnergyMonitorTable(){
      this.$router.push({
        path:'/energyMonitorTable'
      })
    },
    getProvinceMarkerContent(marker){
      const content = `
      <div
      style="
        // width:${(marker.regionEenergyEnterprise/1.06)+18}px;
        // height:${(marker.regionEenergyEnterprise/1.06)+18}px;
        width:40px;
        height:40px;
        background-image:url(../../static/map-markers/position.svg);
        background-repeat:no-repeat;
        background-size:100% 100%;
      "
      ></div>
      `
      return content
    },
    getCityMarkerContent(marker){
      const content = `
      <div
      style="
        width:30px;
        height:30px;
        background-image:url(../../static/map-markers/position.svg);
        background-repeat:no-repeat;
        background-size:100% 100%;
      "
      ></div>
      `
      return content
    },
    getCountyMarkerContent(marker){
      let bgUrl = ''
      switch(marker.industryName){
        case '钢铁':
        bgUrl = './static/map-markers/energyMonitor/gangtie.png'
        break;
        case '有色':
        bgUrl = './static/map-markers/energyMonitor/youse.png'
        break;
        case '石油':
        bgUrl = './static/map-markers/energyMonitor/shiyou.png'
        break;
        case '化工':
        bgUrl = './static/map-markers/energyMonitor/huagong.png'
        break;
        case '建材':
        bgUrl = './static/map-markers/energyMonitor/jiancai.png'
        break;
        case '电力':
        bgUrl = './static/map-markers/energyMonitor/dianli.png'
        break;
        case '其他':
        bgUrl = './static/map-markers/energyMonitor/qita.png'
        break;
      }
      let content = `
      <div
      style="
        width:.5rem;
        height:.5rem;
        display:flex;
        align-items:center;
        text-align:center;
        background:url(${bgUrl}) no-repeat;
      "
      ></div>
      `
      return content
    },
    searchform() {
      if((this.queryform.energyClassCodes&&this.queryform.energyClassCodes.length>0)||(this.queryform.energyTypeCodes&&this.queryform.energyTypeCodes.length>0)){
          this.dataStatus=true;
      }else{
          this.dataStatus=false;
      }
      this.searchStatus=false;
      if(this.queryform.date&&this.queryform.date.length>0){
          this.searchStatus=false;
          console.log(this.searchStatus);
          this.dialoading = true;
          this.pageSize=10;
          this.pageNum=1;
          this.queryform.pageSize=10;
          this.queryform.pageNum= this.pageNum;
          // if(this.radio==''){
          //     this.queryform.dataQuality=null;
          // }else{
          //     this.queryform.dataQuality = Number(this.radio);
          // }
          // if(this.unitRadio==''){
          //     this.queryform.unit=null;
          // }else{
          //     this.queryform.unit = Number(this.unitRadio);
          // }
          if(this.queryform.date&&this.queryform.date.length>0){
              this.queryform.beginTime=this.queryform.date[0];
              this.queryform.endTime=this.queryform.date[1];
          }
          if(!this.queryform.comprehensiveConsumptionMinf){
              this.queryform.comprehensiveConsumptionMin=null;
          }else{
              this.queryform.comprehensiveConsumptionMin=Number(this.queryform.comprehensiveConsumptionMinf)
          }
          if(!this.queryform.comprehensiveConsumptionMaxf){
              this.queryform.comprehensiveConsumptionMax=null;
          }else{
              this.queryform.comprehensiveConsumptionMax=Number(this.queryform.comprehensiveConsumptionMaxf)
          }
          if(!this.queryform.physicalConsumptionDiscountMaxf){
              this.queryform.physicalConsumptionDiscountMax=null;
          }else{
              this.queryform.physicalConsumptionDiscountMax=Number(this.queryform.physicalConsumptionDiscountMaxf)
          }
          if(!this.queryform.physicalConsumptionDiscountMinf){
              this.queryform.physicalConsumptionDiscountMin=null;
          }else{
              this.queryform.physicalConsumptionDiscountMin=Number(this.queryform.physicalConsumptionDiscountMinf)
          }
          if(!this.queryform.physicalConsumptionMaxf){
              this.queryform.physicalConsumptionMax=null;
          }else{
              this.queryform.physicalConsumptionMax=Number(this.queryform.physicalConsumptionMaxf)
          }
          if(!this.queryform.physicalConsumptionMinf){
              this.queryform.physicalConsumptionMin=null;
          }else{
              this.queryform.physicalConsumptionMin=Number(this.queryform.physicalConsumptionMinf)
          }
          this.search(this.queryform)
        }else{
          this.$message.warning('请选择时间范围')
        }    
    },
    search(form) {
      this.searchStatus=false;
      this.dialoading=true
      this.axios.post('/api/government/comprehensiveReport/comprehensiveReport', this.queryform).then((res) => {

          console.log( res.data.data)
          this.loading=false
          if (res.data.code == 200) {
              this.diatableData = res.data.data.list
              this.diapageTotal = res.data.data.total;
              this.dialoading = false;
          }else{
            this.$message.error(res.data.message);
            this.dialoading = false;
          }
      }).catch((err) => {
          this.dialoading=false
          console.log('err', err)
      })
    },
    drawBounds(){
        //加载行政区划插件
        var opts = {
          subdistrict: 0,   //获取边界不需要返回下级行政区
          extensions: 'all',  //返回行政区边界坐标组等具体信息
          level: 'province'  //查询行政级别为 市
        };
        this.district = new AMap.DistrictSearch(opts);
        let map = amapManager._map
        // map.setZoom(14);
        
        //行政区查询
        this.district.setLevel('province')
        this.district.search('河南省', (status, result) => {
            map.remove(this.polygons)//清除上次结果
            this.polygons = [];
            var bounds = result.districtList[0].boundaries;
            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                //生成行政区划polygon
                var polygon = new AMap.Polygon({
                    strokeWeight: 1.4,
                    path: bounds[i],
                    fillOpacity: 0.1,
                    fillColor: '#80d8ff',
                    strokeColor: '#0091ea',
                    // strokeStyle: "dashed"
                });
                this.polygons.push(polygon);
              }
            }
            // polygon.setPath(pathArray)
            map.add(this.polygons)
            // map.setFitView(this.polygons);//视口自适应
        });
    },
    // 根据地址查找经纬度然后定位
    getLongitude(params) {
      
      let self = this;
      let map = amapManager.getMap();
      AMap.plugin('AMap.Geocoder', function() {
        var geocoder = new AMap.Geocoder({city:params})
        geocoder.getLocation('人民政府', function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // self.zoom = 10;
            // map.setZoom(self.setZoomSize);
            if(self.areaScale = 'city'){
              map.setZoom(9);
            }else if(self.areaScale = 'county'){
              map.setZoom(12);
            }
            self.center = [result.geocodes[0].location.lng, result.geocodes[0].location.lat];

          }
        })
      })
    },
    lockMapBounds() {
      let map = amapManager._map
      var bounds = map.getBounds();
      map.setLimitBounds(bounds);
      // logMapInfo();
    },
    showInfoClick(){
      
      let map = amapManager._map
      map.remove(this.polygons)//清除上次结果
      this.polygons = [];
    },

    downloadFile(){
      // 导出上报企业情况
      let resultRegionCode = this.optionValue
    //   .length>1?this.optionValue[1]:this.optionValue[0]
      this.axios.get('/api/government/energyMonitor/download/uploaded/'+this.lastDay+'/'+resultRegionCode).then((res)=>{
      }).catch()
    },
    getEnterpriseReportedInfo(regionCode){
      this.loading3=true;
      let resultRegionCode = ''
      if(regionCode){
        resultRegionCode = regionCode
      }else{
        resultRegionCode = this.optionValue
        // .length>1?this.optionValue[1]:this.optionValue[0]
      }
      console.log(this.optionValue)
      this.regionCodeinfo=resultRegionCode
      this.axios.post('/api/government/energyMonitor/getEnterpriseReportedInfo/'+this.lastDay+'/'+this.regionCodeinfo).then((res)=>{
        let i = res.data.data
        this.chartRingDataTwo = {
          columns: ["类别", "家"],
          rows: [
            { 类别: "已上报企业数", 家: i.alreadyReportedCount, 比重: i.alreadyReportedCountRate, color: "#52e198" },
            { 类别: "未上报企业数", 家: i.notReportedCount, 比重: i.notReportedCountRate, color: "#fabc4d" },
          ]
        }
        this.chartRingExtendTwo.graphic.children[0].style.text = i.totalCount
        this.loading3 = false
      }).catch()
    },
    getIndustryStructureData(regionCode){
      this.loading2 = true
      let resultRegionCode = ''
      if(regionCode){
        resultRegionCode = regionCode
      }else{
        resultRegionCode = this.optionValue
        // .length>1?this.optionValue[1]:this.optionValue[0]
      }
      this.axios.post('/api/government/energyMonitor/getIndustryStructureData/'+resultRegionCode).then((res)=>{
        let color = ["#2891fc","#fcc93c","#38dc88","#fd8888","#ed85fd","#7695fc","#42e0f9"];
        let totalCount = 0
        res.data.data.map((i,j)=>{
          i.color = color[j]
          totalCount += i.industryEnterpriseCount
        })
        this.chartRingData = {
          columns: [ "industryName", "industryEnterpriseCount" ],
          rows: res.data.data
        }
      this.chartRingExtend.graphic.children[0].style.text = totalCount
      this.loading2 = false
      }).catch()
    },
    getDistrictEnterpriseInfo(x){
      this.areaScale = 'county'
      let self = this;
      amapManager._map.setZoom(10);
      this.center = x.position
      this.optionValue = x.regionCode,
      this.showWindow.visible = false
      this.axios.post('/api/government/energyMonitor/getDistrictEnterpriseInfo',{regionCode:x.regionCode}).then((response)=>{
        response.data.data.map((a,b)=>{
          a.position = [a.longitude,a.latitude]
          switch(a.industryName){
            case '钢铁':
              a.bgUrlm = './static/map-markers/energyMonitor/gangtie-mini.svg'
              break;
            case '有色':
              a.bgUrlm = './static/map-markers/energyMonitor/youse-mini.svg'
              break;
            case '石油':
              a.bgUrlm = './static/map-markers/energyMonitor/shiyou-mini.svg'
              break;
            case '化工':
              a.bgUrlm = './static/map-markers/energyMonitor/huagong-mini.svg'
              break;
            case '建材':
              a.bgUrlm = './static/map-markers/energyMonitor/jiancai-mini.svg'
              break;
            case '电力':
              a.bgUrlm = './static/map-markers/energyMonitor/dianli-mini.svg'
              break;
            case '其他':
              a.bgUrlm = './static/map-markers/energyMonitor/qita-mini.svg'
              break;
          }
          console.log(a)
          // var that=this;
          a.events = {
            click(){
              console.log(a);
              self.Visible=true;
              self.initData(a);
            },
            mouseover() {
              self.showWindow = {
                position:a.position,
                visible:true,
                // content:`
                // <div style="color:#fff;background:#343d5d;border:none;">
                //   <p style="font-size:14px;">${a.enterpriseName}</p>
                //   <p style="color:#ccc">${a.enterpriseSize}</p>
                // </div>`
                //若需要图标则打开下面的语句复制到企业名称前
                // 
                content:`
                <div style="color:#a5a5be;background:#343d5d;border:none;padding:5px;">
                  <p style=" padding-bottom:10px"><span><img width="24px" src="${a.bgUrlm}" alt="" style="vertical-align:middle;margin-right:10px"><span style="font-weight: 500;font-size:14px;color:white;">${a.enterpriseName}</span></span></p>
                  <p ><span style="color:#8979FF;">行业:<span style="color:white;padding-left:10px">${a.industryName}</span></span></p>
                  <p style="padding-top:5px"><span style="color:#8979FF;">地址:<span style="color:white;padding-left:10px">${a.enterpriseSize}</span></span></p>
                </div>`
              }
            },
            mouseout() {
              self.showWindow.visible = false
            }
          }
        })

        this.countyMarkers = response.data.data
      }).catch()
    },
    getCityDistrictInfo(i){

      let self = this;
      amapManager._map.setZoom(9);
      this.center = i.position
      this.optionValue = i.regionCode,
      this.showWindow.visible = false
      this.axios.post('/api/government/energyMonitor/getCityDistrictInfo',{regionCode:i.regionCode}).then((response)=>{
        response.data.data.map((x,y)=>{
          x.position = [x.longitude,x.latitude]
          x.events = {
            click(){
              return self.getDistrictEnterpriseInfo(x)
            },
            mouseover() {
              self.showCityWindow = {
                position:x.position,
                visible:true,
                content:`
                <div style="color:#fff;background:#343d5d;border:none;border-radius:4px;">
                  <p style="font-size:14px;">${x.regionName}共有企业：${x.energyEnterpriseInfo.length}个</p>
                </div>`
              }
            },
            mouseout() {
              self.showCityWindow.visible = false
            }
          }
        })

        this.cityMarkers = response.data.data

      }).catch()
    },
    getRegionEnterpriseInfo(){
      //查询区域下的企业信息
      let self = this;
      let regionCode = this.optionValue
    //   .length>1?this.optionValue[1]:this.optionValue[0]
      this.axios.post('/api/government/energyMonitor/getRegionEnterpriseInfo',{regionCode}).then((res)=>{
        res.data.data.map((i,j)=>{
          i.position = [i.longitude,i.latitude]
          i.events = {
            click(){
              self.getIndustryStructureData(i.regionCode)
              self.getDistrictEnterpriseInfo(i)
              self.getEnterpriseReportedInfo(i.regionCode)
            },
            mouseover() {
              self.showProvinceWindow = {
                position:i.position,
                visible:true,
                content:`
                <div style="color:#fff;background:#343d5d;border:none;border-radius:4px;">
                  <p style="font-size:14px;">${i.regionName}共有企业：${i.energyEnterpriseInfo.length}个</p>
                </div>`
              }
            },
            mouseout() {
              self.showProvinceWindow.visible = false
            }
          }
        })
        this.provinceMarkers = res.data.data
        this.loading1 = false
      }).catch()
    },

    toPageDataDetailMonitor(){
        this.$router.push({
            path:'/dataDetailMonitor',
            query: {
                enterpriseCode: '',
                date:this.lastDay ,
            }
        })
    },
    initData(val){
      console.log('弹框数据初始化');
      console.log(val);
      var name=val.enterpriseName;
      var code='';
      this.enterpriseData.forEach((e)=>{
        // debugger
        if(e.name==name){
          code=e.code;
          console.log(e.fieldCode)
        }
      })
      this.$set(this.queryform,'enterpriseCodes',code);
      this.queryform.enterpriseCodes=[code];
      console.log(this.queryform.enterpriseCodes)
      this.searchform();
      // var industryCode=val.industryCode
    },
    // 行业信息
        getIndustry(){
            this.axios.post('/api/government/comprehensiveReport/findIndustry').then((res) => {
                console.log('***********行业信息**********')
                console.log( res.data.data)
                if (res.data.code == 200) {
                    this.industryData= res.data.data;
                }else{
                    this.$message.error(res.data.message);
                }
            }).catch((err) => {
                console.log('err', err)
            })
        },
        inChange(val){
            if(this.queryform.enterpriseCodes&&this.queryform.enterpriseCodes.length>0){
                this.queryform.enterpriseCodes=[];
            }
            this.queryform.industryCodes=[];
            console.log(val);
            console.log(this.industryCodes);
            this.industryCodes.forEach((e)=>{
                if(e.length>1){
                    this.queryform.industryCodes.push(e[e.length-1]);
                }else{
                    this.queryform.industryCodes.push(e[0]);
                }
            })
            console.log(this.queryform.industryCodes)
            this.getEnterprise();
        },
        // 企业信息
        getEnterprise(){
            var params={
                industryCodes:this.queryform.industryCodes,
                regionCodes:this.queryform.regionCodes,
            }
            this.axios.post('/api/government/comprehensiveReport/findEnterprise', params).then((res) => {
                console.log('***********企业信息**********')
                console.log( res.data.data)
                if (res.data.code == 200) {
                    this.enterpriseData= res.data.data;
                }else{
                    this.$message.error(res.data.message);
                }
            }).catch((err) => {
                console.log('err', err)
            })
        },
        // 能源分类
        getEnergyClassCode(){
            this.axios.post('/api/government/comprehensiveReport/findEnergyClassCode').then((res) => {
                console.log('***********能源分类**********')
                console.log( res.data.data)
                if (res.data.code == 200) {
                    this.classCodeData= res.data.data;
                }else{
                    this.$message.error(res.data.message);
                }
            }).catch((err) => {
                console.log('err', err)
            })
        },
        classChange(val){
            if(this.queryform.energyTypeCodes&&this.queryform.energyTypeCodes.length>0){
               this.queryform.energyTypeCodes=[]; 
            }
            console.log(val);
            console.log(this.queryform.energyClassCodes);
            this.getEnergyTypeCode();
        },
         // 能源分项
        getEnergyTypeCode(){
            var energyClassCodes=[]
            if(this.queryform.energyClassCodes&&this.queryform.energyClassCodes.length>0){
                energyClassCodes=this.queryform.energyClassCodes
            }else{energyClassCodes=[]}
            var params={
                "classifyCodes":energyClassCodes
            }
            this.axios.post('/api/government/comprehensiveReport/findEnergyTypeCode',params).then((res) => {
                console.log('***********能源分项**********')
                console.log( res.data.data)
                if (res.data.code == 200) {
                    this.typeCodeData= res.data.data;
                }else{
                    this.$message.error(res.data.message);
                }
            }).catch((err) => {
                console.log('err', err)
            })
        },
        getMonth(){
            let date = new Date();
            let yy = date.getFullYear();
            let mm = date.getMonth() + 1;
            let dd = new Date(yy,mm,0).getDate();
            if(Number(mm)<10){
                mm='0'+mm;
            }
            var startDate=yy+'-'+'01-01';
            var endDate=yy+'-'+mm+'-'+dd;
            console.log(startDate);
            console.log(endDate);
            this.$set(this.queryform,'date',[startDate,endDate])
            // this.queryform.date=[startDate,endDate];
            this.queryform.beginTime=startDate;
            this.queryform.endTime=endDate;
        },
  },
  created(){
    this.lastDay = this.$store.getters.lastDay
    this.$store.getters.areaSelectOptions.then((val)=>{
        this.options = val
        this.optionsData = val
        this.optionValue= this.options[0].value
    }).then(()=>{
        this.getRegionEnterpriseInfo()
        this.getIndustryStructureData()
        this.getEnterpriseReportedInfo()
    })
  },
  mounted() {
    this.$emit('showWholeView',false)
    this.getMonth()
    this.getEnergyClassCode();
    this.getEnergyTypeCode();
    this.getIndustry();
    this.getEnterprise();
    lazyAMapApiLoaderInstance.load().then(() => {
      this.drawBounds();
    });
    
  }
};
</script>
<style scoped>
.energyMonitor-wrap {
  width: 100%;
  height: 500px;
  min-height: 100%;
  background: #1d273b;
  font-size: 0.12rem;
  color: #fff;
  padding: 0.2rem;
  display: flex;
  position: relative;
  overflow-x: hidden;
}
.float-btn{
  position: absolute;
  top:.1rem;
  right:-.08rem;
  border-radius:.2rem;
  background: #7695fc;
  padding:.04rem .14rem;
  z-index: 1;
  cursor: pointer;
}
.left{
  flex:65%;
  border:1px solid #545a70;
  margin-right:.1rem;
  background:#262e46;
  position: relative;
}
.icon-svg{

  position: absolute;
  bottom:.1rem;
  left:.1rem;
  background: #404b70;
  align-items: center;
  display: flex;
  flex-flow: wrap;
  width:1.8rem;
  padding:.04rem 0;
}
.icon-svg p{
  display: flex;
  justify-content: center;
  align-items: center;
  width:33.3%;
  margin:.04rem 0;
}
.icon-svg p span{
  margin-left: .06rem;
}
.right{
  flex:35%;
  display: flex;
  flex-flow: column;
}
.right-top{
  background:#262e46;
  flex:1;
  margin-bottom: .1rem;
  padding:.16rem;
  padding-top:.1rem;
  display: flex;
  flex-flow: column;
}
.middle-left{
  display: flex;
  align-items: center;
  flex:1;
}
.middle-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.light-bg-input >>> .el-input__inner{
  background-color:#3b435d !important;
  border:none;
  color:#fff;
  height: .3rem;
  line-height: .3rem;
}
.light-bg-input >>> .el-input__inner:hover{
  background-color:#3b435d !important;
  border:none;
  color:#fff;
}
#light-bg-input >>> .el-date-editor.el-input, #light-bg-input >>> .el-date-editor.el-input__inner {
  width: 160px;
}
.middle-intro {
  flex:1;
}
.middle-intro-padding{
  padding-left:0.2rem;
  padding-right:0.1rem;
}
.middle-intro-one {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.1rem;
}
.middle-intro-one-left-title-minicircle {
  display: inline-block;
  /* vertical-align: middle; */
  width: 0.08rem;
  height: 0.08rem;
  border-radius: 0.04rem;
  margin-right: 0.04rem;
}
.middle-intro-one-left-title{
  color:#818aa6;
}
.middle-intro-one-right {
  color: #818aa6;
}
.strong-font {
  font-size: 0.14rem;
  font-weight: bold;
  color: white;
}
.right-bottom{
  background:#262e46;
  flex:1;
  padding:.16rem .1rem;
  display: flex;
  flex-flow: column;
}
.right-bottom-content{
  display: flex;
  flex-flow: column;
  align-items: center;
  flex:1;
  margin-top:.1rem;
}
.right-bottom-intro{
  width:100%;
  display: flex;
  padding:.1rem .4rem;
}
.right-bottom-intro-one{
  flex:1;
}
.right-bottom-intro-one:first-child{
  border-right:1px solid white;
  text-align: left;
}
.right-bottom-intro-one:last-child{
  text-align: right;
}
.right-bottom-intro-one-left-title{
  color:#818aa6;
}
.left >>> .amap-info-content{
  background:#343d5d;
}
.left >>> .amap-info-outer, .left >>> .amap-menu-outer{
  background:#343d5d;
  border:none;
}
.left >>> .amap-info-close{
  display: none;
}
.left >>> .amap-info-sharp{
  background-image:none;
}
.contents-analyse-info-content {
  font-size: 0.12rem;
  margin-top:.1rem;
}
.contents-analyse-info-content >>> .el-table__body{
  padding-bottom: 0;
}
.contents-analyse-info-content >>>.el-table td, .contents-analyse-info-content >>>.el-table th.is-leaf{
  border-bottom: none;
}
.contents-analyse-info-content >>>thead .el-table td, .contents-analyse-info-content >>>.el-table th.is-leaf{
  border-right: none;
}
.contents-analyse-info-content >>>thead .el-table td:first-child, .contents-analyse-info-content >>>.el-table th.is-leaf:first-child{
  text-align: center;
}
.contents-analyse-info-content >>> .el-table {
  font-size: 0.12rem;
  border-collapse: collapse;
}
.contents-analyse-info-content >>> thead .el-table td,
.el-table th.is-leaf {
  border: none;
}
.contents-analyse-info-content >>> .el-table td,
.el-table th.is-leaf {
  background: #262e46;
  color: #a2aaca;
  border: none;
}
.contents-analyse-info-content >>> .el-table th,
.el-table tr {
  background: #373e54;
}
.contents-analyse-info-content
  >>> .el-table--enable-row-hover
  .el-table__body
  tr {
  background:#373e54;
}
.contents-analyse-info-content
  >>> .el-table--enable-row-hover
  .el-table__body
  tr:hover {
  border: 2px solid white;
  background:#3b4766;
}
.contents-analyse-info-content
  >>> .el-table--enable-row-hover
  .el-table__body
  tr:hover td{
  color:white;
}
.contents-analyse-info-content
  >>> .el-table--striped
  .el-table__body
  tr.el-table__row--striped
  td {
  background: none;
  color: #a2aaca;
}
.contents-analyse-info-content
  >>> .el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td {
  color:white;
  background: none;
}

.contents-analyse-info-content >>> .el-table::before {
  z-index: inherit;
}
.contents-analyse-info-content >>> .el-checkbox__inner {
  background-color: #242548;
  border: 1px solid #393a64;
}
.contents-analyse-info-content >>> .el-table__empty-block {
  background: #242548;
}
.contents-analyse-info-content >>> .el-table__empty-text {
  background: #242548;
  color: #9da0ab;
}
.rank-p{
  text-align:center
}
.contents-analyse-info-content >>> .el-table__row:first-child .rank-p{
  color:red;
}
.contents-analyse-info-content >>> .el-table__row:nth-child(2) .rank-p{
  color:#fc8a36;
}
.contents-analyse-info-content >>> .el-table__row:nth-child(3) .rank-p{
  color:#bb9a3c;
}
.contents-analyse-info-content-table >>> .el-table td, .contents-analyse-info-content-table >>>.el-table th{
  padding: 0;
}
.text-right{
  text-align: right;
}
.energyMonitor-wrap >>>.el-dialog__header{
  background:#262f45 !important;
  border-bottom:1px solid rgba(255,255,255,0.1);
}
.energyMonitor-wrap >>>.el-dialog__body{
  background:#262f45 !important;
  padding: 10px 20px;
}
.energyMonitor-wrap >>>.el-dialog__body .page-class{
  text-align:right
}
.energyMonitor-wrap >>>.el-dialog__body .btn-prev, .el-pager,.btn-next{
  background:rgba(0,0,0,0) !important;
}
.energyMonitor-wrap >>>.el-dialog__body  .el-pager .number{
  background:rgba(0,0,0,0) !important;
}
.energyMonitor-wrap >>>.el-dialog__body .btn-next{
  background:rgba(0,0,0,0) !important;
}
.energyMonitor-wrap >>> .el-range-input{
  background: #262f45 !important;
  color: #fff !important;
}
.energyMonitor-wrap >>> .el-date-editor .el-range__icon{
  line-height: 24px !important;
}
/* .energyMonitor-wrap >>> .el-date-editor .el-range-separator{
  line-height: 24px !important;
} */
.public-title-btns i{
  background: #3b4874;
  color:#a5a5be;
  border-radius:.2rem;
  padding:.02rem .12rem;
  cursor: pointer;
}
.public-title-btns .btn-active{
  background:#7695fc;
  color:white;
}
.energy-form-item{
  /* display:inline-block; */
  margin-bottom:0px;
  float: left;
}
.item-p{
        background: #262f45 !important;
        width: 200px;
        border: 1px solid 262f45 !important;
        color: #fff !important;
        /* display: inline-block; */
        float: left;
        height: 30px;
        cursor: text;
        margin-top: 7px;
        border-radius: 3px;
    }
    .item-p-ipt{
        width: 80px;
        float: left;
        height: 28px;
        border: none;
        line-height: 28px;
    }
    .item-p-ipt .el-input__inner{
        width: 80px !important;
        border: none !important;
        /* border-bottom: 1px solid; */
        height: 26px !important;
        margin-bottom: 2px !important;
        float: left !important;
        padding: 0 5px !important;
    }
    .item-span{
        float: left;
        width: 20px;
        height: 28px;
        line-height: 28px;
        text-align: center;
    }
    .el-select>>>.el-select__tags{
      height: 28px !important;
      
    }
    .el-select>>>.el-tag{
      background: rgba(0,0,0,0) !important;
      border-color:rgba(0,0,0,0) !important;
      max-width: 120px !important;
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
    }
    .el-select>>>.el-select__tags{
      max-width: 170px !important;
    }
    .el-select>>>.el-select__tags-text{
      display: inline-block !important;
      max-width: 140px !important;
    }
    .el-cascader>>>.el-cascader__tags{
      width: 170px !important;
      height: 28px !important;
    }
    .el-cascader>>>.el-tag{
      background: rgba(0,0,0,0) !important;
      border-color:rgba(0,0,0,0) !important;
      max-width: 100px !important;
      white-space: nowrap !important;
      text-overflow: ellipsis !important;
      overflow: hidden !important;
    }
    .el-date-editor{
        padding-right: 5px !important;
    }
    .energyMonitor-wrap >>> .el-dialog__body .el-table .cell{
        padding: 12px 10px 12px 0
    }
</style>
