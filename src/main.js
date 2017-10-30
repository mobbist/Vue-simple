import Vue from 'vue'
//import App from './components/App'
import Modal from './templates/modal'
import store from './store'

var vm = new Vue({
	el: '#app',
	//在根视图的vue中注入stroe
	store,
	data: {
		show: false,
		typeCode: 0
	},
	template: `
	<Modal :isShow=show :typeCode=typeCode >
  	</Modal>`,
	components: {
		Modal
	}
})

window.vm = vm;

window.AlertView = function (obj) {
	if (!(obj.hasOwnProperty('typeCode') && obj.hasOwnProperty('templetType') && obj.hasOwnProperty('templetNo'))) {
		throw Error("缺少必须参数")
	};
	vm.$store._mutations.createList[0]([{
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
	}]);
	vm.$store._mutations.changeTitle[0]({ value: "" });

	for (var item of local.Floors) {

		if (item.FloorCode == obj.floorCode) {
			vm.$store._mutations.changeTitle[0]({ value: item.Title });
			vm.$store._mutations.createList[0](item.FloorDetails);
		}
	}
	var { typeCode } = obj
	vm.typeCode = typeCode;
	vm.$store._mutations.saveData[0](obj)
}
window.AlertView.open = function () {
	vm.$store._mutations.open[0]();
}

//vm.typeCode = 3

/*
	vuex流程
	vuex是管理页面的状态的
	action:  	首先在页面中要先去获取数据, 获取数据就牵扯到异步操作, 把异步操作定义在action中,去触发一个action,action有一个ajax请求接口, 
	mutation: 	拿到后端接口以后就获得数据,然后去提交一个mutation, vuex中的原则是想要改变state必须要提交mutation
	vueTools:	提交了mutation以后状态就会发生改变, 这里会被chrome的vue工具给监控到, 做一些时间旅行, 查看上一个状态和下一个状态会比较方便
	state:		状态发生改变,vuex是响应式的, 状态一旦发生改变就会重新去渲染组件,
	vuew:		当页面做操作的时候,又会触发相应的action  mutation

*/