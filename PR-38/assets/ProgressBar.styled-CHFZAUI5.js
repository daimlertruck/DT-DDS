import{n as r}from"./emotion-styled.browser.esm-Dv69Fly8.js";const n={small:"4px",large:"8px"},t=e=>({active:{background:e.palette.informative.default,helper:e.palette.content.medium,percentage:e.palette.content.default},success:{background:e.palette.success.default,helper:e.palette.content.medium,percentage:e.palette.content.default},error:{background:e.palette.error.default,helper:e.palette.error.default,percentage:e.palette.error.default}}),d=r.div`
  ${({theme:e})=>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${e.spacing["5xs"]};
    min-width: 48px;
  `}
`,i=r.div`
  ${({theme:e})=>`
    display: grid;
    grid-template-columns: minmax(48px, 1fr) 28px 16px;
    align-items: center;
    gap: ${e.spacing["5xs"]};
    width: 100%;
    height: 16px;
  `}
`,p=r.div`
  ${({theme:e,size:a,state:s,progress:o})=>`
    width: ${o}%;
    height: ${n[a]};
    background-color: ${t(e)[s].background};
    transition: width 0.2s ease-in-out;
    border-radius: ${e.radius.none} ${e.shape.progressbar} ${e.shape.progressbar} ${e.radius.none}; 
  `};
`,c=r.div`
  ${({theme:e})=>`
    width: 100%;
    background-color: ${e.palette.secondary.medium};
    border-radius: ${e.shape.progressbar};
    overflow: hidden;
  `};
`,g=r.p`
  ${({theme:e,state:a})=>`
    ${e.fontStyles.body3}
    color: ${t(e)[a].helper};
  `};
`,u=r.div`
  ${({theme:e,state:a})=>`
    ${e.fontStyles.body3}
    text-align: center;
    color: ${t(e)[a].percentage};
  `};
`,$=r.div`
  height: 16px;
  line-height: 16px;
`;export{d as P,i as a,c as b,p as c,g as d,u as e,$ as f};
