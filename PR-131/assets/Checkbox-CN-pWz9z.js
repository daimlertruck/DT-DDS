var h=Object.defineProperty;var i=(t,e)=>h(t,"name",{value:e,configurable:!0});import{j as r}from"./jsx-runtime-Cgz2XvFB.js";import{r as m}from"./index-CwbBKW39.js";import{I as b}from"./Icon-BrO18bYS.js";import{f as l,d as g}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const $=i((t,e,o)=>e?`
        border: none;
        background-color: ${o?t.palette.informative.light:t.palette.informative.default};
    `:` 
        border: 1px solid ${t.palette.informative.medium};
        background-color: ${o?t.palette.informative.light:t.palette.surface.contrast};
    `,"checkboxStyles"),w=l.label`
  display: flex;
  align-items: center;
  width: 100%;

  ${({theme:t,isChecked:e,isDisabled:o})=>`
    & > div {
      border-radius: ${t.shape.checkbox};
      ${$(t,e,o)}
    }
    cursor: ${o?"not-allowed":"pointer"};

    &:hover > div {
      ${!o&&!e&&`
         border: 1px solid ${t.palette.primary.default};
      `};
     }
  `}
`,v=l.div`
  height: 20px;
  min-height: 20px;
  width: 20px;
  min-width: 20px;
  position: relative;
  display: flex;
`,y=l.input`
  cursor: pointer;
  appearance: none;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;

  &:disabled {
    cursor: not-allowed;
  }
`,k=l.span`
  user-select: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  ${({theme:t,isDisabled:e})=>`
    padding-left: ${t.spacing.spacing_30};
    ${t.fontStyles.bodyMdRegular};
    color: ${e?t.palette.content.medium:t.palette.content.default};
  `}
`,T=m.forwardRef(({dataTestId:t="checkbox-id",onChange:e,children:o,isChecked:n=!1,isDisabled:a=!1,style:p,className:c,...d},s)=>{const u=g(),x=i(f=>{a||e==null||e(f)},"handleOnChangeTrigger");return r.jsxs(w,{className:c,"data-testid":t,isChecked:n,isDisabled:a,style:p,children:[r.jsxs(v,{children:[r.jsx(y,{checked:n,disabled:a,onChange:x,ref:s,type:"checkbox",...d}),n?r.jsx(b,{code:"check",color:u.palette.content.contrast,size:"medium"}):null]}),o?r.jsx(k,{isChecked:n,isDisabled:a,children:o}):null]})});export{T as C};
