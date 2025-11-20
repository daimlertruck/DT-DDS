var p=Object.defineProperty;var r=(t,o)=>p(t,"name",{value:o,configurable:!0});import{j as f}from"./jsx-runtime-Cgz2XvFB.js";import{f as d}from"./emotion-styled.browser.esm-Cgg3GKEJ.js";const x={"extra-small":`
    font-size: 12px;
  `,small:`
    font-size: 16px;
  `,medium:`
    font-size: 20px;
  `,large:`
    font-size: 24px;
  `,"extra-large":`
    font-size: 32px;
  `},b=d.button(({theme:t,disabled:o,variant:n="default",size:l="large"})=>{const e=n==="default",i=r(()=>o?e?t.palette.content.light:t.palette.content.default:e?t.palette.content.default:t.palette.content.contrast,"baseColor"),a=e?t.palette.accent.default:t.palette.accent.medium;return`
      display: flex;
      align-items: center;
      border: none;
      background-color: transparent;
      cursor: ${o?"not-allowed":"pointer"};

      i {
        ${x[l]};
        color: ${i()};
      }

      &:not(:disabled) > i {
        &:hover, &:active {
          color: ${a};
        }
      }

      &:focus-visible {
        outline: 2px solid ${t.palette.primary.default};
      }
    `}),v=r(({children:t,dataTestId:o,isDisabled:n,ariaLabel:l,variant:e,size:i,onClick:a,...c})=>{const u=r(s=>{n||(s.preventDefault(),s.stopPropagation(),a&&a(s))},"handleClick");return f.jsx(b,{"aria-label":l,"data-testid":o||"icon-button",disabled:n,onClick:u,size:i,variant:e,...c,children:t})},"IconButton");export{v as I};
