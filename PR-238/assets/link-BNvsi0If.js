var o=Object.defineProperty;var r=(t,n)=>o(t,"name",{value:n,configurable:!0});import{t as e}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as d}from"./jsx-runtime-Br4tQxt1.js";import{t as s}from"./Typography-BVFm109i.js";import"./typography-D38L8NZ6.js";import"./src-CxEIoE7R.js";var c=e.div`
  container-type: inline-size;
  width: 100%;
  height: 100%;
`,l=e.div`
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
`,g=e.div`
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
`,i=d(),y=r(({children:t,dataTestId:n,style:a})=>(0,i.jsx)(c,{children:(0,i.jsx)(l,{"data-testid":n??"empty-state",style:a,children:t})}),"EmptyState");y.Content=({dataTestId:t,style:n,title:a,description:p})=>(0,i.jsxs)(g,{"data-testid":t??"empty-state-content",style:n,children:[(0,i.jsx)(s,{color:"content.dark",element:"h2",fontStyles:"h4Bold",children:a}),(0,i.jsx)(s,{color:"content.default",fontStyles:"bodyMdRegular",children:p})]});export{y as t};
