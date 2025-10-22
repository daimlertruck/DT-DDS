import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{T as i}from"./Typography-BwSM8y-N.js";import{f as s}from"./emotion-styled.browser.esm-DBghOYGd.js";const p=s.div`
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
`,c=({children:t,dataTestId:a,style:e})=>n.jsx(p,{"data-testid":a??"empty-state",style:e,children:t});c.Content=({dataTestId:t,style:a,title:e,description:o})=>n.jsxs(r,{"data-testid":t??"empty-state-content",style:a,children:[n.jsx(i,{color:"content.dark",element:"h2",fontStyles:"h4",children:e}),n.jsx(i,{color:"content.default",fontStyles:"bodyLgRegular",children:o})]});export{c as E};
