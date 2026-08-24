var s=Object.defineProperty;var a=(o,t)=>s(o,"name",{value:t,configurable:!0});import{f as e}from"./emotion-styled.browser.esm-DNXn-wKZ.js";const i={transparent:a(()=>"transparent","transparent"),light:a(o=>o.palette.surface.light,"light"),contrast:a(o=>o.palette.surface.contrast,"contrast")},c=e.div`
  ${({theme:o,background:t,isDisabled:r,hasBorderBottom:n})=>`
    position: relative;
    width: 100%;
    background-color: ${i[t](o)};
    border-bottom: ${n?`1px solid ${o.palette.border.default}`:"none"};

    ${r?`
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
`,p=e.header`
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
`,g=e.div`
  ${({theme:o,isOpen:t})=>`
    ${o.fontStyles.bodyLgRegular};
    display: grid;
    grid-template-rows: ${t?"1fr":"0fr"};
    transition: grid-template-rows 0.3s ease-in-out, padding 0.3s ease-in-out;
    color: ${o.palette.content.dark};
    
    padding: 0 ${o.spacing.spacing_50} ${t?o.spacing.spacing_50:0};
      
    & > div {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  `}
`;export{c as A,g as B,p as H};
