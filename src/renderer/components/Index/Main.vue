<template>
  <div class="main" style="margin-left: auto; margin-right: auto; text-align:center;">
    <canvas id="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
  
</template>

<script>

  export default {
    data () {
      return {
        classBgStatus: 'bg-status-default',
        ctx: null,
        canvasHeight: 500,
        canvasWidth: 500
      }
    },
    name: 'my-main',
    mounted () {
      global.on('device', (deviceId) => {
        this.loadDeviceInfo(deviceId);
        this.initCanvas(deviceId);
      });
    },
    methods: {
      loadDeviceInfo (deviceId) {
        console.log('Main.vue device: ' + deviceId);
      },
      initCanvas(deviceId) {
        let that = this;
        let fag = true;
        this.ctx = document.getElementById('canvas').getContext('2d');
        let tempImage = new Image();
        tempImage.onload = function () {
          let width = tempImage.naturalWidth;
          let height = tempImage.naturalHeight;
          that.autoResizeImage(0, global.CANVAS_HEIGHT, tempImage);
          console.log(tempImage.width);
          console.log(tempImage.height);
          global.CANVAS_WIDTH = tempImage.width;
          that.ctx.drawImage(tempImage, 0, 0, global.CANVAS_WIDTH, global.CANVAS_HEIGHT);
          that.canvasHeight = global.CANVAS_HEIGHT;
          that.canvasWidth = global.CANVAS_WIDTH;
        }
        this.$remoteApi.screencapTask(deviceId, (err, screencap) => {
          if (err) {
            console.log(err);
            return;
          }
          let chunks = []; //用于保存请求不断加载传输的缓冲数据
          let size = 0;　　 //保存缓冲数据的总长度

          screencap.on('data',function(chunk){
            chunks.push(chunk);
            size += chunk.length;　　//累加缓冲数据的长度
          });

          screencap.on('end',function(err){
            let data = Buffer.concat(chunks, size);
            let base64Img = 'data:image/png;base64,' + data.toString('base64');
            tempImage.src = base64Img;
          });
        });
        global.on('resize-canvas', () => {
          this.canvasHeight = global.CANVAS_HEIGHT;
          this.canvasWidth = global.CANVAS_WIDTH;
        });
      },
      autoResizeImage(maxWidth,maxHeight,objImg){
        var img = new Image();
        img.src = objImg.src;
        var hRatio;
        var wRatio;
        var Ratio = 1;
        var w = img.width;
        var h = img.height;
        wRatio = maxWidth / w;
        hRatio = maxHeight / h;
        if (maxWidth ==0 && maxHeight==0) {
          Ratio = 1;
        } else if (maxWidth==0) {//
          if (hRatio<1) Ratio = hRatio;
        } else if (maxHeight==0) {
          if (wRatio<1) Ratio = wRatio;
        } else if (wRatio<1 || hRatio<1) {
          Ratio = (wRatio<=hRatio?wRatio:hRatio);
        }
        if (Ratio<1){
          w = w * Ratio;
          h = h * Ratio;
        }
        objImg.height = h;
        objImg.width = w;
      }
    }
  }
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

body { font-family: 'Source Sans Pro', sans-serif; }

</style>
