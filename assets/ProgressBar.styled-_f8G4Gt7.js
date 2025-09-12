import{n as e}from"./emotion-styled.browser.esm-Dv69Fly8.js";const l={small:"4px",large:"8px"},t=r=>({active:{background:r.palette.informative.default,helper:r.palette.content.medium,percentage:r.palette.content.default},success:{background:r.palette.success.default,helper:r.palette.content.medium,percentage:r.palette.content.default},error:{background:r.palette.error.default,helper:r.palette.error.default,percentage:r.palette.error.default}}),n=e.div`
  ${({theme:r})=>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${r.spacing.spacing_20};
    min-width: 48px;
  `}
`,i=e.div`
  ${({theme:r})=>`
    display: grid;
    grid-template-columns: minmax(48px, 1fr) 28px 16px;
    align-items: center;
    gap: ${r.spacing.spacing_20};
    width: 100%;
    height: 16px;
  `}
`,p=e.div`
  ${({theme:r,size:a,state:s,progress:o})=>`
    width: ${o}%;
    height: ${l[a]};
    background-color: ${t(r)[s].background};
    transition: width 0.2s ease-in-out;
    border-radius: ${r.radius.radius_0} ${r.shape.progressbar} ${r.shape.progressbar} ${r.radius.radius_0}; 
  `};
`,c=e.div`
  ${({theme:r})=>`
    width: 100%;
    background-color: ${r.palette.secondary.medium};
    border-radius: ${r.shape.progressbar};
    overflow: hidden;
  `};
`,g=e.p`
  ${({theme:r,state:a})=>`
    ${r.fontStyles.bodySmRegular}
    color: ${t(r)[a].helper};
  `};
`,u=e.div`
  ${({theme:r,state:a})=>`
    ${r.fontStyles.bodySmRegular}
    text-align: center;
    color: ${t(r)[a].percentage};
  `};
`,$=e.div`
  height: 16px;
  line-height: 16px;
`;export{n as P,i as a,c as b,p as c,g as d,u as e,$ as f};
