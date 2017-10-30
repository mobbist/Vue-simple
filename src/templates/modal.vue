<template>
	<div id="modal">
		<div class="bg" v-bind:class="{ showBg: show }">
		</div>
		<slot>
			<logoTemp v-if="typeCode ===0" v-bind:class="{ showView: show }" />
			<bannerTemp v-if="typeCode ===1" v-bind:class="{ showView: show }" />
			<tGTemp v-if="typeCode ===2" v-bind:class="{ showView: show }" />
			<productTemp v-if="typeCode ===3" v-bind:class="{ showView: show }" />
			<textareaTemp v-if="typeCode ===4" v-bind:class="{ showView: show }" />
		</slot>
	</div>
</template>
<script>
import logoTemp from "./logoTemp";
import bannerTemp from "./bannerTemp";
import tGTemp from "./tGTemp";
import productTemp from "./productTemp";
import textareaTemp from "./textareaTemp";
import { mapState } from "vuex";
export default {
  props: {
    isShow: Boolean,
    typeCode: Number
  },

  components: {
    logoTemp,
    bannerTemp,
    tGTemp,
    productTemp,
    textareaTemp
  },
  computed: {
    ...mapState(["show"])
  }
};
</script>

<style>
.bg {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  opacity: 0;
  background-color: #000;
  visibility: hidden;
  transition: 0.5s;
  z-index: 999;
}
.errorView {
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  color: #f00;
}

.showBg {
  opacity: 0.7;
  visibility: inherit;
}

#modal .showView {
  visibility: inherit;
  opacity: 1;
}

.view {
  position: fixed;
  width: 600px;
  height: 300px;
  background-color: #fff;
  left: 50%;
  top: 50%;
  margin-left: -230px;
  margin-top: -180px;
}
</style>


