var S=Object.defineProperty;var $=(t,r)=>S(t,"name",{value:r,configurable:!0});import{o as y}from"./rolldown-runtime-CzYk_CEw.js";import{t as D}from"./react-HNhQAnN4.js";import{o as C,t as _,u as I}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as b}from"./src-Cgsrikn0.js";import{t as M}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as h}from"./Typography-BVFm109i.js";import{i as E}from"./core-DtZ76Qs_.js";import{t as f}from"./src-1jRqCCWR.js";import"./box-DLdZVqFP.js";import"./typography-D38L8NZ6.js";var m=y(D());C();var s={Default:"default",Error:"error",Info:"informative",Success:"success",Warning:"warning"},z={[s.Error]:"error",[s.Info]:"info",[s.Success]:"check_circle",[s.Warning]:"warning"},q=_.div`
  display: grid;
  width: 100%;
  padding: ${({theme:t})=>`${t.spacing.spacing_40} ${t.spacing.spacing_50}`};
  border-radius: ${({theme:t})=>t.shape.message};

  ${({theme:t,messageType:r,orientation:o})=>{const e=r===s.Default,l=e?t.palette.surface.light:t.palette[r].light,c=e?t.palette.border.medium:t.palette[r].default,i=`
      grid-template-columns: ${e?"1fr fit-content(100%)":"fit-content(100%) 1fr fit-content(100%)"};
      background-color: ${l};
      border: 1px solid ${c};
      gap: ${t.spacing.spacing_50}
    `;return o==="vertical"?`
        ${i};
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
      `:i}}
`,A=_.div`
  display: flex;
  flex-direction: row;
  gap: ${({theme:t})=>t.spacing.spacing_20};

  button {
    ${({theme:t,messageType:r})=>{const o=r==="default",e=o?t.palette.content.default:t.palette[r].dark;return`
        color: ${e};

        &:hover {
          background-color: ${o?t.palette.surface.medium:t.palette[r].medium};
          color: ${e};
        }
      `}}
  }
`,B=_.button`
  ${({theme:t,messageType:r,orientation:o})=>`
    border: 0;
    cursor: pointer;
    background: transparent;
    display: flex;
    height: fit-content;

    ${o==="horizontal"&&"align-self: center"};
  
    &:focus-visible {
      outline: 2px solid ${t.palette.primary.default};
      outline-offset: 1px;
    }

    &:hover {
      background-color: ${r===s.Default?t.palette.surface.medium:t.palette[r].medium};
    }
  `}
`,a=M(),T=$(({children:t,dataTestId:r,style:o,type:e=s.Default,onClose:l,description:c,title:i,orientation:v="horizontal"})=>{const n=I(),d=e===s.Default,u=E(`(max-width: ${n.breakpoints.mq2}px)`)?"vertical":v||"horizontal",g=u==="horizontal",j=!!l,x=d?"content.default":`${e}.dark`,w=d?n.palette.content.default:n.palette[e].dark,k=(0,m.useMemo)(()=>m.Children.map(t,p=>p&&(0,m.cloneElement)(p,{...p.props,type:e})),[t,e]);return(0,a.jsxs)(q,{"data-testid":r??"message",messageType:e,orientation:u,style:o,children:[!d&&(0,a.jsx)(f,{style:{justifyContent:"center",alignItems:"flex-start"},children:(0,a.jsx)(b,{code:z[e],color:n.palette[e].dark,"data-testid":"message-icon",dataTestId:"message-icon"})}),(0,a.jsxs)(f,{dataTestId:"message-content",style:{flexDirection:g?"row":"column",justifyContent:"space-between",gap:g?n.spacing.spacing_30:n.spacing.spacing_50,alignItems:g?"center":"start"},children:[(0,a.jsxs)(f,{style:{alignItems:"flex-start",gap:n.spacing.spacing_10},children:[i?(0,a.jsx)(h,{color:x,fontStyles:"bodyLgBold",children:i}):null,(0,a.jsx)(h,{color:x,fontStyles:"bodyLgRegular",children:c})]}),k]}),j?(0,a.jsx)(B,{"aria-label":"Close message",messageType:e,onClick:l,orientation:u,children:(0,a.jsx)(b,{code:"close",color:w})}):null]})},"Message");T.Actions=({children:t,dataTestId:r,type:o})=>(0,a.jsx)(A,{"data-testid":r??"message-actions",messageType:o,children:t});export{s as n,T as t};
