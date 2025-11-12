import{j as r}from"./jsx-runtime-CB_V9I5Y.js";import{r as f}from"./index-CTjT7uj6.js";import{B as $}from"./index-CWvrgZ1b.js";import{I as b}from"./Icon-DG6KDu5A.js";import{T as h}from"./Typography-ByfpGKzH.js";import{f as m,d as D}from"./emotion-styled.browser.esm-DBghOYGd.js";const n={Default:"default",Error:"error",Info:"informative",Success:"success",Warning:"warning"},S={[n.Error]:"error",[n.Info]:"info",[n.Success]:"check_circle",[n.Warning]:"warning"},I=m.div`
  display: grid;
  width: 100%;
  padding: ${({theme:t})=>`${t.spacing.spacing_40} ${t.spacing.spacing_50}`};
  border-radius: ${({theme:t})=>t.shape.message};

  ${({theme:t,messageType:o,orientation:s})=>{const e=o===n.Default,a=e?t.palette.surface.light:t.palette[o].light,l=e?t.palette.border.medium:t.palette[o].default,c=`
      grid-template-columns: ${e?"1fr fit-content(100%)":"fit-content(100%) 1fr fit-content(100%)"};
      background-color: ${a};
      border: 1px solid ${l};
      gap: ${t.spacing.spacing_50}
    `;return s==="vertical"?`
        ${c};
        grid-template-columns: 1fr fit-content(100%);
        gap: ${t.spacing.spacing_30};

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
      `:c}}
`,_=m.div`
  display: flex;
  flex-direction: row;
  gap: ${({theme:t})=>t.spacing.spacing_20};

  button {
    ${({theme:t,messageType:o})=>{const s=o==="default",e=s?t.palette.content.default:t.palette[o].dark,a=s?t.palette.surface.medium:t.palette[o].medium;return`
        color: ${e};

        &:hover {
          background-color: ${a};
          color: ${e};
        }
      `}}
  }
`,v=m.button`
  ${({theme:t,messageType:o,orientation:s})=>`
    border: 0;
    cursor: pointer;
    background: transparent;
    display: flex;
    height: fit-content;

    ${s==="horizontal"&&"align-self: center"};
  
    &:focus-visible {
      outline: 2px solid ${t.palette.primary.default};
      outline-offset: 1px;
    }

    &:hover {
      background-color: ${o===n.Default?t.palette.surface.medium:t.palette[o].medium};
    }
  `}
`,y=({children:t,dataTestId:o,style:s,type:e=n.Default,onClose:a,description:l,title:c,orientation:d="horizontal"})=>{const i=D(),g=e===n.Default,u=d==="horizontal",j=!!a,x=g?"content.default":`${e}.dark`,k=g?i.palette.content.default:i.palette[e].dark,w=f.useMemo(()=>f.Children.map(t,p=>p&&f.cloneElement(p,{...p.props,type:e})),[t,e]);return r.jsxs(I,{"data-testid":o??"message",messageType:e,orientation:d,style:s,children:[!g&&r.jsx(b,{code:S[e],color:i.palette[e].dark,"data-testid":"message-icon",dataTestId:"message-icon"}),r.jsxs($,{dataTestId:"message-content",style:{flexDirection:u?"row":"column",justifyContent:"space-between",gap:u?i.spacing.spacing_30:i.spacing.spacing_50,alignItems:u?"center":"start"},children:[r.jsxs($,{style:{alignItems:"flex-start"},children:[c?r.jsx(h,{color:x,fontStyles:"bodyLgBold",children:c}):null,r.jsx(h,{color:x,fontStyles:"bodyLgRegular",children:l})]}),w]}),j?r.jsx(v,{"aria-label":"Close message",messageType:e,onClick:a,orientation:d,children:r.jsx(b,{code:"close",color:k})}):null]})};y.Actions=({children:t,dataTestId:o,type:s})=>r.jsx(_,{"data-testid":o??"message-actions",messageType:s,children:t});export{y as M,n as O};
