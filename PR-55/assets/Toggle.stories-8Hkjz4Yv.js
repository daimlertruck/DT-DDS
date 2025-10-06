import{j as e}from"./jsx-runtime-CB_V9I5Y.js";import{r as x}from"./index-CTjT7uj6.js";import{T as u,a as k,b as T}from"./Toggle.styled-D2TA0Du5.js";import"./emotion-styled.browser.esm-DBghOYGd.js";const m=({dataTestId:s,label:r,isDisabled:t=!1,isChecked:n=!1,onClick:a})=>{const c=s??"toggle",d=`${c}-checkbox-id`,f=o=>{t||a(o)},h=o=>{t||o.key==="Enter"&&(o.preventDefault(),a(o))};return e.jsxs(u,{"data-testid":c,hasLabel:!!r,onClick:f,onKeyDown:h,children:[e.jsx(k,{checked:n,disabled:t,id:d,type:"checkbox"}),e.jsx(T,{htmlFor:d}),e.jsx("span",{children:r})]})},j=s=>{const[r,t]=x.useState(!1),n=()=>{t(a=>!a)};return e.jsx(m,{...s,isChecked:r,onClick:n})},S={title:"Data Display/Toggle",component:m,argTypes:{},render:({...s})=>e.jsx(j,{...s})},l={args:{isDisabled:!1,label:"Toggle"}};var i,g,p;l.parameters={...l.parameters,docs:{...(i=l.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    isDisabled: false,
    label: 'Toggle'
  }
}`,...(p=(g=l.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const E=["Default"];export{l as Default,E as __namedExportsOrder,S as default};
