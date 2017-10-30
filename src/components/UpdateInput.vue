<template>
    <div class="inputBox">
        <input class='input2' type="text"  :value="imgUrl" @change="changeInput(id)"  />
        <div class="imageform">上传<input type="file" name="photoImg" class="photoImg" @change="updated(id)" /></div>
        <p>建议限宽{{width}}px ，限高 {{height}}px</p>
    </div>
</template>
<script>
export default {
  props: ["imgUrl", "id", "width", "height"],
  methods: {
    updated(id) {
      let target = event.target;
      if (target.value) {
        if (window.FormData) {
          var formData = new FormData();
          // 建立一个upload表单项，值为上传的文件
          formData.append("photoImg", target.files[0]);
          var xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            shopApiHost + "api/ApiMerchantsSettled/UploadFlagshipStore"
          );
          // 定义上传完成后的回调函数
          xhr.onload = () => {
            if (xhr.status === 200) {
              var result = JSON.parse(xhr.response);
              if (result.Code == "0") {
                this.$store.commit({
                  type: "updateImg",
                  id,
                  data: result.Data
                });
              }
            } else {
              console.log("出错了");
            }
          };
          // xhr.upload.onprogress = function (event) {
          //     if (event.lengthComputable) {
          //         var complete = (event.loaded / event.total * 100 | 0);
          //         var progress = document.getElementById('uploadprogress');
          //         progress.value = progress.innerHTML = complete;
          //     }
          // };
          xhr.send(formData);
        }
      }
    },
    changeInput(id) {
      this.$store.commit({
        type: "updateImg",
        id,
        data: event.target.value
      });
    }
  }
};
</script>
<style>
.inputBox {
  display: block;
  float: left;
  height: 50px;
}

.inputBox p {
  font-size: 12px;
  color: #cbcbcb;
}

.updateLine {
  overflow: hidden;
  margin-bottom: 18px;
}

.input2 {
  width: 305px;
  height: 30px;
  border: 1px solid #ccc;
  float: left;
  padding-left: 5px;
}

.imageform {
  float: left;
  margin-left: 10px;
  width: 60px;
  height: 32px;
  background-color: #5aa5f0;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  color: #fff;
  line-height: 32px;
}

.photoImg {
  position: absolute;
  left: 0px;
  top: 0px;
  cursor: pointer;
  font-size: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>
