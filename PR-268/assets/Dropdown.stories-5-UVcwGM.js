var u=Object.defineProperty;var e=(i,s)=>u(i,"name",{value:s,configurable:!0});import{n as d}from"./rolldown-runtime-CzYk_CEw.js";import{t as h}from"./react-HNhQAnN4.js";import{t as b}from"./jsx-runtime-Br4tQxt1.js";import{n as l,t as x}from"./src-BRZ9K8zd.js";var n,t,m,_,o,g;function f(){return(f=d((()=>{n=h(),x(),t=b(),m=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],_={title:"Data Display/Dropdown",component:l,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}},isFocusable:{control:{type:"boolean"}}},render:e(function(s){const[a,c]=(0,n.useState)(!1),p=(0,n.useRef)(null);return(0,t.jsxs)("div",{style:{height:200,padding:16},children:[(0,t.jsxs)("button",{onClick:e(()=>c(!a),"onClick"),ref:p,style:{marginBottom:12},type:"button",children:[a?"Close":"Open"," dropdown"]}),(0,t.jsx)(l,{...s,anchorRef:p,isOpen:a,onClose:e(()=>c(!1),"onClose"),children:m.map(r=>(0,t.jsx)(l.Option,{isDisabled:r.disabled,onClick:e(()=>console.log(`${r.text} clicked`),"onClick"),children:r.text},r.value))})]})},"Render")},o={args:{anchorRef:(0,n.createRef)(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1}},g=["Default"],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  }
}`,...o.parameters?.docs?.source}}}})))()}e(f,"init_Dropdown_stories");f();export{o as Default,g as __namedExportsOrder,_ as default};
