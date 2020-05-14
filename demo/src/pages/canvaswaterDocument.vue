<template>
  <div class="canvaswaterDocument">
      canvas方法前端生成水印

      

  </div>
</template>
<script>
import {__waterDocument} from "../js/canvaswaterDocument";
import {__waterDocumentSvg} from '../js/SvgwaterDocument';
export default {
  data() {
    return {
    };
  },
  methods: {


  },
  mounted(){
      __waterDocument()
  },
  
};
</script>
<style >

</style>
