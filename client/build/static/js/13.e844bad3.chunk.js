(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[13],{265:function(e,t,r){"use strict";r.d(t,"e",(function(){return i})),r.d(t,"c",(function(){return u})),r.d(t,"d",(function(){return l})),r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return f})),r.d(t,"f",(function(){return d}));var a=r(51),n=r.n(a),c=r(74),o=r(57),s=r.n(o),i=function(){var e=Object(c.a)(n.a.mark((function e(t){var r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("/api/users/".concat(t)).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),u=function(){var e=Object(c.a)(n.a.mark((function e(t){var r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("/api/users/".concat(t,"/projects")).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),l=function(){var e=Object(c.a)(n.a.mark((function e(t){var r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("/api/users/".concat(t,"/tickets")).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),p=function(){var e=Object(c.a)(n.a.mark((function e(){var t;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("/api/users").then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),f=function(){var e=Object(c.a)(n.a.mark((function e(t){var r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("/api/users/user/".concat(t)).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),d=function(){var e=Object(c.a)(n.a.mark((function e(t,r){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.patch("/api/users/user/".concat(t),r).then((function(e){return e})).catch((function(e){throw console.log(e.response),e}));case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()},266:function(e,t,r){"use strict";r(0);var a=r(240),n=r(71),c=r(2),o=Object(a.a)((function(e){return{span:{borderRadius:"3px",backgroundColor:"#00adb5",boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",padding:".4rem"}}}));t.a=function(e){var t=e.text,r=o();return Object(c.jsx)(n.a,{variant:"h3",component:"span",className:r.span,children:t})}},350:function(e,t,r){"use strict";r.r(t);var a=r(44),n=r(15),c=r(26),o=r(0),s=r.n(o),i=r(1),u=r(3),l=(r(4),r(5)),p=r(201),f=r(6),d=o.forwardRef((function(e,t){var r=e.classes,a=e.className,n=e.raised,c=void 0!==n&&n,s=Object(u.a)(e,["classes","className","raised"]);return o.createElement(p.a,Object(i.a)({className:Object(l.a)(r.root,a),elevation:c?8:1,ref:t},s))})),m=Object(f.a)({root:{overflow:"hidden"}},{name:"MuiCard"})(d),b=o.forwardRef((function(e,t){var r=e.disableSpacing,a=void 0!==r&&r,n=e.classes,c=e.className,s=Object(u.a)(e,["disableSpacing","classes","className"]);return o.createElement("div",Object(i.a)({className:Object(l.a)(n.root,c,!a&&n.spacing),ref:t},s))})),h=Object(f.a)({root:{display:"flex",alignItems:"center",padding:8},spacing:{"& > :not(:first-child)":{marginLeft:8}}},{name:"MuiCardActions"})(b),j=o.forwardRef((function(e,t){var r=e.classes,a=e.className,n=e.component,c=void 0===n?"div":n,s=Object(u.a)(e,["classes","className","component"]);return o.createElement(c,Object(i.a)({className:Object(l.a)(r.root,a),ref:t},s))})),g=Object(f.a)({root:{padding:16,"&:last-child":{paddingBottom:24}}},{name:"MuiCardContent"})(j),x=r(245),v=r(354),O=r(71),w=r(7),y=o.forwardRef((function(e,t){var r=e.classes,a=e.className,n=e.color,c=void 0===n?"inherit":n,s=e.component,p=void 0===s?"span":s,f=e.fontSize,d=void 0===f?"default":f,m=Object(u.a)(e,["classes","className","color","component","fontSize"]);return o.createElement(p,Object(i.a)({className:Object(l.a)("material-icons",r.root,a,"inherit"!==c&&r["color".concat(Object(w.a)(c))],"default"!==d&&r["fontSize".concat(Object(w.a)(d))]),"aria-hidden":!0,ref:t},m))}));y.muiName="Icon";var S=Object(f.a)((function(e){return{root:{userSelect:"none",fontSize:e.typography.pxToRem(24),width:"1em",height:"1em",overflow:"hidden",flexShrink:0},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorAction:{color:e.palette.action.active},colorError:{color:e.palette.error.main},colorDisabled:{color:e.palette.action.disabled},fontSizeInherit:{fontSize:"inherit"},fontSizeSmall:{fontSize:e.typography.pxToRem(20)},fontSizeLarge:{fontSize:e.typography.pxToRem(36)}}}),{name:"MuiIcon"})(y),N=r(240),k=r(266),C=r(265),z=r(42),R=r(58),E=r(2),T=Object(N.a)((function(e){return{card:{boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",maxWidth:600,margin:"auto",textAlign:"center",marginTop:e.spacing(5),paddingBottom:e.spacing(2)},title:{margin:e.spacing(2)},error:{verticalAlign:"middle"},textField:{marginLeft:e.spacing(1),marginRight:e.spacing(1),width:300},submit:{margin:"auto",marginBottom:e.spacing(2)}}}));t.default=function(e){var t=e.match,r=T(),i=Object(o.useContext)(z.a),u=Object(c.a)(i,2)[1],l=Object(o.useState)({name:"",password:"",email:"",open:!1,error:""}),p=Object(c.a)(l,2),f=p[0],d=p[1],b={snackbarText:"",snackbarSeverity:""};Object(o.useEffect)((function(){Object(C.b)(t.params.userId).then((function(e){var t=e.data.user,r={name:t.name,email:t.email,password:""};d(r)}))}),[t.params.userId]);var j=function(e){return function(t){d(Object(n.a)(Object(n.a)({},f),{},Object(a.a)({},e,t.target.value)))}};return Object(E.jsxs)(s.a.Fragment,{children:[Object(E.jsx)(k.a,{text:"My Profile"}),Object(E.jsxs)(m,{className:r.card,children:[Object(E.jsxs)(g,{children:[Object(E.jsx)(O.a,{variant:"h4",className:r.title,children:"Edit Profile"}),Object(E.jsx)(v.a,{id:"name",label:"Name",className:r.textField,value:f.name,onChange:j("name"),margin:"normal"}),Object(E.jsx)("br",{}),Object(E.jsx)(v.a,{id:"email",type:"email",label:"Email",className:r.textField,value:f.email,onChange:j("email"),margin:"normal"}),Object(E.jsx)("br",{}),Object(E.jsx)(v.a,{id:"password",type:"password",label:"Password",className:r.textField,value:f.password,onChange:j("password"),margin:"normal"}),Object(E.jsx)("br",{})," ",f.error&&Object(E.jsxs)(O.a,{component:"p",color:"error",children:[Object(E.jsx)(S,{color:"error",className:r.error,children:"error"}),f.error]})]}),Object(E.jsx)(h,{children:Object(E.jsx)(x.a,{color:"primary",variant:"contained",onClick:function(){var e={name:f.name,password:f.password,email:f.email};Object(C.f)(t.params.userId,e).then((function(e){b.snackbarText="Successfully changed user role",b.snackbarSeverity="success"})).catch((function(e){b.snackbarText="Could not change users role. Try again later.",b.snackbarSeverity="error"})).finally((function(){u({type:R.d,payload:b})}))},className:r.submit,children:"Submit"})})]})]})}}}]);
//# sourceMappingURL=13.e844bad3.chunk.js.map