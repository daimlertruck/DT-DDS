var d=Object.defineProperty;var c=(t,a)=>d(t,"name",{value:a,configurable:!0});import{j as f}from"./jsx-runtime-Cgz2XvFB.js";import{f as y}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const b={"extra-small":`
    font-size: 12px;
  `,small:`
    font-size: 16px;
  `,medium:`
    font-size: 20px;
  `,large:`
    font-size: 24px;
  `,"extra-large":`
    font-size: 32px;
  `},g=y.button(({theme:t,disabled:a,variant:r="default",size:p="large",cssOverrides:e})=>{const o=r==="default",l=c(()=>a?o?t.palette.content.light:t.palette.content.default:o?t.palette.content.default:t.palette.content.contrast,"baseColor"),i=o?t.palette.accent.default:t.palette.accent.medium,n=`
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: ${a?"not-allowed":"pointer"};

      > i {
        ${b[p]};
        color: ${l()};
      }

      &:not(:disabled) > i {
        &:hover, &:active {
          color: ${i};
        }
      }

      &:focus-visible {
        outline: 2px solid ${t.palette.primary.default};
      }

      &:hover:not(:disabled) {
        [data-avatar-type='letter'] {
          background-color: ${t.palette.primary.dark};
        }

        [data-avatar-type='collapsed'] {
          background-color: ${t.palette.primary.light};
        }

        [data-avatar-type='thumbnail'] {
          background-color: ${t.palette.primary.dark};
        }
      }

    ${a&&`
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
      `}
    `;return e?[n,e]:n}),k=c(({children:t,dataTestId:a,isDisabled:r,ariaLabel:p,variant:e,size:o,onClick:l,cssOverrides:i,...n})=>{const u=c(s=>{r||(s.preventDefault(),s.stopPropagation(),l&&l(s))},"handleClick");return f.jsx(g,{"aria-label":p,cssOverrides:i,"data-testid":a||"icon-button",disabled:r,onClick:u,size:o,variant:e,...n,children:t})},"IconButton");export{k as I};
