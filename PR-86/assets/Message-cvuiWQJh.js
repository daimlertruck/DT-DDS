import{j as r}from"./jsx-runtime-CB_V9I5Y.js";import{B as $}from"./index-CWvrgZ1b.js";import"./index-D9dZuxfj.js";import"./index-B3ye42bY.js";import"./index-XjDa9cP3.js";import{r as l}from"./index-CTjT7uj6.js";import{u as _}from"./useDebounceResize-C9gCTwhN.js";import{I as b}from"./Icon-DG6KDu5A.js";import{T as h}from"./Typography-DHEP7O00.js";import{f as m,d as v}from"./emotion-styled.browser.esm-DBghOYGd.js";const s={Default:"default",Error:"error",Info:"informative",Success:"success",Warning:"warning"},I={[s.Error]:"error",[s.Info]:"info",[s.Success]:"check_circle",[s.Warning]:"warning"},y=m.div`
  display: grid;
  width: 100%;
  padding: ${({theme:t})=>`${t.spacing.spacing_40} ${t.spacing.spacing_50}`};
  border-radius: ${({theme:t})=>t.shape.message};

  ${({theme:t,messageType:e,orientation:n})=>{const o=e===s.Default,i=o?t.palette.surface.light:t.palette[e].light,d=o?t.palette.border.medium:t.palette[e].default,c=`
      grid-template-columns: ${o?"1fr fit-content(100%)":"fit-content(100%) 1fr fit-content(100%)"};
      background-color: ${i};
      border: 1px solid ${d};
      gap: ${t.spacing.spacing_50}
    `;return n==="vertical"?`
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
    ${({theme:t,messageType:e})=>{const n=e==="default",o=n?t.palette.content.default:t.palette[e].dark,i=n?t.palette.surface.medium:t.palette[e].medium;return`
        color: ${o};

        &:hover {
          background-color: ${i};
          color: ${o};
        }
      `}}
  }
`,M=m.button`
  ${({theme:t,messageType:e,orientation:n})=>`
    border: 0;
    cursor: pointer;
    background: transparent;
    display: flex;
    height: fit-content;

    ${n==="horizontal"&&"align-self: center"};
  
    &:focus-visible {
      outline: 2px solid ${t.palette.primary.default};
      outline-offset: 1px;
    }

    &:hover {
      background-color: ${e===s.Default?t.palette.surface.medium:t.palette[e].medium};
    }
  `}
`,E=({children:t,dataTestId:e,style:n,type:o=s.Default,onClose:i,description:d,title:c,orientation:j="horizontal"})=>{const a=v(),g=o===s.Default,[u,k]=l.useState(j),p=u==="horizontal",w=!!i,x=g?"content.default":`${o}.dark`,D=g?a.palette.content.default:a.palette[o].dark,S=l.useMemo(()=>l.Children.map(t,f=>f&&l.cloneElement(f,{...f.props,type:o})),[t,o]);return _(()=>{k(()=>window.innerWidth<=a.breakpoints.mq2?"vertical":"horizontal")},0),r.jsxs(y,{"data-testid":e??"message",messageType:o,orientation:u,style:n,children:[!g&&r.jsx(b,{code:I[o],color:a.palette[o].dark,"data-testid":"message-icon",dataTestId:"message-icon"}),r.jsxs($,{dataTestId:"message-content",style:{flexDirection:p?"row":"column",justifyContent:"space-between",gap:p?a.spacing.spacing_30:a.spacing.spacing_50,alignItems:p?"center":"start"},children:[r.jsxs($,{style:{alignItems:"flex-start",gap:a.spacing.spacing_10},children:[c?r.jsx(h,{color:x,fontStyles:"bodyLgBold",children:c}):null,r.jsx(h,{color:x,fontStyles:"bodyLgRegular",children:d})]}),S]}),w?r.jsx(M,{"aria-label":"Close message",messageType:o,onClick:i,orientation:u,children:r.jsx(b,{code:"close",color:D})}):null]})};E.Actions=({children:t,dataTestId:e,type:n})=>r.jsx(C,{"data-testid":e??"message-actions",messageType:n,children:t});export{E as M,s as O};
