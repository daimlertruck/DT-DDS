var u=Object.defineProperty;var e=(i,r)=>u(i,"name",{value:r,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{r as l}from"./index-CwbBKW39.js";import{D as n}from"./Dropdown-CsJLKLAD.js";import"./typography-B3nKKPHm.js";import"./index-D5qEJHeZ.js";import"./emotion-react.browser.esm-BzOLYAw5.js";import"./emotion-styled.browser.esm-CIRWz9XU.js";import"./index-6Tx4pmSd.js";import"./iframe-rxhkzly-.js";import"./z-index-C44GOntP.js";import"./index-DV-VXEUn.js";import"./useClickOutside-Cp2kQToC.js";const h=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],F={title:"Data Display/Dropdown",component:n,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}},isFocusable:{control:{type:"boolean"}}},render:e(function(r){const[a,c]=l.useState(!1),p=l.useRef(null);return o.jsxs("div",{style:{height:200,padding:16},children:[o.jsxs("button",{onClick:e(()=>c(!a),"onClick"),ref:p,style:{marginBottom:12},type:"button",children:[a?"Close":"Open"," dropdown"]}),o.jsx(n,{...r,anchorRef:p,isOpen:a,onClose:e(()=>c(!1),"onClose"),children:h.map(t=>o.jsx(n.Option,{isDisabled:t.disabled,onClick:e(()=>console.log(`${t.text} clicked`),"onClick"),children:t.text},t.value))})]})},"Render")},s={args:{anchorRef:l.createRef(),as:"ul",matchWidth:!1,offsetX:0,offsetY:4,placement:"bottom",isFocusable:!1}};var m,f,d;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    anchorRef: createRef<HTMLButtonElement>(),
    as: 'ul',
    matchWidth: false,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom',
    isFocusable: false
  }
}`,...(d=(f=s.parameters)==null?void 0:f.docs)==null?void 0:d.source}}};const S=["Default"];export{s as Default,S as __namedExportsOrder,F as default};
