export const mixin = {
  data() {
    return {
      pageSizes:[10,20,30,40,50]
    }
  },
  created() {
    if (window.localStorage) {
      var storage = window.localStorage;
      if (storage.getItem('julePageSize')) {
        this.pageSize = Number(storage.getItem('julePageSize'))
      } else {
        this.pageSize = 10
      }
    } else {
      this.pageSize = 10
    }
  },
  methods:{
    handleSizeChange(value) {
      if (window.localStorage) {
          var storage = window.localStorage;
          storage.setItem('julePageSize',value)
          this.pageSizeChange(value)
      } else {
          this.pageSizeChange(value)
      }
    }
  }
}
