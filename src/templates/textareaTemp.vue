<template>
    <div id="banner" class="bannerView">
        <div class="title">旗舰店介绍
            <span @click="close" class="close"></span>
        </div>
        
        <div class="viewContent">
            
        <div class="errorView errorShow">{{error}}</div>
            <p class="changeTitle">标题:</p>
            <input class="changeTitleInput" type="text" :value="title" @change="changeTitle" />

           <textarea  @change="changeValue" v-model="list[0].URL"></textarea>     
           <div class="submitBox">
        <div class="line">
            <div @click="close" class="left">取消</div>
            <div @click="submit"   class="right">保存</div>
        </div>
    </div>
        </div>
    </div>
</template>
<script>
import SubmitClose from "../components/SubmitClose";
import { mapState } from "vuex";
export default {
  data() {
    return {
      minLength: 1,
      maxLength: 5
    };
  },
  computed: {
    ...mapState(["title"]),
    ...mapState(["list"]),
    ...mapState(["error"])
  },
  components: {
    SubmitClose
  },
  methods: {
    close() {
      this.$store.commit("close");
    },
    submit() {
      this.$store.commit({ type: "submit" });
    },
    changeValue() {
      this.$store.commit({
        type: "changeUrl",
        value: event.target.value,
        id: 0
      });
    },
    changeTitle() {
      this.$store.commit({ type: "changeTitle", value: event.target.value });
    }
  }
};
</script>

<style>
.bannerView {
  position: fixed;
  width: 790px;
  min-height: 400px;
  background-color: #fff;
  left: 50%;
  top: 100px;
  margin-left: -395px;
  visibility: hidden;
  opacity: 0;
  transition: 0.5s;

  z-index: 999;
}
.viewContent textarea {
  width: 720px;
  height: 300px;
  font-size: 14px;
  resize: none;
  border: 1px solid #ccc;
}
.changeTitle {
  font-size: 12px;
  padding-bottom: 10px;
}

.changeTitleInput {
  width: 305px;
  height: 30px;
  border: 1px solid #ccc;
  padding-left: 5px;
  margin-bottom: 10px;
}
.title {
  height: 40px;
  background-color: #5aa5f0;
  line-height: 40px;
  padding-left: 10px;
  color: #fff;
  position: relative;
}

.title .close {
  background: url("../assets/viewIcon.png") no-repeat right 0px;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}

.viewname1 {
  font-size: 12px;
  padding-bottom: 10px;
}

.viewContent {
  padding-left: 34px;
  padding-right: 34px;
  padding-top: 9px;
}

.viewname1 .span1 {
  padding-left: 246px;
}

.viewname1 .span2 {
  padding-left: 240px;
}

.submitBox {
  border-top: 1px solid #f2f2f2;
}

.submitBox p {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  color: #cbcbcb;
}

.submitBox .line {
  display: flex;
  justify-content: center;
  font-size: 14px;
  margin-top: 54px;
  margin-bottom: 50px;
}

.submitBox .line .left {
  width: 98px;
  height: 28px;
  border: 1px solid #ff9500;
  color: #ff9500;
  line-height: 28px;
  text-align: center;
  margin-right: 40px;
  border-radius: 3px;
  cursor: pointer;
}

.submitBox .line .right {
  width: 100px;
  height: 30px;
  background-color: #ff9500;
  color: #fff;
  line-height: 28px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
}
</style>
