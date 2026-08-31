var s=Object.defineProperty;var n=(t,a)=>s(t,"name",{value:a,configurable:!0});import{t as f}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as y}from"./jsx-runtime-Br4tQxt1.js";var b={"extra-small":`
    font-size: 12px;
  `,small:`
    font-size: 16px;
  `,medium:`
    font-size: 20px;
  `,large:`
    font-size: 24px;
  `,"extra-large":`
    font-size: 32px;
  `},g=f.button(({theme:t,disabled:a,variant:o="default",size:i="large",cssOverrides:e})=>{const r=o==="default",p=n(()=>a?r?t.palette.content.light:t.palette.content.default:r?t.palette.content.default:t.palette.content.contrast,"baseColor"),c=r?t.palette.accent.default:t.palette.accent.medium,l=`
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: ${a?"not-allowed":"pointer"};

      > i {
        ${b[i]};
        color: ${p()};
      }

      &:not(:disabled) > i {
        &:hover, &:active {
          color: ${c};
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
    `;return e?[l,e]:l}),v=y(),x=n(({children:t,dataTestId:a,isDisabled:o,ariaLabel:i,variant:e,size:r,onClick:p,cssOverrides:c,...l})=>{const d=n(u=>{o||(u.preventDefault(),u.stopPropagation(),p?.(u))},"handleClick");return(0,v.jsx)(g,{"aria-label":i,cssOverrides:c,"data-testid":a||"icon-button",disabled:o,onClick:d,size:r,variant:e,...l,children:t})},"IconButton");x.displayName="IconButton";export{x as t};
