import{j as p}from"./jsx-runtime-CB_V9I5Y.js";import{f as d}from"./emotion-styled.browser.esm-DBghOYGd.js";const u=({theme:t,disabled:a=!1})=>{const r=`
    &:hover:not(:disabled) [data-avatar-type='letter'] {
      background-color: var(--avatar-hover-bg, ${t.palette.primary.dark});
    }

    &:hover:not(:disabled) [data-avatar-type='collapsed'] {
      background-color: var(--avatar-hover-bg, ${t.palette.primary.light});
    }

    &:hover:not(:disabled) [data-avatar-type='thumbnail'] {
      background-color: var(--avatar-hover-bg, ${t.palette.primary.dark});
    }
  `,o=a?`
      cursor: not-allowed;
      
      [data-avatar-type='letter'] {
        background-color: ${t.palette.primary.light};
      }
      
      [data-avatar-type='collapsed'] {
        background-color: ${t.palette.surface.contrast};
      }
      
      [data-avatar-type='thumbnail'] {
        background-color: ${t.palette.primary.light};
      }
      
      [data-avatar-type='photo'] {
        opacity: 0.38;
      }
    `:"";return`
    &:has([data-avatar-type]) {
      ${r}
      ${o}
    }
  `},v={"extra-small":`
    font-size: 12px;
  `,small:`
    font-size: 16px;
  `,medium:`
    font-size: 20px;
  `,large:`
    font-size: 24px;
  `,"extra-large":`
    font-size: 32px;
  `},f=d.button(({theme:t,disabled:a,variant:r="default",size:o="large"})=>{const e=r==="default",n=()=>a?e?t.palette.content.light:t.palette.content.default:e?t.palette.content.default:t.palette.content.contrast,l=e?t.palette.accent.default:t.palette.accent.medium;return`
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: ${a?"not-allowed":"pointer"};

      > i {
        ${v[o]};
        color: ${n()};
      }

      &:not(:disabled) > i {
        &:hover, &:active {
          color: ${l};
        }
      }

      &:focus-visible {
        outline: 2px solid ${t.palette.primary.default};
      }

      ${u({theme:t,disabled:a})}
    `}),g=({children:t,dataTestId:a,isDisabled:r,ariaLabel:o,variant:e,size:n,onClick:l,...i})=>{const s=c=>{r||(c.preventDefault(),c.stopPropagation(),l&&l(c))};return p.jsx(f,{"aria-label":o,"data-testid":a||"icon-button",disabled:r,onClick:s,size:n,variant:e,...i,children:t})};export{g as I};
