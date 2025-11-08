import{j as n}from"./jsx-runtime-CB_V9I5Y.js";import{T as i}from"./Typography-2b-LZrT5.js";import{f as s}from"./emotion-styled.browser.esm-DBghOYGd.js";const d=s.div`
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
`,p=s.div`
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
`,r=({children:t,dataTestId:a,style:e})=>n.jsx(d,{"data-testid":a??"empty-state",style:e,children:t});r.Content=({dataTestId:t,style:a,title:e,description:o})=>n.jsxs(p,{"data-testid":t??"empty-state-content",style:a,children:[n.jsx(i,{color:"content.dark",element:"h2",fontStyles:"h4Bold",children:e}),n.jsx(i,{color:"content.default",fontStyles:"bodyMdRegular",children:o})]});export{r as E};
