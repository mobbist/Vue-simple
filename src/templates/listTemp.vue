<template>
    <div class="listTemp">
        <div v-for="(item,index) of list" class="updateLine" :key="item.id">
            <updateLine :imgUrl="item.ImageUrl" :id="index" :width="item.width" :height="item.height" />
            <input class="input3" v-if="type!=2" type="text" :value="item.URL" @change="changeUrl(index)" />
            <!-- <div class="edit" v-if="type!=2">
                <span @click="change(index,'up')" class="up"></span>
                <span @click="change(index,'down')" class="down"></span>
                <span @click="change(index,'delete')" class="delete"></span>
            </div> -->
        </div>
        <!-- <div class="line1">
                <div class="create" @click="create">添加{{newList}}</div>
            </div> -->
    </div>
</template>
<script>
import updateLine from "../components/UpdateInput";
//这4个都是一个函数, 都会返回一个对象,可以使用扩展运算符来和其他普通的函数组合使用,用来简化 this.$store....的操作
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: {
    updateLine
  },
  props: ["type"],
  // props: {

  //     // maxLength() {
  //     //     return
  //     // }
  // },
  //vuex辅助函数mapState,返回一个对象
  //computed: mapState({

  //list为Key值, 接受一个箭头函数是mapstate提供的state对象,注意:这里只可以存在store中所存在的值
  //list: state => state.list
  //}),

  //如果和其他普通的值该如何共存, 由于mapState返回一个对象, 可以是用扩展运算符扩展该对象, 这样就可以和其他属性共存了
  computed: {
    abc() {
      return 123;
    },
    ...mapState(["list"])
  },

  // computed: {
  //     num() {
  //         return this.$store.state.num
  //     },
  //     list() {
  //         return this.$store.state.list
  //     }
  // },
  methods: {
    change(id, method) {
      //提交一个store的metation, 用于改变state里的值
      this.$store.commit({ type: "changeList", method, id });
      // this.$store.commit({
      //     type: "addAction",
      //     num: 5
      // });
      //提交异步action
      //this.$store.dispatch("addAction");
    },
    create() {
      this.$store.commit({ type: "create" });
    },
    changeUrl(id) {
      this.$store.commit({ type: "changeUrl", value: event.target.value, id });
    }
  }
};
</script>
<style>
.listTemp {
  padding-bottom: 10px;
}

.input3 {
  width: 300px;
  height: 30px;
  border: 1px solid #ccc;
  float: left;
  margin-left: 30px;
  padding-left: 5px;
}

.edit {
  margin-left: 30px;
  float: left;
}

.edit span {
  display: inline-block;
  height: 30px;
  width: 30px;
  margin-right: 10px;
  cursor: pointer;
}

.edit .up {
  background: url("../assets/viewIcon.png") no-repeat 0px 0px;
}

.edit .down {
  background: url("../assets/viewIcon.png") no-repeat -30px 0px;
}

.edit .delete {
  background: url("../assets/viewIcon.png") no-repeat -60px 0px;
}

.viewContent .line1 {
  border-top: 1px solid #f2f2f2;
  overflow: hidden;
}

.viewContent .create {
  float: right;
  width: 98px;
  cursor: pointer;
  height: 30px;
  color: #5aa5f0;
  text-align: center;
  line-height: 32px;
  border: 1px solid #5aa5f0;
  margin-top: 10px;
}
</style>
