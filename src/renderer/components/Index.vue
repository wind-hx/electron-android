<template>
  <div class="content">
    <el-container>
      <el-header>
        <my-header></my-header>
      </el-header>
      <el-main>
        <my-main></my-main>
      </el-main>
      <el-footer>
        <my-footer></my-footer>
      </el-footer>

    </el-container>
  </div>
  
</template>

<script>
  import MyHeader from './Index/Header.vue'
  import MyMain from './Index/Main.vue'
  import MyFooter from './Index/Footer.vue'

  export default {
    components: {
      MyHeader, MyMain, MyFooter
    },
    data () {
      return {
        classBgStatus: 'bg-status-default'
      }
    },
    name: 'index',
    mounted () {
      this.check()
      global.WINDOW_HEIGHT = document.documentElement.clientHeight;
      global.WINDOW_WIDTH = document.documentElement.clientWidth;
      global.CANVAS_HEIGHT = global.WINDOW_HEIGHT - 200;
      global.CANVAS_WIDTH = global.WINDOW_WIDTH;
      global.emit('resize-canvas', null);
      window.onresize = () => {
          global.WINDOW_HEIGHT = document.documentElement.clientHeight;
          global.WINDOW_WIDTH = document.documentElement.clientWidth;
          global.CANVAS_HEIGHT = global.WINDOW_HEIGHT - 200;
          // global.CANVAS_WIDTH = global.WINDOW_WIDTH;
          console.log(`this log is window height = ${global.WINDOW_HEIGHT}`);
          console.log(`this log is window width = ${global.WINDOW_WIDTH}`);
          console.log(`this log is canvas height = ${global.CANVAS_HEIGHT}`);
          // console.log(`this log is canvas width = ${global.CANVAS_WIDTH}`);
          global.emit('resize-canvas', null);
      };

    },
    methods: {
      open (link) {
        
      },
      execShell (shell) {
        
      },
      snBtnClick () {
        if (this.inputSn === '') {
          this.$notify({
            title: '警告',
            message: 'SN不能为空!',
            type: 'warning'
          });
          return;
        }
        this.$remoteApi.writeSn(this.inputSn, (result) => {
          if (result) {
            this.$notify({
              title: '成功',
              message: '写入成功!',
              type: 'success'
            });
          } else {
            this.$notify.error({
              title: '错误',
              message: '写入失败!'
            });
          }
        })
        
      },
      macBtnClick () {
        if (this.inputMac === '') {
          this.$notify({
            title: '警告',
            message: 'MAC不能为空!',
            type: 'warning'
          });
          return;
        }
        this.$remoteApi.writeMac(this.inputMac, (result) => {
          if (result) {
            this.$notify({
              title: '成功',
              message: '写入成功!',
              type: 'success'
            });
          } else {
            this.$notify.error({
              title: '错误',
              message: '写入失败!'
            });
          }
        })
      },
      check () {
        this.checkConnectionTask()
      },
      checkConnectionTask () {
        this.$remoteApi.checkConnectionTask((isConnection) => {
          this.isConnection = isConnection
          console.log(this.isConnection)

          if (this.isConnection) {
            this.statusText = '已连接';
            this.classBgStatus = 'bg-status-ok';
          } else {
            this.statusText = '未连接';
            this.classBgStatus = 'bg-status-default';
          }
        })
      },
      getSnTask () {
        this.$remoteApi.getSnTask((result) => {
          this.readSn = result
          console.log(this.readSn)
        })
      },
      getMacTask () {
        this.$remoteApi.getMacTask((result) => {
          this.readMac = result
          console.log(this.readMac)
        })
      }
    }
  }
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

body { font-family: 'Source Sans Pro', sans-serif; }

</style>
