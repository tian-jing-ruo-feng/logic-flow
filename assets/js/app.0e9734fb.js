(function(t){function e(e){for(var o,a,s=e[0],c=e[1],l=e[2],u=0,f=[];u<s.length;u++)a=s[u],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&f.push(i[a][0]),i[a]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(t[o]=c[o]);d&&d(e);while(f.length)f.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,s=1;s<n.length;s++){var c=n[s];0!==i[c]&&(o=!1)}o&&(r.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},i={app:0},r=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var d=c;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"1d6d":function(t,e,n){},"3bf5":function(t,e,n){"use strict";n("3ff9")},"3ff9":function(t,e,n){},"4fda":function(t,e,n){},5033:function(t){t.exports=JSON.parse('[{"id":"1","shape":"node-circle","x":290,"y":110,"data":{"label":"读数据","status":"success"},"ports":[{"id":"1-1","group":"bottom"}]},{"id":"2","shape":"node-circle","x":290,"y":225,"data":{"label":"逻辑回归","status":"success"},"ports":[{"id":"2-1","group":"top"},{"id":"2-2","group":"bottom"},{"id":"2-3","group":"bottom"}]},{"id":"3","shape":"node-circle","x":170,"y":350,"data":{"label":"模型预测","status":"success"},"ports":[{"id":"3-1","group":"top"}]},{"id":"4","shape":"node-circle","x":450,"y":350,"data":{"label":"读取参数","status":"success"},"ports":[{"id":"4-1","group":"top"}]},{"id":"5","shape":"tjrf-edge","source":{"cell":"1","port":"1-1"},"target":{"cell":"2","port":"2-1"},"zIndex":0},{"id":"6","shape":"tjrf-edge","source":{"cell":"2","port":"2-2"},"target":{"cell":"3","port":"3-1"},"zIndex":0},{"id":"7","shape":"tjrf-edge","source":{"cell":"2","port":"2-3"},"target":{"cell":"4","port":"4-1"},"zIndex":0}]')},5574:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e623"),n("e379"),n("5dc8"),n("37e1");var o=n("a026"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{width:"100vw",height:"100vh",overflow:"hidden"},attrs:{id:"coverCot"}},[n("section",{staticClass:"section-cot",staticStyle:{width:"100%",height:"100%"}},[n("div",{attrs:{id:"container"},on:{click:function(e){return e.stopPropagation(),t.hideFn.apply(null,arguments)}}},[t.showContextMenu?n("MenuBar",{ref:"menuBar",on:{callBack:t.contextMenuFn}}):t._e(),n("el-tag",{staticStyle:{width:"100%"},attrs:{type:"primary"}},[t._v("AntV x6 、ElementUI 、 Vue.js 搭建可视化拖拽流程图")]),n("header",{directives:[{name:"show",rawName:"v-show",value:!0,expression:"true"}]},[n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"项目",placement:"bottom"}},[n("i",{staticClass:"el-icon-menu",on:{click:function(e){return t.showDrawerFn()}}})]),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"长按shift多选",placement:"bottom"}},[n("i",{staticClass:"el-icon-crop"})]),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"放大",placement:"bottom"}},[n("i",{staticClass:"el-icon-zoom-in",on:{click:function(e){return t.zoomFn(.2)}}})]),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"缩小",placement:"bottom"}},[n("i",{staticClass:"el-icon-zoom-out",on:{click:function(e){return t.zoomFn(-.2)}}})]),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"适应屏幕",placement:"bottom"}},[n("i",{staticClass:"el-icon-full-screen",on:{click:t.centerFn}})]),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"执行",placement:"bottom"}},[n("i",{staticClass:"el-icon-video-play",on:{click:function(e){return t.startFn()}}})]),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"保存",placement:"bottom"}},[n("i",{staticClass:"el-icon-upload",on:{click:function(e){return t.saveFn()}}})]),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"加载保存页面",placement:"bottom"}},[n("i",{staticClass:"el-icon-link",on:{click:function(e){return t.loadFn()}}})]),n("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"是否禁用",placement:"bottom"}},[n("i",{class:{"el-icon-lock":t.isLock,"el-icon-unlock":!t.isLock},on:{click:function(e){return t.lockFn()}}})])],1),n("div",{attrs:{id:"draw-cot"}}),n("Drawer",{ref:"drawer",on:{addNode:t.addNode}})],1)])])},r=[],a=n("5530"),s=n("1da1"),c=(n("96cf"),n("d3b7"),n("159b"),n("5033")),l=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-card",{staticClass:"box-card",staticStyle:{padding:"0"},style:{left:t.x+"px",top:t.y+"px"},attrs:{stop:11},on:{click:function(t){t.stopPropagation()}}},[t._v(" 右键菜单 ")])},d=[],u={name:"MenuBar",data:function(){return{x:"",y:"",item:{}}},mounted:function(){},methods:{initFn:function(t,e,n){this.x=parseInt(t)+"",this.y=e+"",n&&(this.item=n)},setItem:function(t){this.item=t},callBack:function(t){this.$emit("callBack",t,this.item)}}},f=u,p=(n("e347"),n("2877")),h=Object(p["a"])(f,l,d,!1,null,"43efc1e0",null),g=h.exports,m=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"Ec-x6-icon"},[o("el-drawer",{staticStyle:{position:"absolute",width:"300px","box-sizing":"border-box"},attrs:{title:"自定义组件",visible:t.visible,direction:t.direction,size:"300px",modal:!1,"modal-append-to-body":!1,"show-close":""},on:{"update:visible":function(e){t.visible=e}}},[o("section",{staticClass:"listBar",on:{click:function(t){t.stopPropagation()}}},[o("p",{on:{click:function(e){t.showMore=!t.showMore}}},[o("img",{class:{arrow:t.showMore},attrs:{src:n("d4d9"),alt:""}}),t._v(" 测试元件 ")]),o("div",{directives:[{name:"show",rawName:"v-show",value:t.showMore,expression:"showMore"}],staticClass:"listBar-cot"},t._l(t.configList,(function(e,n){return o("div",{key:n,staticClass:"drag-cot",attrs:{draggable:"true"},on:{drag:function(n){return t.drag(e)},dragend:function(n){return t.dragend(e)}}},[o("node-circle")],1)})),0)])])],1)},b=[],v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"nodeCircle",staticClass:"node-circle"},[t._m(0)])},y=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"node"},[n("span",[t._v("Node")])])}],k={inject:["getGraph","getNode"],name:"nodeCircle",data:function(){return{label:"label",nodeWidth:0}},mounted:function(){var t=this.getNode();console.log(t,"node 元素")}},w=k,x=(n("718b"),Object(p["a"])(w,v,y,!1,null,"90112dd6",null)),C=x.exports,F=[{type:"primary",label:"基础节点",name:"基础节点",data:{name:"自定义数据名称"}},{type:"primary",label:"基础节点",name:"基础节点",data:{name:"自定义数据名称",t:"",f:""}}],j=F,E={x:null,y:null},O={name:"Drawer",components:{nodeCircle:C},data:function(){return{visible:!0,direction:"ltr",showMore:!1,configList:j}},mounted:function(){document.getElementById("container").addEventListener("dragover",(function(t){E.x=t.clientX,E.y=t.clientY}),!1)},methods:{drag:function(){var t=document.getElementById("container").getBoundingClientRect();E.x>t.left&&E.x<t.right&&E.y>t.top&&(E.y,t.bottom)},nodeConfig:function(t,e,n){var o="",i=(new Date).getTime();switch(t.type){case"output":o={x:e,y:n,width:50,height:50,shape:"node-circle",data:t,ports:{groups:{bottom:{position:"bottom",attrs:{circle:{r:4,magnet:!0,stroke:"#C2C8D5",strokeWidth:1,fill:"#fff"}}}},items:[{id:"out-".concat(i),group:"bottom"}]}};break;case"onlyIn":o={x:e,y:n,width:50,height:50,shape:"node-circle",data:t,ports:{groups:{top:{position:"top",attrs:{circle:{r:4,magnet:!0,stroke:"#C2C8D5",strokeWidth:1,fill:"#fff"}}}},items:[{id:"in-".concat(i),group:"top"}]}};break;case"database":o={x:e,y:n,width:50,height:50,shape:"node-circle",data:t,ports:{groups:{top:{position:"top",attrs:{circle:{r:4,magnet:!0,stroke:"#C2C8D5",strokeWidth:1,fill:"#fff"}}},bottom:{position:"bottom",attrs:{circle:{r:4,magnet:!0,stroke:"#C2C8D5",strokeWidth:1,fill:"#fff"}}}},items:[{id:"in-".concat(i),group:"top"},{id:"out-".concat(i),group:"bottom"}]}};break;case"condition":o={x:e,y:n,width:50,height:50,shape:"node-circle",data:t,ports:{groups:{top:{position:"top",attrs:{circle:{r:4,magnet:!0,stroke:"#C2C8D5",strokeWidth:1,fill:"#fff"}}},bottom:{position:"bottom",attrs:{circle:{r:4,magnet:!0,stroke:"#C2C8D5",strokeWidth:1,fill:"#fff"}}}},items:[{id:"in-".concat(i),group:"top"},{id:"out-".concat(i),group:"bottom"},{id:"out-".concat(i,"-2"),group:"bottom"}]}};break}return o},dragend:function(t){var e=document.getElementById("container").getBoundingClientRect(),n=!1;E.x>e.left&&E.x<e.right&&E.y>e.top&&E.y<e.bottom&&(n=!0),!0===n&&this.$emit("addNode",this.nodeConfig(t,E.x,E.y))}}},S=O,B=(n("3bf5"),Object(p["a"])(S,m,b,!1,null,"db26c0f0",null)),M=B.exports,N=(n("99af"),n("5728"));function _(t,e){var n=t;return n.registerEdge(e,{inherit:"edge",attrs:{line:{stroke:"#C2C8D5",strokeWidth:2,targetMarker:{name:"block",width:12,height:8}}}},!0),n}_(N["b"],"tjrf-edge");n("3e2f");function D(t,e,n,o){var i=t,r=n.width,a=n.height;return i.registerNode(e,{inherit:"vue-shape",width:r,height:a,component:o,ports:{groups:{top:{position:"top",attrs:{circle:{r:4,magnet:!0,stroke:"#c2c805",strokeWidth:1,fill:"#fff"}}},bottom:{position:"bottom",attrs:{circle:{r:4,magnet:!0,stroke:"#c2c805",strokeWidth:1,fill:"#fff"}}},left:{position:"left",attrs:{circle:{r:4,magnet:!0,stroke:"#c2c805",strokeWidth:1,fill:"#fff"}}},right:{position:"right",attrs:{circle:{r:4,magnet:!0,stroke:"#c2c805",strokeWidth:1,fill:"#fff"}}}}},attrs:{label:{text:"测试节点",fontSize:14,fill:"#333333",refX:"50%",refY:"128%",textAnchor:"middle",textVerticalAnchor:"middle"}}},!0),i}D(N["b"],"node-circle",{width:50,height:50},{template:"<node-circle></node-circle>",components:{nodeCircle:C}});n("ac1f"),n("00b4");var I=function(t,e){t.on("edge:contextmenu",(function(t){var n=t.e,o=t.edge;e.showContextMenu=!0,e.$nextTick((function(){e.$refs.menuBar.initFn(n.offsetX,n.offsetY,{type:"edge",item:o})}))})),t.on("edge:connected",(function(n){var o=n.edge,i=t.getCellById(o.source.cell),r=t.getCellById(o.target.cell);if("output"==r.data.type)return t.removeEdge(o.id);if("onlyIn"==i.data.type)return t.remomveEdge(o.id);if(/in/.test(o.source.port))return t.removeEdge(o.id);if(/out/.test(o.target.port))return t.removeEdge(o.id);if("condition"==i.data.type){if(r.data.t===o.id||r.data.f===o.id)return t.removeEdge(o.id);e.$refs.dialogContition.visible=!0,e.$refs.dialogContition.init(i.data.edge)}o.attr({line:{strokeDasharray:""}})})),t.on("node:contextmenu",(function(n){var o=n.x,i=n.y,r=n.node;e.showContextMenu=!0,e.$nextTick((function(){e.$refs.menuBar.setItem({type:"node",item:r});var n=t.localToPage(o,i);e.$refs.menuBar.initFn(n.x,n.y,{type:"node",item:r})}))})),t.on("node:change:data",(function(e){var n=e.node,o=t.getIncomingEdges(n),i=n.getData(),r=i.status;o&&o.forEach((function(t){"running"===r?(t.attr("line/strokeDasharray",5),t.attr("line/style/animation","runnig-line 30s infinite linear")):(t.attr("line/strokeDasharray",""),t.attr("line/style/animation",""))}))}))},z=function(t){var e=new N["b"]({grid:{size:10,visible:!0,type:"dot",args:{color:"#000",thickness:1}},background:{color:"#fff"},container:t,panning:{enable:!0,eventTypes:["leftMouseDown","mouseWheel"]},mouseWheel:{enable:!0,modifiers:"ctrl",factor:1.1,maxScale:1.5,minScale:.5},highlighting:{magnetAdsorbed:{name:"stroke",args:{attrs:{fill:"#fff",storke:"#31D0C6",strokeWidth:4}}}},connecting:{snap:!0,allowBlank:!0,allowLoop:!1,highlight:!0,connectionPoint:"anchor",anchor:"center",validateMagnet:function(){return!0},createEdge:function(){return e.createEdge({shape:"tjrf-edge",attrs:{line:{strokeDasharray:"5 5",targetMarker:{name:"block",width:12,height:8}}},zIndex:-1})}},selecting:{enable:!0,multiple:!0,rubberEdge:!0,rubberNode:!0,modifiers:"shift",rubberband:!0},keyboard:!0,clipboard:!0,history:!0});return e},$=z,W=n("d4ec"),P=n("bee2"),T=(n("e9c4"),n("bf19"),function(){function t(e){Object(W["a"])(this,t),this.vm=e}return Object(P["a"])(t,[{key:"zoomFn",value:function(t){var e=this.vm;e.graph.zoom(t)}},{key:"centerFn",value:function(){var t=this.vm,e=t.graph.zoom();e>1?t.graph.zoom(-1*e):t.graph.zoom(e),t.graph.centerContent()}},{key:"startFn",value:function(t,e,n){var o=this.vm;o.timer&&clearTimeout(o.timer),o.init(t||e),o.showNodeStatus(Object.assign([],n)),o.graph.centerContent()}},{key:"saveFn",value:function(){var t=this.vm;localStorage.setItem("x6JSON",JSON.stringify(t.graph.toJSON({diff:!0})))}},{key:"loadFn",value:function(){var t=this.vm;t.timer&&clearTimeout(t.timer);var e=JSON.parse(localStorage.getItem("x6JSON"));t.startFn(e.cells)}},{key:"lockFn",value:function(){var t=this.vm;t.isLock=!t.isLock,t.isLock?(t.graph.enablePanning(),t.graph.enableKeyboard()):(t.graph.disablePanning(),t.graph.disableKeyboard())}}]),t}()),L=T,J=[[{id:"1",status:"running"},{id:"2",status:"default"},{id:"3",status:"default"},{id:"4",status:"default"}],[{id:"1",status:"success"},{id:"2",status:"running"},{id:"3",status:"default"},{id:"4",status:"default"}],[{id:"1",status:"success"},{id:"2",status:"success"},{id:"3",status:"running"},{id:"4",status:"running"}],[{id:"1",status:"success"},{id:"2",status:"success"},{id:"3",status:"success"},{id:"4",status:"failed"}]],K={name:"App",components:{MenuBar:g,Drawer:M},data:function(){return{container:null,graph:"",timer:"",isLock:!1,showContextMenu:!1,funcs:{}}},mounted:function(){this.initGraph(),this.keyBindFn(),this.startFn()},methods:{getNodeById:function(t){return this.graph.getCellById(t)},hideFn:function(){this.showContextMenu=!1},initGraph:function(){var t=document.getElementById("draw-cot"),e=$(t);this.container=t,this.graph=e,I(e,this);var n=new L(this);this.funcs=n},showNodeStatus:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:o=t.shift(),o&&o.forEach((function(t){var n=t.id,o=t.status,i=e.graph.getCellById(n),r=i.getData();i.setData(Object(a["a"])(Object(a["a"])({},r),{},{status:o}))})),e.timer=setTimeout((function(){e.showNodeStatus(t)}),300);case 3:case"end":return n.stop()}}),n)})))()},init:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=[];e.forEach((function(e){"tjrf-edge"===e.shape?n.push(t.graph.createEdge(e)):(delete e.component,n.push(t.graph.createNode(e).attr({label:{text:e.data.label}})))})),this.graph.resetCells(n)},zoomFn:function(t){this.funcs.zoomFn(t)},centerFn:function(){this.funcs.centerFn()},startFn:function(t){this.funcs.startFn(t,c,J)},createMenuFn:function(){},keyBindFn:function(){var t=this;this.graph.bindKey(["meta+c","ctrl+c"],(function(){var e=t.graph.getSelectedCells();return e.length&&t.graph.copy(e),!1})),this.graph.bindKey(["meta+x","ctrl+x"],(function(){var e=t.graph.getSelectedCells();return e.length&&t.graph.cut(e),!1})),this.graph.bindKey(["meta+v","ctrl+v"],(function(){if(!t.graph.isClipboardEmpty()){var e=t.graph.paste({offset:32});t.graph.cleanSelection(),t.graph.select(e)}return!1})),this.graph.bindKey(["meta+z","ctrl+z"],(function(){return t.graph.history.canUndo()&&t.graph.history.undo(),!1}))},saveFn:function(){this.funcs.saveFn()},loadFn:function(){this.funcs.loadFn()},lockFn:function(){this.funcs.lockFn()},contextMenuFn:function(t,e){switch(t){case"remove":"edge"==e.type?this.graph.removeEdge(e.item.id):"node"==e.type&&this.graph.removeNode(e.item.id);break;case"source":break}this.showContextMenu=!1},showDrawerFn:function(){this.$refs.drawer.visible=!this.$refs.drawer.visible},addNode:function(t){var e=this.graph.pageToLocal(t.x,t.y);this.graph.addNode(Object.assign({},t,e))}}},A=K,R=(n("c783"),Object(p["a"])(A,i,r,!1,null,"1673da48",null)),G=R.exports,V=n("5c96"),X=n.n(V);n("0fae");o["default"].use(X.a),o["default"].config.productionTip=!1,new o["default"]({render:function(t){return t(G)}}).$mount("#app")},"718b":function(t,e,n){"use strict";n("1d6d")},c783:function(t,e,n){"use strict";n("4fda")},d4d9:function(t,e,n){t.exports=n.p+"assets/img/arrow.c5f24c13.svg"},e347:function(t,e,n){"use strict";n("5574")}});