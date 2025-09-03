import{n as c}from"./emotion-styled.browser.esm-Dv69Fly8.js";const n=o=>({primary:`
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
    }`}),e=(o,r,a)=>{if(a==="contrast")return{solid:`
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
      `}[o];{const t="dark",l="light";return{solid:`
        border: 0;
        color: ${r.palette.content.contrast};
        background-color: ${r.palette[a].default};
        
        &:hover {
          color: ${r.palette.content.contrast};
          background-color: ${r.palette[a][t]};
        }

        &:disabled {
          cursor: not-allowed;
          color: ${r.palette.content.contrast};
          background-color: ${r.palette[a][l]};
        }
    `,outlined:n(r)[a],text:`
        color: ${r.palette[a].default};
        background-color: transparent;
        border: 0;
        
        &:hover {
          color: ${r.palette[a].default};
          background-color: ${r.palette[a].light};
        }
        
        &:disabled {
          cursor: not-allowed;
          color: ${r.palette[a][l]};
          background-color: transparent;
        }
    `}[o]}},d=(o,r,a)=>({large:`
      ${r.fontStyles.button1}
      padding: ${a?`calc(${r.spacing["2xs"]} - 2px)`:r.spacing["2xs"]}  ${r.spacing.s};
    `,medium:`
      ${r.fontStyles.button2}
      padding: ${a?`calc(${r.spacing["3xs"]} - 2px)`:r.spacing["3xs"]} ${r.spacing.xs};
    `,small:`
      ${r.fontStyles.button3}
      padding: ${a?`calc(${r.spacing["4xs"]} - 2px)`:r.spacing["4xs"]} ${r.spacing["2xs"]};
    `})[o],p=c.button`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: auto;
  min-width: 80px;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;
  align-items: center;
  border: 2px solid transparent;

  ${({theme:o,variant:r,color:a,size:t})=>`
    gap: ${o.spacing["4xs"]};
    border-radius: ${o.shape.button}; 
    ${d(t,o,r==="outlined")};
    ${e(r,o,a)}

    &:focus-visible {
      ${a==="contrast"?`
          outline: 1px solid ${o.palette.content.dark};
          outline-offset: -3px;
        `:`
          outline: 3px solid ${o.palette.border.dark};
          outline-offset: 1px;
        `}
    }

    @media only screen and (max-width: ${o.breakpoints.mq2}px) {
      width: 100%;
    }
  `};
`;export{p as B};
