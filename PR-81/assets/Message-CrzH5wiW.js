import{j as s}from"./jsx-runtime-CB_V9I5Y.js";import{B as x}from"./index-CWvrgZ1b.js";import{I as $}from"./Icon-DG6KDu5A.js";import{T as h}from"./Typography-DHEP7O00.js";import{r as f}from"./index-CTjT7uj6.js";import{f as p,d as D}from"./emotion-styled.browser.esm-DBghOYGd.js";const n={Default:"default",Error:"error",Info:"informative",Success:"success",Warning:"warning"},S={[n.Error]:"error",[n.Info]:"info",[n.Success]:"check_circle",[n.Warning]:"warning"},w=p.div`
  display: grid;
  padding: ${({theme:t})=>`${t.spacing.spacing_40} ${t.spacing.spacing_50}`};
  border-radius: ${({theme:t})=>t.shape.message};
  gap: ${({theme:t})=>t.spacing.spacing_30};

  ${({theme:t,messageType:o=n.Default,variant:r})=>{const e=o===n.Default,a=e?t.palette.surface.light:t.palette[o].light,d=e?t.palette.border.default:t.palette[o].default,l=`
      grid-template-columns: ${e?"1fr fit-content(100%)":"fit-content(100%) 1fr fit-content(100%)"};
      background-color: ${a};
      border: 1px solid ${d};
    `;return r==="vertical"?`
        ${l};
        grid-template-columns: 1fr fit-content(100%);

        & > :nth-child(1) {
          grid-column: 1;
          grid-row: 1;
        }

        ${e?`
                & > :nth-child(2) {
                  grid-column: 2;
                  grid-row: 1;
                }
              `:`
                & > :nth-child(2) {
                  grid-column: 1;
                  grid-row: 2;
                }
                & > :nth-child(3) {
                  grid-column: 2;
                  grid-row: 1;
                }
              `}
      `:l}}
`,I=p.div`
  display: flex;
  flex-direction: row;
  gap: ${({theme:t})=>t.spacing.spacing_20};

  button {
    ${({theme:t,messageType:o})=>{const r=o==="default",e=r?t.palette.content.default:t.palette[o].dark,a=r?t.palette.surface.medium:t.palette[o].medium;return`
        color: ${e};

        &:hover {
          background-color: ${a};
          color: ${e};
        }
      `}}
  }
`,y=p.button`
  ${({theme:t,messageType:o,variant:r})=>`
    border: 0;
    cursor: pointer;
    background: transparent;
    display: flex;
    height: fit-content;

    ${r==="horizontal"&&"align-self: center"};
  
    &:focus-visible {
      outline: 2px solid ${t.palette.primary.default};
      outline-offset: 1px;
    }

    &:hover {
      background-color: ${o===n.Default?t.palette.surface.medium:t.palette[o].medium};
    }
  `}
`,C=({children:t,dataTestId:o,style:r,type:e=n.Default,onClose:a,description:d,title:l,variant:c="horizontal"})=>{const i=D(),u=e===n.Default,b=!!a,m=u?"content.default":`${e}.dark`,j=u?i.palette.content.default:i.palette[e].dark,k=f.useMemo(()=>f.Children.map(t,g=>g&&f.cloneElement(g,{...g.props,type:e})),[t,e]);return s.jsxs(w,{"data-testid":o??"message",messageType:e,style:r,variant:c,children:[!u&&s.jsx($,{code:S[e],color:i.palette[e].dark,"data-testid":"message-icon",dataTestId:"message-icon"}),s.jsxs(x,{dataTestId:"message-content",style:{flexDirection:c==="horizontal"?"row":"column",justifyContent:"space-between",gap:i.spacing.spacing_20,alignItems:c==="horizontal"?"center":"start"},children:[s.jsxs(x,{style:{alignItems:"flex-start"},children:[l?s.jsx(h,{color:m,fontStyles:"bodyLgBold",children:l}):null,s.jsx(h,{color:m,fontStyles:"bodyLgRegular",children:d})]}),k]}),b?s.jsx(y,{"aria-label":"Close message",messageType:e,onClick:a,variant:c,children:s.jsx($,{code:"close",color:j})}):null]})};C.Actions=({children:t,dataTestId:o,type:r})=>s.jsx(I,{"data-testid":o??"message-actions",messageType:r,children:t});export{C as M,n as O};
