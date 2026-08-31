var g=Object.defineProperty;var l=(o,r)=>g(o,"name",{value:r,configurable:!0});import{t as f}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as y}from"./jsx-runtime-Br4tQxt1.js";import{t as k}from"./Spinner-fe6dv7DU.js";var x=l(o=>({primary:`
    color: ${o.palette.primary.default};
    border-color: ${o.palette.primary.default};
    background-color: transparent;

    &:hover {
      color: ${o.palette.primary.default};
      border-color: ${o.palette.primary.default};
      background-color: ${o.palette.primary.light};
    }

    &:active {
      color: ${o.palette.primary.default};
      border-color: ${o.palette.primary.default};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${o.palette.primary.light};
      border-color: ${o.palette.primary.light};
      background-color: transparent;
    }
  `,error:`
    color: ${o.palette.error.default};
    background-color: transparent;
    border-color: ${o.palette.error.default};

    &:hover {
      color: ${o.palette.error.default};
      border-color: ${o.palette.error.default};
      background-color: ${o.palette.error.light};
    }

    &:disabled {
      cursor: not-allowed;
      color: ${o.palette.error.light};
      border-color: ${o.palette.error.light};
    }
  `,secondary:`
    color: ${o.palette.secondary.default};
    border-color: ${o.palette.secondary.default};
    background-color: transparent;
    
    &:hover {
      color: ${o.palette.secondary.default};
      border-color: ${o.palette.secondary.default};
      background-color: ${o.palette.secondary.light};
    }
    &:active {
      color: ${o.palette.secondary.default};
      border-color: ${o.palette.secondary.default};
      background-color: ${o.palette.secondary.light};
    }
    &:disabled {
      cursor: not-allowed;
      color: ${o.palette.secondary.light};
      border-color: ${o.palette.secondary.light};
      background-color: transparent;
    }
  `,accent:`
    color: ${o.palette.accent.default};
    border-color: ${o.palette.accent.default};
    background-color: transparent;
    
    &:hover {
      color: ${o.palette.accent.default};
      border-color: ${o.palette.accent.default};
      background-color: ${o.palette.accent.light};
    }
    &:active {
      color: ${o.palette.accent.default};
      border-color: ${o.palette.accent.default};
      background-color: ${o.palette.accent.light};
    }
    &:disabled {
      cursor: not-allowed;
      color: ${o.palette.accent.light};
      border-color: ${o.palette.accent.light};
      background-color: transparent;
    }`}),"getOutlinedButtonStyles"),v=l((o,r,a)=>{if(a==="contrast")return{solid:`
        color: ${r.palette.content.dark};
        background-color: ${r.palette.surface.contrast};
        border: 0;

        &:hover {
          background-color: ${r.palette.secondary.light};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${r.palette.secondary.medium};
          background-color: ${r.palette.surface.contrast};
        }
      `,outlined:`
        color: ${r.palette.content.contrast};
        border-color: ${r.palette.surface.contrast};
        background-color: transparent;

        &:hover {
          color: ${r.palette.content.dark};
          border-color: ${r.palette.surface.contrast};
          background-color: ${r.palette.surface.contrast};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${r.palette.secondary.default};
          border-color: ${r.palette.secondary.default};
          background-color: transparent;
        }
      `,text:`
        color: ${r.palette.content.contrast};
        background-color: transparent;

        &:hover {
          color: ${r.palette.content.dark};
          background-color: ${r.palette.secondary.light};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${r.palette.secondary.medium};
          background-color: transparent;
        }
      `}[o];{const c="dark",t="light";return{solid:`
        border: 0;
        color: ${r.palette.content.contrast};
        background-color: ${r.palette[a].default};
        
        &:hover {
          color: ${r.palette.content.contrast};
          background-color: ${r.palette[a][c]};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${r.palette.content.contrast};
          background-color: ${r.palette[a][t]};
        }
    `,outlined:x(r)[a],text:`
        color: ${r.palette[a].default};
        background-color: transparent;
        border: 0;
        
        &:hover {
          color: ${r.palette[a].default};
          background-color: ${r.palette[a].light};
        }
        
        &:disabled {
          cursor: not-allowed;
          color: ${r.palette[a][t]};
          background-color: transparent;
        }
    `}[o]}},"buttonVariantStyles"),w=l((o,r,a)=>({large:`
      ${r.fontStyles.buttonLg}
      padding: ${a?`calc(${r.spacing.spacing_50} - 2px)`:r.spacing.spacing_50}  ${r.spacing.s};
    `,medium:`
      ${r.fontStyles.buttonMd}
      padding: ${a?`calc(${r.spacing.spacing_40} - 2px)`:r.spacing.spacing_40} ${r.spacing.xs};
    `,small:`
      ${r.fontStyles.buttonSm}
      padding: ${a?`calc(${r.spacing.spacing_30} - 2px)`:r.spacing.spacing_30} ${r.spacing.spacing_50};
    `})[o],"buttonSizeStyles"),S=f.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: auto;
  min-width: 80px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  align-items: center;
  border: 2px solid transparent;

  ${({theme:o,variant:r,color:a,size:c})=>`
    gap: ${o.spacing.spacing_30};
    border-radius: ${o.shape.button}; 
    ${w(c,o,r==="outlined")};
    ${v(r,o,a)}

    &:focus-visible {
      ${a==="contrast"?`
          outline: 1px solid ${o.palette.content.dark};
          outline-offset: -3px;
        `:`
          outline: 3px solid ${o.palette.border.dark};
          outline-offset: 1px;
        `}
    }

    @media only screen and (max-width: ${o.breakpoints.mq3}px) {
      width: 100%;
    }
  `};
`,d=y(),z=l(({style:o,children:r,onClick:a,dataTestId:c,isLoading:t,isDisabled:n=!1,size:s="medium",variant:e="solid",color:p="primary",type:i="button",...u})=>{const $=l(b=>{n||t||a?.(b)},"handleButtonClick");return(0,d.jsxs)(S,{...u,color:p,"data-testid":`${c}-button`,disabled:n||t,onClick:$,size:s,style:o,type:i,variant:e,children:[r,t?(0,d.jsx)(k,{colorScheme:e!=="solid"?"positive":"negative",size:"extra-small"}):null]})},"Button");export{z as t};
