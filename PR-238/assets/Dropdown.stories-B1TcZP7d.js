var m=Object.defineProperty;var e=(i,r)=>m(i,"name",{value:r,configurable:!0});import{o as f}from"./rolldown-runtime-CzYk_CEw.js";import{t as u}from"./react-HNhQAnN4.js";import{t as d}from"./jsx-runtime-Br4tQxt1.js";import{t as n}from"./src-CDiFZEB_.js";var l=f(u()),o=d(),h=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],y={title:"Data Display/Dropdown",component:n,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}},isFocusable:{control:{type:"boolean"}}},render:e(function(r){const[s,c]=(0,l.useState)(!1),p=(0,l.useRef)(null);return(0,o.jsxs)("div",{style:{height:200,padding:16},children:[(0,o.jsxs)("button",{onClick:e(()=>c(!s),"onClick"),ref:p,style:{marginBottom:12},type:"button",children:[s?"Close":"Open"," dropdown"]}),(0,o.jsx)(n,{...r,anchorRef:p,isOpen:s,onClose:e(()=>c(!1),"onClose"),children:h.map(t=>(0,o.jsx)(n.Option,{isDisabled:t.disabled,onClick:e(()=>console.log(`${t.text} clicked`),"onClick"),children:t.text},t.value))})]})},"Render")},a={args:{anchorRef:(0,l.createRef)(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  }
}`,...a.parameters?.docs?.source}}};var _=["Default"];export{a as Default,_ as __namedExportsOrder,y as default};
