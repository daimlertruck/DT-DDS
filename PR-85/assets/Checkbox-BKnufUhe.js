import{j as r}from"./jsx-runtime-CB_V9I5Y.js";import{I as u}from"./Icon-w916x_k_.js";import{r as f}from"./index-CTjT7uj6.js";import{f as n,d as h}from"./emotion-styled.browser.esm-DBghOYGd.js";const b=(t,o,e)=>o?`
        border: none;
        background-color: ${e?t.palette.primary.light:t.palette.accent.default};
    `:` 
        border: 1px solid ${t.palette.border.default};
        background-color: ${t.palette.surface.contrast};
    `,g=n.label`
  display: flex;
  align-items: center;
  width: 100%;

  ${({theme:t,isChecked:o,isDisabled:e})=>`
    & > div {
      border-radius: ${t.shape.checkbox};
      ${b(t,o,e)}
    }
    cursor: ${e?"not-allowed":"pointer"};

    &:hover > div {
      ${!e&&!o&&`
         background-color: ${t.palette.primary.light};
         border: 1px solid ${t.palette.primary.default};
      `};
     }
  `}
`,$=n.div`
  height: 24px;
  min-height: 24px;
  width: 24px;
  min-width: 24px;
  position: relative;
  display: flex;
`,y=n.input`
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
`,w=n.span`
  user-select: none;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;

  ${({theme:t,isDisabled:o})=>`
    padding-left: ${t.spacing.spacing_30};
    ${t.fontStyles.bodyMdRegular};
    color: ${o?t.palette.content.light:t.palette.content.default};
  `}
`,S=f.forwardRef(({dataTestId:t="checkbox-id",onChange:o,children:e,isChecked:l=!1,isDisabled:a=!1,style:c,...p},d)=>{const s=h(),i=x=>{a||o==null||o(x)};return r.jsxs(g,{"data-testid":t,isChecked:l,isDisabled:a,style:c,children:[r.jsxs($,{children:[r.jsx(y,{checked:l,disabled:a,onChange:i,ref:d,type:"checkbox",...p}),l?r.jsx(u,{code:"check",color:s.palette.content.contrast}):null]}),e?r.jsx(w,{isChecked:l,isDisabled:a,children:e}):null]})});export{S as C};
