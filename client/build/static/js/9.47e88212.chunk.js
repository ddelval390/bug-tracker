(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[9],{265:function(e,t,n){"use strict";n.d(t,"e",(function(){return s})),n.d(t,"c",(function(){return u})),n.d(t,"d",(function(){return p})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return f})),n.d(t,"f",(function(){return d}));var r=n(51),a=n.n(r),c=n(74),o=n(57),i=n.n(o),s=function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/users/".concat(t)).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/users/".concat(t,"/projects"),{cancelToken:n}).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),p=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/users/".concat(t,"/tickets"),n).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),l=function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/users",{cancelToken:t}).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),f=function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/users/user/".concat(t)).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.patch("/api/users/user/".concat(t),n).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},266:function(e,t,n){"use strict";n(0);var r=n(240),a=n(71),c=n(2),o=Object(r.a)((function(e){return{span:{borderRadius:"3px",backgroundColor:"#00adb5",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",padding:".4rem"}}}));t.a=function(e){var t=e.text,n=o();return Object(c.jsx)(a.a,{variant:"h3",component:"span",className:n.span,children:t})}},267:function(e,t,n){"use strict";n.d(t,"a",(function(){return O}));var r=n(26),a=n(0),c=n(240),o=n(338),i=n(342),s=n(341),u=n(337),p=n(339),l=n(340),f=n(201),d=n(71),h=n(353),b=n(343),m=n(2),j=Object(c.a)({paper:{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"},hover:{"&:hover":{backgroundColor:"#0899ba !important"}},selected:{backgroundColor:"#607d8b !important"},span:{padding:"1rem"}});function O(e){var t=e.loading,n=e.selected,c=e.handleSelect,O=e.title,v=e.data,x=e.hover,y=e.dense,g=e.rowKey,w=e.tableHeight,k=e.emptyTableText;if(c||(c=function(){}),!g)throw new Error('Component prop "rowKey" is not defined');if(!w)throw new Error('Component prop "tableHeight" is not defined');var S=j(),C=Object(a.useState)(0),P=Object(r.a)(C,2),T=P[0],I=P[1],z=Object(a.useState)(25),E=Object(r.a)(z,2),N=E[0],K=E[1],A=JSON.parse(JSON.stringify(v));return A.forEach((function(e){return delete e._id})),Object(m.jsxs)(f.a,{className:S.paper,children:[Object(m.jsx)(d.a,{variant:"h4",component:"span",className:S.span,children:O}),Object(m.jsx)(u.a,{style:{minHeight:w,maxHeight:w},children:Object(m.jsxs)(o.a,{className:S.table,"aria-label":"simple table",size:y?"small":"medium",components:{},children:[Object(m.jsx)(p.a,{children:Object(m.jsx)(l.a,{children:A[0]&&Object.keys(A[0]).map((function(e,t){var n=e.charAt(0).toUpperCase()+e.slice(1);return 0===t?Object(m.jsx)(s.a,{children:n},e+" "+t):Object(m.jsx)(s.a,{align:"center",children:n},e+" "+t)}))})}),Object(m.jsxs)(i.a,{children:[A.slice(T*N,T*N+N).map((function(e,t){return Object(m.jsx)(l.a,{classes:{hover:S.hover,selected:S.selected},hover:x,onClick:function(e){c(e,v[t]._id)},selected:x&&(r=v[t]._id,n===r),children:Object.keys(e).map((function(t,n){return 0===n?Object(m.jsx)(s.a,{component:"th",scope:"row",children:e[t]},t+" "+n):Object(m.jsx)(s.a,{align:"center",children:e[t]},t+" "+n)}))},e[g]+" "+t);var r})),t&&Object(m.jsx)(l.a,{children:Object(m.jsx)(s.a,{align:"center",style:{border:"none"},children:Object(m.jsx)(b.a,{size:"8.5rem"})})}),!A.length&&!t&&Object(m.jsx)(l.a,{children:Object(m.jsx)(s.a,{align:"center",style:{border:"none"},children:Object(m.jsx)(d.a,{variant:"h4",className:S.span,children:k})})})]})]})}),Object(m.jsx)(h.a,{rowsPerPageOptions:[5,25,100],component:"div",count:A.length,rowsPerPage:N,page:T,onChangePage:function(e,t){I(t)},onChangeRowsPerPage:function(e){K(+e.target.value),I(0)}})]})}},274:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"d",(function(){return u})),n.d(t,"f",(function(){return p})),n.d(t,"b",(function(){return l})),n.d(t,"e",(function(){return f})),n.d(t,"g",(function(){return h})),n.d(t,"j",(function(){return j})),n.d(t,"h",(function(){return m})),n.d(t,"c",(function(){return b})),n.d(t,"i",(function(){return d}));var r=n(51),a=n.n(r),c=n(74),o=n(57),i=n.n(o),s=function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post("/api/projects",t).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.delete("/api/projects/".concat(t)).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/projects/".concat(t),{cancelToken:n}).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),l=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post("/api/projects/".concat(t,"/tickets"),n).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),f=function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.delete("/api/projects/ticket/".concat(t)).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post("/api/projects/".concat(t,"/team"),n).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),h=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.get("/api/projects/ticket/".concat(t),{cancelToken:n}).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),b=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.delete("/api/projects/ticket/".concat(n,"/comments/").concat(t)).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),m=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.post("/api/projects/ticket/".concat(t,"/comments"),n).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),j=function(){var e=Object(c.a)(a.a.mark((function e(t,n){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.patch("/api/projects/ticket/".concat(t),n).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()},317:function(e,t,n){"use strict";var r=n(37),a=n(1),c=(n(4),n(59));var o=function(e){var t=function(t){var n=e(t);return t.css?Object(a.a)({},Object(c.a)(n,e(Object(a.a)({theme:t.theme},t.css))),function(e,t){var n={};return Object.keys(e).forEach((function(r){-1===t.indexOf(r)&&(n[r]=e[r])})),n}(t.css,[e.filterProps])):n};return t.propTypes={},t.filterProps=["css"].concat(Object(r.a)(e.filterProps)),t};var i=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var r=function(e){return t.reduce((function(t,n){var r=n(e);return r?Object(c.a)(t,r):t}),{})};return r.propTypes={},r.filterProps=t.reduce((function(e,t){return e.concat(t.filterProps)}),[]),r},s=n(12),u=n(93);function p(e,t){return t&&"string"===typeof t?t.split(".").reduce((function(e,t){return e&&e[t]?e[t]:null}),e):null}var l=function(e){var t=e.prop,n=e.cssProperty,r=void 0===n?e.prop:n,a=e.themeKey,c=e.transform,o=function(e){if(null==e[t])return null;var n=e[t],o=p(e.theme,a)||{};return Object(u.a)(e,n,(function(e){var t;return"function"===typeof o?t=o(e):Array.isArray(o)?t=o[e]||e:(t=p(o,e)||e,c&&(t=c(t))),!1===r?t:Object(s.a)({},r,t)}))};return o.propTypes={},o.filterProps=[t],o};function f(e){return"number"!==typeof e?e:"".concat(e,"px solid")}var d=i(l({prop:"border",themeKey:"borders",transform:f}),l({prop:"borderTop",themeKey:"borders",transform:f}),l({prop:"borderRight",themeKey:"borders",transform:f}),l({prop:"borderBottom",themeKey:"borders",transform:f}),l({prop:"borderLeft",themeKey:"borders",transform:f}),l({prop:"borderColor",themeKey:"palette"}),l({prop:"borderRadius",themeKey:"shape"})),h=i(l({prop:"displayPrint",cssProperty:!1,transform:function(e){return{"@media print":{display:e}}}}),l({prop:"display"}),l({prop:"overflow"}),l({prop:"textOverflow"}),l({prop:"visibility"}),l({prop:"whiteSpace"})),b=i(l({prop:"flexBasis"}),l({prop:"flexDirection"}),l({prop:"flexWrap"}),l({prop:"justifyContent"}),l({prop:"alignItems"}),l({prop:"alignContent"}),l({prop:"order"}),l({prop:"flex"}),l({prop:"flexGrow"}),l({prop:"flexShrink"}),l({prop:"alignSelf"}),l({prop:"justifyItems"}),l({prop:"justifySelf"})),m=i(l({prop:"gridGap"}),l({prop:"gridColumnGap"}),l({prop:"gridRowGap"}),l({prop:"gridColumn"}),l({prop:"gridRow"}),l({prop:"gridAutoFlow"}),l({prop:"gridAutoColumns"}),l({prop:"gridAutoRows"}),l({prop:"gridTemplateColumns"}),l({prop:"gridTemplateRows"}),l({prop:"gridTemplateAreas"}),l({prop:"gridArea"})),j=i(l({prop:"position"}),l({prop:"zIndex",themeKey:"zIndex"}),l({prop:"top"}),l({prop:"right"}),l({prop:"bottom"}),l({prop:"left"})),O=i(l({prop:"color",themeKey:"palette"}),l({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette"})),v=l({prop:"boxShadow",themeKey:"shadows"});function x(e){return e<=1?"".concat(100*e,"%"):e}var y=l({prop:"width",transform:x}),g=l({prop:"maxWidth",transform:x}),w=l({prop:"minWidth",transform:x}),k=l({prop:"height",transform:x}),S=l({prop:"maxHeight",transform:x}),C=l({prop:"minHeight",transform:x}),P=(l({prop:"size",cssProperty:"width",transform:x}),l({prop:"size",cssProperty:"height",transform:x}),i(y,g,w,k,S,C,l({prop:"boxSizing"}))),T=n(263),I=i(l({prop:"fontFamily",themeKey:"typography"}),l({prop:"fontSize",themeKey:"typography"}),l({prop:"fontStyle",themeKey:"typography"}),l({prop:"fontWeight",themeKey:"typography"}),l({prop:"letterSpacing"}),l({prop:"lineHeight"}),l({prop:"textAlign"})),z=n(3),E=n(0),N=n.n(E),K=n(5),A=n(48),B=n.n(A),H=n(203);function R(e,t){var n={};return Object.keys(e).forEach((function(r){-1===t.indexOf(r)&&(n[r]=e[r])})),n}var F=n(47),M=function(e){var t=function(e){return function(t){var n,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=r.name,o=Object(z.a)(r,["name"]),i=c,s="function"===typeof t?function(e){return{root:function(n){return t(Object(a.a)({theme:e},n))}}}:{root:t},u=Object(H.a)(s,Object(a.a)({Component:e,name:c||e.displayName,classNamePrefix:i},o));t.filterProps&&(n=t.filterProps,delete t.filterProps),t.propTypes&&(t.propTypes,delete t.propTypes);var p=N.a.forwardRef((function(t,r){var c=t.children,o=t.className,i=t.clone,s=t.component,p=Object(z.a)(t,["children","className","clone","component"]),l=u(t),f=Object(K.a)(l.root,o),d=p;if(n&&(d=R(d,n)),i)return N.a.cloneElement(c,Object(a.a)({className:Object(K.a)(c.props.className,f)},d));if("function"===typeof c)return c(Object(a.a)({className:f},d));var h=s||e;return N.a.createElement(h,Object(a.a)({ref:r,className:f},d),c)}));return B()(p,e),p}}(e);return function(e,n){return t(e,Object(a.a)({defaultTheme:F.a},n))}},L=o(i(d,h,b,m,j,O,v,P,T.b,I)),W=M("div")(L,{name:"MuiBox"});t.a=W},350:function(e,t,n){"use strict";n.r(t);var r=n(15),a=n(294),c=n(91);var o=n(51),i=n.n(o),s=n(74),u=n(26),p=n(0),l=n(240),f=n(298),d=n(201),h=n(267),b=n(245),m=n(351),j=n(355),O=n(274),v=n(265),x=n(42),y=n(266),g=n(247),w=n(249),k=n(251),S=n(1),C=n(3),P=(n(4),n(5)),T=n(46),I=n(89),z=n(269),E=n(6),N=n(243),K=p.forwardRef((function(e,t){var n=e.autoFocus,r=e.checked,a=e.checkedIcon,c=e.classes,o=e.className,i=e.defaultChecked,s=e.disabled,u=e.icon,l=e.id,f=e.inputProps,d=e.inputRef,h=e.name,b=e.onBlur,m=e.onChange,j=e.onFocus,O=e.readOnly,v=e.required,x=e.tabIndex,y=e.type,g=e.value,w=Object(C.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),k=Object(I.a)({controlled:r,default:Boolean(i),name:"SwitchBase",state:"checked"}),E=Object(T.a)(k,2),K=E[0],A=E[1],B=Object(z.a)(),H=s;B&&"undefined"===typeof H&&(H=B.disabled);var R="checkbox"===y||"radio"===y;return p.createElement(N.a,Object(S.a)({component:"span",className:Object(P.a)(c.root,o,K&&c.checked,H&&c.disabled),disabled:H,tabIndex:null,role:void 0,onFocus:function(e){j&&j(e),B&&B.onFocus&&B.onFocus(e)},onBlur:function(e){b&&b(e),B&&B.onBlur&&B.onBlur(e)},ref:t},w),p.createElement("input",Object(S.a)({autoFocus:n,checked:r,defaultChecked:i,className:c.input,disabled:H,id:R&&l,name:h,onChange:function(e){var t=e.target.checked;A(t),m&&m(e,t)},readOnly:O,ref:d,required:v,tabIndex:x,type:y,value:g},f)),K?a:u)})),A=Object(E.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(K),B=n(75),H=Object(B.a)(p.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),R=Object(B.a)(p.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),F=n(13),M=Object(B.a)(p.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),L=n(7),W=p.createElement(R,null),G=p.createElement(H,null),J=p.createElement(M,null),V=p.forwardRef((function(e,t){var n=e.checkedIcon,r=void 0===n?W:n,a=e.classes,c=e.color,o=void 0===c?"secondary":c,i=e.icon,s=void 0===i?G:i,u=e.indeterminate,l=void 0!==u&&u,f=e.indeterminateIcon,d=void 0===f?J:f,h=e.inputProps,b=e.size,m=void 0===b?"medium":b,j=Object(C.a)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]),O=l?d:s,v=l?d:r;return p.createElement(A,Object(S.a)({type:"checkbox",classes:{root:Object(P.a)(a.root,a["color".concat(Object(L.a)(o))],l&&a.indeterminate),checked:a.checked,disabled:a.disabled},color:o,inputProps:Object(S.a)({"data-indeterminate":l},h),icon:p.cloneElement(O,{fontSize:void 0===O.props.fontSize&&"small"===m?m:O.props.fontSize}),checkedIcon:p.cloneElement(v,{fontSize:void 0===v.props.fontSize&&"small"===m?m:v.props.fontSize}),ref:t},j))})),$=Object(E.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(F.c)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(F.c)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(V),_=n(317),q=n(343),D=n(71),U=n(58),Q=n(57),X=n.n(Q),Y=n(2),Z=Object(l.a)((function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary},link:{color:"inherit",textDecoration:"none"},formControl:{display:"inline-block",margin:e.spacing(1),minWidth:100},button:{}}}));t.default=function(){var e=Z(),t=Object(p.useState)(""),n=Object(u.a)(t,2),o=n[0],l=n[1],S=Object(p.useState)([]),C=Object(u.a)(S,2),P=C[0],T=C[1],I=Object(p.useContext)(x.a),z=Object(u.a)(I,2),E=z[0],N=z[1],K=Object(p.useState)([]),A=Object(u.a)(K,2),B=A[0],H=A[1],R=Object(p.useState)([]),F=Object(u.a)(R,2),M=F[0],L=F[1],W=Object(p.useState)([]),G=Object(u.a)(W,2),J=G[0],V=G[1],Q=Object(p.useState)([]),ee=Object(u.a)(Q,2),te=ee[0],ne=ee[1],re=Object(p.useState)(!1),ae=Object(u.a)(re,2),ce=ae[0],oe=ae[1],ie=Object(p.useState)(!1),se=Object(u.a)(ie,2),ue=se[0],pe=se[1],le=Object(p.useState)(!1),fe=Object(u.a)(le,2),de=fe[0],he=fe[1];Object(p.useEffect)((function(){var e=X.a.CancelToken.source();return pe(!0),function(){var t=Object(s.a)(i.a.mark((function t(){var n,r;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(v.c)(E.userId,e.token).then((function(e){return e.data.projects}));case 2:return n=t.sent,t.next=5,Object(v.a)(e.token).then((function(e){return e.data.userList}));case 5:r=t.sent,T(n),ne(r),pe(!1);case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()(),function(){e.cancel()}}),[]),Object(p.useEffect)((function(){o&&(he(!0),H([]),Object(O.f)(o).then((function(e){he(!1);var t=e.data.project;H(t.team)})).catch((function(e){return console.log(e)})))}),[o]),Object(p.useEffect)((function(){if(ce){var e,t=[],n=function(e,t){var n;if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=Object(c.a)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,s=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw o}}}}(B);try{for(n.s();!(e=n.n()).done;){var r=e.value;t.push(r._id)}}catch(a){n.e(a)}finally{n.f()}Object(O.i)(o,t).then((function(e){U.e.snackbarText="Successfully updated the team",U.e.snackbarSeverity="success"})).catch((function(e){U.e.snackbarText="Could not update the team. Try again later.",U.e.snackbarSeverity="error"})).finally((function(){N({type:U.d,snackbarPayload:U.e})})),oe(!1)}}),[ce]);var be=function(e){return function(){var t=M.findIndex((function(t){return t.email===e.email})),n=Object(a.a)(M);-1===t?n.push(e):n.splice(t,1),L(Object(a.a)(n))}};return Object(Y.jsx)("div",{className:e.root,children:Object(Y.jsxs)(f.a,{container:!0,spacing:3,children:[Object(Y.jsx)(f.a,{item:!0,xs:12,children:Object(Y.jsx)(y.a,{text:"Manage Project Teams"})}),Object(Y.jsx)(f.a,{item:!0,md:8,xs:12,children:Object(Y.jsx)(h.a,{emptyTableText:"There are no projects to display",tableHeight:"70vh",loading:ue,selected:o,handleSelect:function(e,t){l(o===t?"":t)},title:"Projects",data:P,hover:!0,dense:!1,rowKey:"title"})}),Object(Y.jsx)(f.a,{item:!0,md:4,xs:12,children:Object(Y.jsxs)(_.a,{component:d.a,children:[Object(Y.jsx)(m.a,{disabled:!o,multiple:!0,limitTags:2,disableListWrap:!0,disableCloseOnSelect:!0,id:"tags-outlined",options:te,getOptionLabel:function(e){return Object(Y.jsxs)(p.Fragment,{children:[e.name,"\xa0\xa0\xa0",Object(Y.jsx)("em",{children:e.email})]})},filterOptions:function(e,t){return e.filter((function(e){return-1===B.findIndex((function(t){return e.email===t.email}))}))},filterSelectedOptions:!0,value:J,getOptionSelected:function(e,t){return e.email===t.email},onChange:function(e,t){return n=t,void V(Object(a.a)(n));var n},renderInput:function(e){return Object(Y.jsx)(j.a,Object(r.a)(Object(r.a)({},e),{},{variant:"outlined",label:"Add a team member",placeholder:"Search for new member"}))}}),Object(Y.jsxs)(g.a,{width:1,className:e.root,style:{minHeight:"30vh"},children:[de&&Object(Y.jsx)(w.a,{style:{paddingLeft:"8rem"},children:Object(Y.jsx)(q.a,{size:"10rem"})}),B.length?B.map((function(e){var t="checkbox-list-secondary-label-".concat(e.name);return Object(Y.jsxs)(w.a,{button:!0,onClick:be(e),children:[Object(Y.jsx)(k.a,{id:t,primary:"".concat(e.name),secondary:"".concat(e.email)}),Object(Y.jsx)($,{edge:"start",checked:-1!==M.findIndex((function(t){return t.email===e.email}))})]},e.email)})):Object(Y.jsx)(w.a,{children:Object(Y.jsxs)(D.a,{variant:"h4",className:e.span,children:[!de&&o&&"This team is empty",!de&&!o&&"Select a project"]})})]}),Object(Y.jsx)(b.a,{onClick:function(){var e=Object(a.a)(M),t=Object(a.a)(B);e.forEach((function(e){var n=t.findIndex((function(t){return t.email===e.email}));t.splice(n,1)})),H(Object(a.a)(t)),L([]),oe(!0)},color:"primary",children:"Remove Members"}),Object(Y.jsx)(b.a,{onClick:function(){var e=[].concat(Object(a.a)(B),Object(a.a)(J));H(Object(a.a)(e)),V([]),oe(!0)},color:"primary",children:"Add Members"})]})})]})})}}}]);
//# sourceMappingURL=9.47e88212.chunk.js.map