var S=Object.defineProperty;var $=(t,e)=>S(t,"name",{value:e,configurable:!0});import{j as r}from"./jsx-runtime-Cgz2XvFB.js";import{r as f}from"./index-CwbBKW39.js";import{B as b}from"./index-DTgA8jos.js";import"./typography-B3nKKPHm.js";import"./index-DwAePuIF.js";import"./index-DV-VXEUn.js";import{u as _}from"./useMedia-CRgJMRRc.js";import{I as h}from"./Icon-BWIy_dZb.js";import{T as j}from"./Typography-Dk4smw7A.js";import{f as m,d as v}from"./emotion-styled.browser.esm-CIRWz9XU.js";const n={Default:"default",Error:"error",Info:"informative",Success:"success",Warning:"warning"},I={[n.Error]:"error",[n.Info]:"info",[n.Success]:"check_circle",[n.Warning]:"warning"},y=m.div`
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
`,C=m.div`
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
`,E=m.button`
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
`,z=$(({children:t,dataTestId:e,style:s,type:o=n.Default,onClose:i,description:l,title:c,orientation:k="horizontal"})=>{const a=v(),d=o===n.Default,g=_(`(max-width: ${a.breakpoints.mq2}px)`)?"vertical":k||"horizontal",p=g==="horizontal",w=!!i,x=d?"content.default":`${o}.dark`,M=d?a.palette.content.default:a.palette[o].dark,D=f.useMemo(()=>f.Children.map(t,u=>u&&f.cloneElement(u,{...u.props,type:o})),[t,o]);return r.jsxs(y,{"data-testid":e??"message",messageType:o,orientation:g,style:s,children:[!d&&r.jsx(h,{code:I[o],color:a.palette[o].dark,"data-testid":"message-icon",dataTestId:"message-icon"}),r.jsxs(b,{dataTestId:"message-content",style:{flexDirection:p?"row":"column",justifyContent:"space-between",gap:p?a.spacing.spacing_30:a.spacing.spacing_50,alignItems:p?"center":"start"},children:[r.jsxs(b,{style:{alignItems:"flex-start",gap:a.spacing.spacing_10},children:[c?r.jsx(j,{color:x,fontStyles:"bodyLgBold",children:c}):null,r.jsx(j,{color:x,fontStyles:"bodyLgRegular",children:l})]}),D]}),w?r.jsx(E,{"aria-label":"Close message",messageType:o,onClick:i,orientation:g,children:r.jsx(h,{code:"close",color:M})}):null]})},"Message");z.Actions=({children:t,dataTestId:e,type:s})=>r.jsx(C,{"data-testid":e??"message-actions",messageType:s,children:t});export{z as M,n as O};
