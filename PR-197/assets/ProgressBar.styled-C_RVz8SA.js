var d=Object.defineProperty;var t=(r,e)=>d(r,"name",{value:e,configurable:!0});import{f as a}from"./emotion-styled.browser.esm-CIRWz9XU.js";const i={small:"4px",large:"8px"},s=t(r=>({active:{background:r.palette.informative.default,helper:r.palette.content.medium,percentage:r.palette.content.default},success:{background:r.palette.success.default,helper:r.palette.content.medium,percentage:r.palette.content.default},error:{background:r.palette.error.default,helper:r.palette.error.default,percentage:r.palette.error.default}}),"progressBarColors"),c=a.div`
  ${({theme:r})=>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${r.spacing.spacing_20};
    min-width: 48px;
  `}
`,g=a.div`
  ${({theme:r})=>`
    display: grid;
    grid-template-columns: minmax(48px, 1fr) 28px 16px;
    align-items: center;
    gap: ${r.spacing.spacing_20};
    width: 100%;
    height: 16px;
  `}
`,u=a.div`
  ${({theme:r,size:e,state:o,progress:l})=>`
    width: ${l}%;
    height: ${i[e]};
    background-color: ${s(r)[o].background};
    transition: width 0.2s ease-in-out;
    border-radius: ${r.radius.radius_0} ${r.shape.progressbar} ${r.shape.progressbar} ${r.radius.radius_0}; 
  `};
`,$=a.div`
  ${({theme:r})=>`
    width: 100%;
    background-color: ${r.palette.secondary.medium};
    border-radius: ${r.shape.progressbar};
    overflow: hidden;
  `};
`,f=a.p`
  ${({theme:r,state:e})=>`
    ${r.fontStyles.bodySmRegular}
    color: ${s(r)[e].helper};
  `};
`,x=a.div`
  ${({theme:r,state:e})=>`
    ${r.fontStyles.bodySmRegular}
    text-align: center;
    color: ${s(r)[e].percentage};
  `};
`,y=a.div`
  height: 16px;
  line-height: 16px;
`;export{c as P,g as a,$ as b,u as c,f as d,x as e,y as f};
