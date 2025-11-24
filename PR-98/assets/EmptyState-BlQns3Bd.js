var p=Object.defineProperty;var i=(t,n)=>p(t,"name",{value:n,configurable:!0});import{j as a}from"./jsx-runtime-Cgz2XvFB.js";import{T as s}from"./Typography-CEwLj33J.js";import{f as o}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const r=o.div`
  ${({theme:t})=>`
    padding: ${t.spacing.l} ${t.spacing.s};
    background-color: ${t.palette.surface.light};
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${t.shape.emptyState};
    border: 1px dashed ${t.palette.border.default};
    width: 100%;
    height: 100%;
    gap: ${t.spacing.xs};
    
    @media only screen and (min-width: ${t.breakpoints.mq3}px) {
      padding: ${t.spacing.spacing_200} ${t.spacing.spacing_500};
    }
  `}
`,c=o.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${({theme:t})=>`
      gap: ${t.spacing.spacing_30};

      @media only screen and (min-width: ${t.breakpoints.mq3}px) {
        gap: ${t.spacing.spacing_40};
      }
  `}
`,l=i(({children:t,dataTestId:n,style:e})=>a.jsx(r,{"data-testid":n??"empty-state",style:e,children:t}),"EmptyState");l.Content=({dataTestId:t,style:n,title:e,description:d})=>a.jsxs(c,{"data-testid":t??"empty-state-content",style:n,children:[a.jsx(s,{color:"content.dark",element:"h2",fontStyles:"h4Bold",children:e}),a.jsx(s,{color:"content.default",fontStyles:"bodyMdRegular",children:d})]});export{l as E};
