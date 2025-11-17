import{s as t}from"./emotion-styled.browser.esm-BMKZqQy6.js";const i=t.div`
  ${({theme:o,hasBackground:a,isDisabled:e,hasBorderBottom:r})=>`
    position: relative;
    width: 100%;
    background-color: ${a?o.palette.surface.light:"transparent"};
    border-bottom: ${r?`1px solid ${o.palette.border.default}`:"none"};

    ${e?`
          background-color: ${o.palette.surface.light};
          color: ${o.palette.content.light};

          * {
            cursor: not-allowed;
            user-select: none;
            color: inherit;
          }
        `:`
          &:hover {
            background-color: ${o.palette.surface.default};
            box-shadow: ${o.shadows.elevation_100};
          }
        `}
  `}
`,n=t.header`
  ${({theme:o})=>`
    ${o.fontStyles.h6Bold};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${o.spacing.spacing_30};
    padding: ${o.spacing.spacing_50};
    cursor: pointer;
    user-select: none;
    color: ${o.palette.surface.dark};

    &:focus-visible {
      outline: 2px solid ${o.palette.primary.default};
    }
  `}
`,l=t.div`
  ${({theme:o,isOpenState:a})=>`
    ${o.fontStyles.bodyLgRegular};
    display: grid;
    grid-template-rows: ${a?"1fr":"0fr"};
    transition: grid-template-rows 0.3s ease-in-out, padding 0.3s ease-in-out;
    color: ${o.palette.content.dark};
    
    padding: 0 ${o.spacing.spacing_50} ${a?o.spacing.spacing_50:0};
      
    & > div {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  `}
`;export{i as A,l as B,n as H};
