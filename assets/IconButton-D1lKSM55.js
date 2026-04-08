var d=Object.defineProperty;var p=(t,a)=>d(t,"name",{value:a,configurable:!0});import{j as f}from"./jsx-runtime-Cgz2XvFB.js";import{f as y}from"./emotion-styled.browser.esm-CIRWz9XU.js";const b={"extra-small":`
    font-size: 12px;
  `,small:`
    font-size: 16px;
  `,medium:`
    font-size: 20px;
  `,large:`
    font-size: 24px;
  `,"extra-large":`
    font-size: 32px;
  `},g=y.button(({theme:t,disabled:a,variant:e="default",size:c="large",cssOverrides:l})=>{const o=e==="default",r=p(()=>a?o?t.palette.content.light:t.palette.content.default:o?t.palette.content.default:t.palette.content.contrast,"baseColor"),i=o?t.palette.accent.default:t.palette.accent.medium,n=`
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: ${a?"not-allowed":"pointer"};

      > i {
        ${b[c]};
        color: ${r()};
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
    `;return l?[n,l]:n}),x=p(({children:t,dataTestId:a,isDisabled:e,ariaLabel:c,variant:l,size:o,onClick:r,cssOverrides:i,...n})=>{const u=p(s=>{e||(s.preventDefault(),s.stopPropagation(),r==null||r(s))},"handleClick");return f.jsx(g,{"aria-label":c,cssOverrides:i,"data-testid":a||"icon-button",disabled:e,onClick:u,size:o,variant:l,...n,children:t})},"IconButton");x.displayName="IconButton";export{x as I};
