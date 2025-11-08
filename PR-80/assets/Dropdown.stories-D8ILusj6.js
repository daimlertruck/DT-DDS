import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{r as p}from"./index-CTjT7uj6.js";import{D as r}from"./Dropdown-CLCiM2ZX.js";import"./index-D9dZuxfj.js";import"./index-nqWPZ4M1.js";import"./emotion-react.browser.esm-Bwsi5GpN.js";import"./emotion-styled.browser.esm-DBghOYGd.js";import"./index-BAMY2Nnw.js";import"./iframe-hK0XeZa0.js";import"./z-index-DWgeqfVW.js";import"./index-XjDa9cP3.js";import"./useClickOutside-CA5UtDJB.js";const O=[{text:"Option 1",value:"1"},{text:"Option 2",value:"2"},{text:"Option 3 with a large text message label",value:"3"},{text:"Option 4",value:"4",disabled:!0}],W={title:"Data Display/Dropdown",component:r,argTypes:{placement:{options:["bottom","top","right","left"],control:{type:"select"}},as:{options:["div","ul"],control:{type:"select"}},matchWidth:{control:{type:"boolean"}},offsetX:{control:{type:"number"}},offsetY:{control:{type:"number"}}},render:({options:c,as:u="ul",matchWidth:d=!0,offsetX:f,offsetY:h,...x})=>{const s=p.useRef(null),[n,a]=p.useState(!1);return e.jsxs("div",{style:{height:320,padding:16},children:[e.jsxs("button",{onClick:()=>a(t=>!t),ref:s,style:{marginBottom:12},type:"button",children:[n?"Close":"Open"," dropdown"]}),e.jsx(r,{...x,anchorRef:s,as:u,isOpen:n,matchWidth:d,offsetX:f,offsetY:h,onClose:()=>a(!1),children:c.map(t=>e.jsx(r.Option,{isDisabled:t.disabled,children:t.text??t.value},t.value))})]})}},o={args:{options:O,as:"ul",matchWidth:!0,offsetX:0,offsetY:4,placement:"bottom"}};var l,i,m;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    options: OPTIONS,
    as: 'ul',
    matchWidth: true,
    offsetX: 0,
    offsetY: 4,
    placement: 'bottom'
  }
}`,...(m=(i=o.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};const X=["Default"];export{o as Default,X as __namedExportsOrder,W as default};
