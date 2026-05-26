var p=Object.defineProperty;var s=(t,n)=>p(t,"name",{value:n,configurable:!0});import{j as i}from"./jsx-runtime-Cgz2XvFB.js";import{T as o}from"./Typography-Dk4smw7A.js";import{f as a}from"./emotion-styled.browser.esm-CIRWz9XU.js";const r=a.div`
  container-type: inline-size;
  width: 100%;
  height: 100%;
`,d=a.div`
  ${({theme:t})=>`
    padding: ${t.spacing.spacing_70} ${t.spacing.spacing_90};
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

    @container (min-width: ${t.breakpoints.mq3}px) {
      padding: ${t.spacing.spacing_90} ${t.spacing.spacing_500};
    }
  `}
`,l=a.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${({theme:t})=>`
      gap: ${t.spacing.spacing_30};

      @container (min-width: ${t.breakpoints.mq3}px) {
        gap: ${t.spacing.spacing_40};
      }
  `}
`,g=s(({children:t,dataTestId:n,style:e})=>i.jsx(r,{children:i.jsx(d,{"data-testid":n??"empty-state",style:e,children:t})}),"EmptyState");g.Content=({dataTestId:t,style:n,title:e,description:c})=>i.jsxs(l,{"data-testid":t??"empty-state-content",style:n,children:[i.jsx(o,{color:"content.dark",element:"h2",fontStyles:"h4Bold",children:e}),i.jsx(o,{color:"content.default",fontStyles:"bodyMdRegular",children:c})]});export{g as E};
