var b=Object.defineProperty;var e=(s,n)=>b(s,"name",{value:n,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{r as m}from"./index-CwbBKW39.js";import{D as a}from"./Dropdown-t52-uNZ8.js";import"./typography-B3nKKPHm.js";import"./index-BEXvjAow.js";import"./emotion-react.browser.esm-DSneuyqi.js";import"./emotion-styled.browser.esm-Cgg3GKEJ.js";import"./index-6Tx4pmSd.js";import"./iframe-z363bPWB.js";import"./z-index-KGn0H6PT.js";import"./index-DV-VXEUn.js";import"./useClickOutside-Cp2kQToC.js";const g=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],I={title:"Data Display/Dropdown",component:a,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},as:{options:["div","ul"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}}},render:e(({options:s,as:n="ul",matchWidth:f=!0,offsetX:h,offsetY:x,...O})=>{const p=m.useRef(null),[l,i]=m.useState(!1);return o.jsxs("div",{style:{height:320,padding:16},children:[o.jsxs("button",{onClick:e(()=>i(t=>!t),"onClick"),ref:p,style:{marginBottom:12},type:"button",children:[l?"Close":"Open"," dropdown"]}),o.jsx(a,{...O,anchorRef:p,as:n,isOpen:l,matchWidth:f,offsetX:h,offsetY:x,onClose:e(()=>i(!1),"onClose"),children:s.map(t=>o.jsx(a.Option,{isDisabled:t.disabled,children:t.text??t.value},t.value))})]})},"render")},r={args:{options:g,as:"ul",matchWidth:!0,offsetX:0,offsetY:4,placement:"bottom"}};var c,u,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    options: OPTIONS,
    as: 'ul',
    matchWidth: true,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom'
  }
}`,...(d=(u=r.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const N=["Default"];export{r as Default,N as __namedExportsOrder,I as default};
