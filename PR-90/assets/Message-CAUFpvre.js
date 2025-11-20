import{j as r}from"./jsx-runtime-CB_V9I5Y.js";import{B as $}from"./index-CWvrgZ1b.js";import"./index-D9dZuxfj.js";import"./index-B4tIMv5T.js";import"./index-XjDa9cP3.js";import{u as D}from"./useMedia-bxl5YFrZ.js";import{r as f}from"./index-CTjT7uj6.js";import{I as b}from"./Icon-w916x_k_.js";import{T as h}from"./Typography-Bb7lZ69m.js";import{f as m,d as S}from"./emotion-styled.browser.esm-DBghOYGd.js";const n={Default:"default",Error:"error",Info:"informative",Success:"success",Warning:"warning"},_={[n.Error]:"error",[n.Info]:"info",[n.Success]:"check_circle",[n.Warning]:"warning"},v=m.div`
  display: grid;
  width: 100%;
  padding: ${({theme:t})=>`${t.spacing.spacing_40} ${t.spacing.spacing_50}`};
  border-radius: ${({theme:t})=>t.shape.message};

  ${({theme:t,messageType:e,orientation:s})=>{const o=e===n.Default,i=o?t.palette.surface.light:t.palette[e].light,l=o?t.palette.border.medium:t.palette[e].default,c=`
      grid-template-columns: ${o?"1fr fit-content(100%)":"fit-content(100%) 1fr fit-content(100%)"};
      background-color: ${i};
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

        ${o?`
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
`,I=m.div`
  display: flex;
  flex-direction: row;
  gap: ${({theme:t})=>t.spacing.spacing_20};

  button {
    ${({theme:t,messageType:e})=>{const s=e==="default",o=s?t.palette.content.default:t.palette[e].dark,i=s?t.palette.surface.medium:t.palette[e].medium;return`
        color: ${o};

        &:hover {
          background-color: ${i};
          color: ${o};
        }
      `}}
  }
`,y=m.button`
  ${({theme:t,messageType:e,orientation:s})=>`
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
      background-color: ${e===n.Default?t.palette.surface.medium:t.palette[e].medium};
    }
  `}
`,C=({children:t,dataTestId:e,style:s,type:o=n.Default,onClose:i,description:l,title:c,orientation:j="horizontal"})=>{const a=S(),d=o===n.Default,g=D(`(max-width: ${a.breakpoints.mq2}px)`)?"vertical":j||"horizontal",p=g==="horizontal",k=!!i,x=d?"content.default":`${o}.dark`,w=d?a.palette.content.default:a.palette[o].dark,M=f.useMemo(()=>f.Children.map(t,u=>u&&f.cloneElement(u,{...u.props,type:o})),[t,o]);return r.jsxs(v,{"data-testid":e??"message",messageType:o,orientation:g,style:s,children:[!d&&r.jsx(b,{code:_[o],color:a.palette[o].dark,"data-testid":"message-icon",dataTestId:"message-icon"}),r.jsxs($,{dataTestId:"message-content",style:{flexDirection:p?"row":"column",justifyContent:"space-between",gap:p?a.spacing.spacing_30:a.spacing.spacing_50,alignItems:p?"center":"start"},children:[r.jsxs($,{style:{alignItems:"flex-start",gap:a.spacing.spacing_10},children:[c?r.jsx(h,{color:x,fontStyles:"bodyLgBold",children:c}):null,r.jsx(h,{color:x,fontStyles:"bodyLgRegular",children:l})]}),M]}),k?r.jsx(y,{"aria-label":"Close message",messageType:o,onClick:i,orientation:g,children:r.jsx(b,{code:"close",color:w})}):null]})};C.Actions=({children:t,dataTestId:e,type:s})=>r.jsx(I,{"data-testid":e??"message-actions",messageType:s,children:t});export{C as M,n as O};
