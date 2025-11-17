import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{r as h}from"./index-CTjT7uj6.js";import{T as u,a as k,b as T}from"./Toggle.styled-DpiUy3ca.js";import"./emotion-styled.browser.esm-BMKZqQy6.js";const p=({dataTestId:s,label:r,isDisabled:t=!1,isChecked:c=!1,onClick:a})=>{const l=s??"toggle",m=`${l}-checkbox-id`,f=o=>{t||a(o)},x=o=>{t||o.key==="Enter"&&(o.preventDefault(),a(o))};return e.jsxs(u,{"data-testid":l,hasLabel:!!r,onClick:f,onKeyDown:x,children:[e.jsx(k,{checked:c,disabled:t,id:m,type:"checkbox"}),e.jsx(T,{}),e.jsx("span",{children:r})]})},j=s=>{const[r,t]=h.useState(!1),c=()=>{t(a=>!a)};return e.jsx(p,{...s,isChecked:r,onClick:c})},S={title:"Data Display/Toggle",component:p,argTypes:{},render:({...s})=>e.jsx(j,{...s})},n={args:{isDisabled:!1,label:"Toggle"}};var d,i,g;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    isDisabled: false,
    label: 'Toggle'
  }
}`,...(g=(i=n.parameters)==null?void 0:i.docs)==null?void 0:g.source}}};const E=["Default"];export{n as Default,E as __namedExportsOrder,S as default};
