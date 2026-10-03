var x=Object.defineProperty;var r=(t,e)=>x(t,"name",{value:e,configurable:!0});import{t as l}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as h}from"./jsx-runtime-Br4tQxt1.js";var c=48,p=20,$=l.div`
  ${({theme:t,hasLabel:e})=>`
    display: flex;
    gap: ${e?t.spacing.spacing_30:t.spacing.spacing_0};
    border-radius: ${p}px;
    align-items: center;
    width: fit-content;
  `};
`,b=l.label`
  ${({theme:t})=>`
    position: relative;
    width: ${c}px;
    height: 24px;
    border-radius: ${p}px;
    transition: background 0.3s ease;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: ${t.palette.content.contrast};
      transition: transform 0.3s ease;
      margin: 2px;
    }
  `};
`,k=l.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  ${({theme:t,disabled:e})=>`
    & + label {
      background: ${e?t.palette.surface.default:t.palette.surface.medium};
      cursor: ${e?"not-allowed":"pointer"};
    }


    &:focus-visible + label {
      outline: 2px solid ${t.palette.primary.default};
      outline-offset: 1px;
    }

    &:checked + label {
      background: ${e?t.palette.accent.light:t.palette.accent.default};
    }

    &:checked + label::after {
      transform: translateX(${c/2}px);
    }

    & ~ span {
      ${t.fontStyles.bodyMdRegular};
      cursor: ${e?"not-allowed":"pointer"};
      color: ${e?t.palette.content.light:t.palette.content.default};
      user-select: none;
    }
  `}
`,o=h(),_=r(({dataTestId:t,label:e,isDisabled:n=!1,isChecked:d=!1,onClick:i})=>{const s=t??"toggle",u=`${s}-checkbox-id`,g=r(a=>{n||i(a)},"handleClick"),f=r(a=>{n||a.key==="Enter"&&(a.preventDefault(),i(a))},"handleEnterClick");return(0,o.jsxs)($,{"data-testid":s,hasLabel:!!e,onClick:g,onKeyDown:f,children:[(0,o.jsx)(k,{checked:d,disabled:n,id:u,type:"checkbox"}),(0,o.jsx)(b,{}),(0,o.jsx)("span",{children:e})]})},"Toggle");export{_ as t};
