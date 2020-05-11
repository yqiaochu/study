<template>
  <div class="home">11111111111111111111111111
      <button @click="tosearch">tosearch</button>
      <button @click="add">add</button>
      <div>{{enterprise}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        enterprise:{
            orgPid: "bb35ae53c97b4ef4a683c44ccc59e65c",
            orgName: "ceshi",
            orgCode: "222222",
            orgType: "BM",
            shortName: "22222"
        }
    };
  },

  methods: {
      tosearch(){
          this.$router.push({
                path: 'home',
            })
      },
    add() {
      const api = "/coral-isc-server/api/coral/isc/orgs/";
      this.axios.post(api, this.enterprise 
        //   ,{headers: {
        //     "Content-Type": "application/json;charset=utf-8"
        //   }}
        )
        .then(response => {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
