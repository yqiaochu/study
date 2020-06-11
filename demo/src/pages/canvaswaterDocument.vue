<template>
  <div class="canvaswaterDocument">
      canvas方法前端生成水印

      

  </div>
</template>
<script>
import {__waterDocument as waterDocument} from "../js/canvaswaterDocument";
import {__waterDocumentSvg } from '../js/SvgwaterDocument';
export default {
  data() {
    return {
    };
  },
  methods: {


  },
  mounted(){
      waterDocument({
            width :'200px',
            height :'150px',
            textAlign :'center',
            textBaseline :'middle',
            font :"20px Microsoft Yahei",
            fillStyle :'rgba(230, 230, 230, 0.8)',
            content :'保密水印',
            rotate :'10',
            zIndex :-1000
      })
  },
  
};
</script>
<style >

</style>
