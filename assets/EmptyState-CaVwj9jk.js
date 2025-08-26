import{j as n}from"./jsx-runtime-DMAvRu52.js";import{T as s}from"./Typography-DII2gFDQ.js";import{n as i}from"./emotion-styled.browser.esm-Dv69Fly8.js";const d=i.div`
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
    
    @media only screen and (min-width: ${t.breakpoints.s}px) {
      padding: ${t.spacing["2xl"]} ${t.spacing["5xl"]};
    }
  `}
`,r=i.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${({theme:t})=>`
      gap: ${t.spacing["4xs"]};

      @media only screen and (min-width: ${t.breakpoints.s}px) {
        gap: ${t.spacing["3xs"]};
      }
  `}
`,p=({children:t,dataTestId:e,style:a})=>n.jsx(d,{"data-testid":e??"empty-state",style:a,children:t});p.Content=({dataTestId:t,style:e,title:a,description:o})=>n.jsxs(r,{"data-testid":t??"empty-state-content",style:e,children:[n.jsx(s,{color:"content.dark",element:"h2",fontStyles:"h4",children:a}),n.jsx(s,{color:"content.default",fontStyles:"body1",children:o})]});export{p as E};
