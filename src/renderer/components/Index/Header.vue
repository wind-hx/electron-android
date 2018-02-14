<template>
  <div class="header">
    <div>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <label style="line-height: 50px">设备</label>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="grid-content bg-purple-light">
              <el-select v-model="value" placeholder="请选择" style="width: 100%; line-height: 50px;" @change="onDevicesChange">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  
</template>

<script>

  export default {
    data () {
      return {
        options: [],
        value: ''
      }
    },
    name: 'my-header',
    mounted () {
      this.check();
    },
    methods: {
      check () {
        this.connectionCheck();
      },
      connectionCheck () {
        this.$remoteApi.checkConnectionTask((result) => {
          let list = [];
          for (let i = 0; i < result.length; i++) {
            list.push({value: result[i].id, label: result[i].id});
          }
          
          if (list.length === 0) {
            this.value = '';
          }
          this.options = list;
          
        })
      },
      onDevicesChange (value) {
        console.log(value);
        global.DEVICEID = value;
        global.emit('device', value);
      }
    }
  }
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

body { font-family: 'Source Sans Pro', sans-serif; }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center;
  }

</style>
