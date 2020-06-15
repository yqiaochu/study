<template>
  <div class="energyMonitor-wrap" @click="searchStatus=false">
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
        icon="./static/aaa.png"
        :events="marker.events"
        :position="marker.position"
        
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
        icon="./static/aaa.png"
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
import {AMapManager,lazyAMapApiLoaderInstance} from "vue-amap"
let amapManager = new AMapManager();


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

      Visible:false,
      searchStatus:false,
      loading1: false,
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
      colors :{},
      disProvince:null,
      adCode:410000,
      depth:1,
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
          amapManager._map.setMapStyle('amap://styles/b07ef2b344a8adca6c9e97f59446273f')
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

            // amapManager._map.remove(self.polygons)
            // self.polygons = [];
          }

        },
        click: e => {

          // amapManager._map.setZoom(9);
          // self.center = [e.lnglat.lng,e.lnglat.lat]

        }
      },
      provinceMarkers:[
    {
        "regionCode":"410100",
        "regionName":"郑州市",
        "longitude":"113.665410",
        "latitude":"34.757977",
        "regionEenergyEnterprise":4,
        "energyEnterpriseInfo":[
            {
                "regionCode":"410103",
                "regionName":"二七区",
                "longitude":"333.000000",
                "latitude":"333.000000",
                "corporationCode":null,
                "enterpriseName":"33333",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"3333"
            },
            {
                "regionCode":"410103",
                "regionName":"二七区",
                "longitude":"99.999900",
                "latitude":"88.888800",
                "corporationCode":null,
                "enterpriseName":"国电荥阳煤电一体化有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"测试地址"
            },
            {
                "regionCode":"410103",
                "regionName":"二七区",
                "longitude":"112.500000",
                "latitude":"34.430000",
                "corporationCode":null,
                "enterpriseName":"(郑州嘉耐特种铝酸盐有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"郑州"
            },
            {
                "regionCode":"410105",
                "regionName":"金水区",
                "longitude":"29.130000",
                "latitude":"23.230000",
                "corporationCode":null,
                "enterpriseName":"qwrqw",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"sfsdfs"
            }
        ],
        "position":[
            "113.665410",
            "34.757977"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410181",
        "regionName":"巩义市",
        "longitude":"112.982830",
        "latitude":"34.752180",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "112.982830",
            "34.752180"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410200",
        "regionName":"开封市",
        "longitude":"114.341446",
        "latitude":"34.797050",
        "regionEenergyEnterprise":1,
        "energyEnterpriseInfo":[
            {
                "regionCode":"410202",
                "regionName":"龙亭区",
                "longitude":"60.000000",
                "latitude":"60.000000",
                "corporationCode":null,
                "enterpriseName":"河南省宏大化工有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"河南郑州"
            }
        ],
        "position":[
            "114.341446",
            "34.797050"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410225",
        "regionName":"兰考县",
        "longitude":"114.820570",
        "latitude":"34.829900",
        "regionEenergyEnterprise":1,
        "energyEnterpriseInfo":[
            {
                "regionCode":"410225",
                "regionName":"兰考县",
                "longitude":"112.000000",
                "latitude":"42.000000",
                "corporationCode":null,
                "enterpriseName":"兰考县单位",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":""
            }
        ],
        "position":[
            "114.820570",
            "34.829900"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410300",
        "regionName":"洛阳市",
        "longitude":"112.434470",
        "latitude":"34.663040",
        "regionEenergyEnterprise":1,
        "energyEnterpriseInfo":[
            {
                "regionCode":"410322",
                "regionName":"孟津县",
                "longitude":"23.000000",
                "latitude":"12.000000",
                "corporationCode":null,
                "enterpriseName":"测试用郭11111",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"河南省洛阳市"
            }
        ],
        "position":[
            "112.434470",
            "34.663040"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410400",
        "regionName":"平顶山市",
        "longitude":"113.307720",
        "latitude":"33.735240",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "113.307720",
            "33.735240"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410482",
        "regionName":"汝州市",
        "longitude":"112.845340",
        "latitude":"34.167408",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "112.845340",
            "34.167408"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410500",
        "regionName":"安阳市",
        "longitude":"114.352486",
        "latitude":"36.103443",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "114.352486",
            "36.103443"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410526",
        "regionName":"滑县",
        "longitude":"114.524000",
        "latitude":"35.574627",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "114.524000",
            "35.574627"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410600",
        "regionName":"鹤壁市",
        "longitude":"114.295440",
        "latitude":"35.748238",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "114.295440",
            "35.748238"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410700",
        "regionName":"新乡市",
        "longitude":"113.883990",
        "latitude":"35.302616",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "113.883990",
            "35.302616"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410728",
        "regionName":"长垣县",
        "longitude":"114.673805",
        "latitude":"35.196150",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "114.673805",
            "35.196150"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410800",
        "regionName":"焦作市",
        "longitude":"113.238266",
        "latitude":"35.239040",
        "regionEenergyEnterprise":8,
        "energyEnterpriseInfo":[
            {
                "regionCode":"410823",
                "regionName":"武陟县",
                "longitude":"112.000000",
                "latitude":"31.000000",
                "corporationCode":null,
                "enterpriseName":"焦作市华康糖醇科技有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"焦作市武陟县西陶镇"
            },
            {
                "regionCode":"410822",
                "regionName":"博爱县",
                "longitude":"112.110000",
                "latitude":"33.120000",
                "corporationCode":null,
                "enterpriseName":"博爱金隅水泥有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"博爱县工业园区岩鑫大道六号"
            },
            {
                "regionCode":"410882",
                "regionName":"沁阳市",
                "longitude":"112.856520",
                "latitude":"35.197780",
                "corporationCode":null,
                "enterpriseName":"沁阳市金隅水泥有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"沁阳市沁北工业集聚区沁北园区"
            },
            {
                "regionCode":"410821",
                "regionName":"修武县",
                "longitude":"113.440000",
                "latitude":"35.370000",
                "corporationCode":null,
                "enterpriseName":"中铝中州铝业有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"河南省修武县七贤镇中州铝厂"
            },
            {
                "regionCode":"410803",
                "regionName":"中站区",
                "longitude":"113.180000",
                "latitude":"35.230000",
                "corporationCode":null,
                "enterpriseName":"河南佰利联新材料有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"焦作市中站区焦克路1669号"
            },
            {
                "regionCode":"410803",
                "regionName":"中站区",
                "longitude":"113.180000",
                "latitude":"35.230000",
                "corporationCode":null,
                "enterpriseName":"河南鑫诚耐火材料股份有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"焦作市中站区焦克路南"
            },
            {
                "regionCode":"410803",
                "regionName":"中站区",
                "longitude":"113.120000",
                "latitude":"35.220000",
                "corporationCode":null,
                "enterpriseName":"多氟多化工股份有限公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"河南省焦作市中站区焦克路"
            },
            {
                "regionCode":"410882",
                "regionName":"沁阳市",
                "longitude":"112.870000",
                "latitude":"35.200000",
                "corporationCode":null,
                "enterpriseName":"昊华宇航化工有限责任公司",
                "industryCode":null,
                "industryName":null,
                "enterpriseSize":"河南省沁阳市沁北工业集聚区"
            }
        ],
        "position":[
            "113.238266",
            "35.239040"
        ],
        "events":{

        }
    },
    {
        "regionCode":"410900",
        "regionName":"濮阳市",
        "longitude":"115.041300",
        "latitude":"35.768234",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "115.041300",
            "35.768234"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411000",
        "regionName":"许昌市",
        "longitude":"113.826065",
        "latitude":"34.022957",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "113.826065",
            "34.022957"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411100",
        "regionName":"漯河市",
        "longitude":"114.026405",
        "latitude":"33.575855",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "114.026405",
            "33.575855"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411200",
        "regionName":"三门峡市",
        "longitude":"111.194100",
        "latitude":"34.777336",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "111.194100",
            "34.777336"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411300",
        "regionName":"南阳市",
        "longitude":"112.540920",
        "latitude":"32.999080",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "112.540920",
            "32.999080"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411381",
        "regionName":"邓州市",
        "longitude":"112.092710",
        "latitude":"32.681640",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "112.092710",
            "32.681640"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411400",
        "regionName":"商丘市",
        "longitude":"115.650500",
        "latitude":"34.437054",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "115.650500",
            "34.437054"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411481",
        "regionName":"永城市",
        "longitude":"116.449670",
        "latitude":"33.931316",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "116.449670",
            "33.931316"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411500",
        "regionName":"信阳市",
        "longitude":"114.075030",
        "latitude":"32.123276",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "114.075030",
            "32.123276"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411525",
        "regionName":"固始县",
        "longitude":"115.667330",
        "latitude":"32.183075",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "115.667330",
            "32.183075"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411600",
        "regionName":"周口市",
        "longitude":"114.649650",
        "latitude":"33.620358",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "114.649650",
            "33.620358"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411628",
        "regionName":"鹿邑县",
        "longitude":"115.486390",
        "latitude":"33.861070",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "115.486390",
            "33.861070"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411700",
        "regionName":"驻马店市",
        "longitude":"114.024734",
        "latitude":"32.980167",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "114.024734",
            "32.980167"
        ],
        "events":{

        }
    },
    {
        "regionCode":"411729",
        "regionName":"新蔡县",
        "longitude":"114.975240",
        "latitude":"32.749947",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "114.975240",
            "32.749947"
        ],
        "events":{

        }
    },
    {
        "regionCode":"419001",
        "regionName":"济源市",
        "longitude":"112.590050",
        "latitude":"35.090378",
        "regionEenergyEnterprise":0,
        "energyEnterpriseInfo":[

        ],
        "position":[
            "112.590050",
            "35.090378"
        ],
        "events":{

        }
    }
],
      cityMarkers:[],
      countyMarkers:[],
    };
  },
  methods: {

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
    // var map = new AMap.Map("container", {
    //     zoom: 4.5,
    //     center: [116.412427, 39.303573],
    //     pitch: 0,
    //     viewMode: '3D',
    // });


     // 创建区域图层
    initPro(code, dep) {
        let map = amapManager._map
      let that = this
       console.log(AMap.DistrictLayer)
      this.disProvince && disProvince.setMap(null)
      this.disProvince = new AMap.DistrictLayer.Province({
        zIndex: 12,
        adcode: [code],
        depth: dep,
        styles: {
          fill: function(properties) {
            // properties为可用于做样式映射的字段，包含
            // NAME_CHN:中文名称
            // adcode_pro
            // adcode_cit
            // adcode
            var adcode = properties.adcode
            return 'rgb(45 ,99,201)'
            // that.getColorByAdcode(adcode)
          },
          'province-stroke': 'cornflowerblue',
          'city-stroke': 'rgb(53,224,251)', // 中国地级市边界
          'county-stroke': 'rgba(255,255,255,0.5)' // 中国区县边界
        }
      })
      this.disProvince.setMap(map)
    },
    // 颜色辅助方法
    // getColorByAdcode(adcode) {
    //   if (!this.colors[adcode]) {
    //     var gb = Math.random() * 155
    //     this.colors[adcode] = 'rgb(' + gb + ',' + gb + ',250)'
    //   }
    //   return this.colors[adcode]
    // },


    drawBounds(){
        //加载行政区划插件
        var opts = {
          subdistrict: 0,   //获取边界不需要返回下级行政区
          extensions: 'all',  //返回行政区边界坐标组等具体信息
          level: 'province'  //查询行政级别为 市
        };
        console.log(AMap.DistrictSearch)
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
                    strokeStyle: "dashed"
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
    //   this.axios.post('/api/government/energyMonitor/getRegionEnterpriseInfo',{regionCode}).then((res)=>{
    //     res.data.data.map((i,j)=>{
    //       i.position = [i.longitude,i.latitude]
    //       i.events = {
    //         click(){
    //         },
    //         mouseover() {
    //           self.showProvinceWindow = {
    //             position:i.position,
    //             visible:true,
    //             content:`
    //             <div style="color:#fff;background:#343d5d;border:none;border-radius:4px;">
    //               <p style="font-size:14px;">${i.regionName}共有企业：${i.energyEnterpriseInfo.length}个</p>
    //             </div>`
    //           }
    //         },
    //         mouseout() {
    //           self.showProvinceWindow.visible = false
    //         }
    //       }
    //     })
        // this.provinceMarkers = res.data.data
        this.loading1 = false
    //   }).catch()
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
      // var industryCode=val.industryCode
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
        },
        classChange(val){
            if(this.queryform.energyTypeCodes&&this.queryform.energyTypeCodes.length>0){
               this.queryform.energyTypeCodes=[]; 
            }
            console.log(val);
            console.log(this.queryform.energyClassCodes);
        },

  },
        // this.getRegionEnterpriseInfo()
  mounted() {
    //   setTimeout(() => {
          lazyAMapApiLoaderInstance.load().then(() => {
            // this.drawBounds();
            this.initPro(410000,1)
        });
    //   }, 500);
    
    
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
