import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
//使用vuex
//Vue.use(Vuex);
//定义一个容器并导出
export default new Vuex.Store({
    state: {//应用中所需要用到的状态数据: 当状态更新的时候, 会立刻渲染组件
        num: 101,
        show: false,
        title: "",
        list: [
            {
                ImageUrl: "",
                URL: ""
            },
            {
                ImageUrl: "",
                URL: ""
            },
            {
                ImageUrl: "",
                URL: ""
            }
        ],
        template: {
            limit: 1,
            size: [{ width: "", height: "" }]
        },
        error: ""
    },
    //Mutations 唯一修改状态的事件的回调函数:
    //如果需要改变state中的数据, 则必须要显示的提交一个Mutation, mutation内的函数必须是同步的
    mutations: {
        //只要触发这个changeList函数, state下的list就会发生改变
        changeList(state, { id, method }) {
            switch (method) {
                case "up":
                    if (id != 0) {
                        let temp = state.list[id]
                        //v坑点之一: 直接通过数组下标修改数组vue是跟踪不到的，这是受限于ES5的语言特性，为了兼容这一操作，vue 提供了 $set 方法来实现对按照下标访问的响应式更新
                        //你要修改的数组, 要修改的下标, 要修改的值
                        state.list.splice(id, 1, state.list[id - 1]);
                        state.list.splice(id - 1, 1, temp);
                        //Vue.set(state.list, [id - 1], temp)
                    }
                    break
                case "down":
                    if (id < state.list.length - 1) {
                        var temp = state.list[id];
                        state.list.splice(id, 1, state.list[id + 1]);
                        state.list.splice(id + 1, 1, temp);
                    }
                    break
                case "delete":
                    if (state.list.length < 2) {
                        console.log("最少一个");
                    } else {
                        state.list.splice(id, 1);
                    }
                    break
            }
        },
        create(state) {
            state.list.push({ id: state.list.length, ImageUrl: "", URL: "" });
        },
        updateImg(state, { id, data }) {

            state.list[id].ImageUrl = data
        },
        changeUrl(state, { id, value }) {

            state.list[id].URL = value
        },
        createList(state, data) {
            state.list = data;
        },
        changeTitle(state, { value }) {
            console.log(value);
            state.title = value
        },
        open(state) {
            state.error = "";
            state.show = true;
        },
        close(state) {
            state.show = false;
        },
        saveData(state, data) {
            // console.log(state);
            state = Object.assign(state, data)
            var newList = []
            var length = state.template.limit
            for (var i = 0; i < length; i++) {
                newList.push({
                    ImageUrl: state.list[i] ? state.list[i].ImageUrl : "",
                    URL: state.list[i] ? state.list[i].URL : "",
                    width: state.template.size[i] ? state.template.size[i].width : "",
                    height: state.template.size[i] ? state.template.size[i].height : ""
                });
            }
            console.log(state);
            state.list = newList
        },
        createError(state, str) {
            state.error = str;
        },
        submit(state) {
            var self = this;
            //非空验证
            switch (state.typeCode) {
                case 0:
                    if (state.list[0].ImageUrl == "") {

                        this._mutations.createError[0]("图片链接不能为空");
                        return;
                    }
                    break;
                case 1:
                    for (var item of state.list) {
                        if (item.ImageUrl == "" || item.URL == "") {
                            this._mutations.createError[0]("链接或内容不能为空");
                            return false;
                        };
                    }
                    break;
                case 2: case 3:
                    if (state.title == "") {
                        this._mutations.createError[0]("标题不能为空");
                        return false;
                    }
                    for (var item of state.list) {
                        if (item.ImageUrl == "" || item.URL == "") {
                            this._mutations.createError[0]("链接或内容不能为空");
                            return false;
                        };
                    }
                    break;
                case 4:
                    if (state.list[0].URL == "" || state.title == "") {

                        this._mutations.createError[0]("介绍内容或标题不能为空");
                        return;
                    }
                    break;

            }

            if (state.typeCode == 3) {
                state.list = state.list.map(item => {
                    item.ProductNo = item.URL
                    return item;
                })
            };
            axios.post(shopApiHost + 'api/ApiMerchantsSettled/UpLoadTempletRequest', {
                "CTSysNo": window.tempLateCTSysNo,
                "TempletType": state.templetType,
                "TempletNo": state.templetNo,
                Floors: [
                    {
                        FloorCode: state.floorCode,
                        Title: state.title,
                        FloorDetails: state.list
                    }
                ]
            }).then(function (res) {
                if (res.data.Code != "0") {
                    self._mutations.createError[0](res.data.Message);
                }
                window.local = res.data;
                for (var item of res.data.Floors) {
                    if (parseInt(item.FloorCode) == state.floorCode) {
                        window.Event.trigger("getModuleData", item);
                    };
                }

                state.show = false;
                state.list = [
                    {
                        ImageUrl: "",
                        URL: ""
                    },
                    {
                        ImageUrl: "",
                        URL: ""
                    },
                    {
                        ImageUrl: "",
                        URL: ""
                    }
                ]
                state.template = {
                    limit: 1,
                    size: [{ width: "", height: "" }]
                }
            })
        }
    },
    //包含异步操作, 当异步操作完了之后提交一个mutation
    actions: {
        //context是个对象, 并不是vuex的实例,只不过这个对象包含了实例里的方法而已
        addAction({ dispatch }) {    //这里也可以使用es6的结构赋值, 只要和context下的属性同名即可  dispatch,commit等等    

            setTimeout(() => {
                //改变状态, 提交mutation
                //context.commit({ type: "add", num: 5 });
                //还可以再进行一个action异步操作
                dispatch({ type: "asyncFun", text: "异步测试" });
            }, 3000)
        },
        asyncFun(context, payload) {
            console.log(payload);
        }
    },
    //类似于vue中的属性计算值  computed, 对store中的值进行处理, 外部则通过 this.$store.getter.filterNum来调用
    getters: {
        filterNum(state) {
            return state.num == 102 ? "102" : state.num
        }
    }

});
