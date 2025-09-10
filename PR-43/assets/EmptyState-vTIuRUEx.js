import{j as n}from"./jsx-runtime-DMAvRu52.js";import{T as i}from"./Typography-D4QoQXTm.js";import{n as s}from"./emotion-styled.browser.esm-Dv69Fly8.js";const p=s.div`
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
    
    @media only screen and (min-width: ${t.breakpoints.mq32}px) {
      padding: ${t.spacing.spacing_200} ${t.spacing.spacing_500};
    }
  `}
`,r=s.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${({theme:t})=>`
      gap: ${t.spacing.spacing_30};

      @media only screen and (min-width: ${t.breakpoints.mq32}px) {
        gap: ${t.spacing.spacing_40};
      }
  `}
`,c=({children:t,dataTestId:e,style:a})=>n.jsx(p,{"data-testid":e??"empty-state",style:a,children:t});c.Content=({dataTestId:t,style:e,title:a,description:o})=>n.jsxs(r,{"data-testid":t??"empty-state-content",style:e,children:[n.jsx(i,{color:"content.dark",element:"h2",fontStyles:"h4",children:a}),n.jsx(i,{color:"content.default",fontStyles:"bodyLgRegular",children:o})]});export{c as E};
