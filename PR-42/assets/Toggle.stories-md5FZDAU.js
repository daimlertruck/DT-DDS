import{j as t}from"./jsx-runtime-DMAvRu52.js";import{r as h}from"./index-Dl6G-zuu.js";import{T as u,a as k,b as T}from"./Toggle.styled-DMwRNHKQ.js";import"./emotion-styled.browser.esm-Dv69Fly8.js";const p=({dataTestId:s,label:r,isDisabled:e=!1,isChecked:c=!1,onClick:a})=>{const l=s??"toggle",m=`${l}-checkbox-id`,x=o=>{e||a(o)},f=o=>{e||o.key==="Enter"&&(o.preventDefault(),a(o))};return t.jsxs(u,{"data-testid":l,hasLabel:!!r,onClick:x,onKeyDown:f,tabIndex:e?-1:0,children:[t.jsx(k,{checked:c,disabled:e,id:m,type:"checkbox"}),t.jsx(T,{}),t.jsx("span",{children:r})]})},j=s=>{const[r,e]=h.useState(!1),c=()=>{e(a=>!a)};return t.jsx(p,{...s,isChecked:r,onClick:c})},D={title:"Data Display/Toggle",component:p,argTypes:{},render:({...s})=>t.jsx(j,{...s})},n={args:{isDisabled:!1,label:"Toggle"}};var d,g,i;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    isDisabled: false,
    label: 'Toggle'
  }
}`,...(i=(g=n.parameters)==null?void 0:g.docs)==null?void 0:i.source}}};const E=["Default"];export{n as Default,E as __namedExportsOrder,D as default};
