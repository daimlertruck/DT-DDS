import{s as a}from"./emotion-styled.browser.esm-BMKZqQy6.js";const o=48,n=20,r=a.div`
  ${({theme:t,hasLabel:e})=>`
    display: flex;
    gap: ${e?t.spacing.spacing_30:t.spacing.spacing_0};
    border-radius: ${n}px;
    align-items: center;
    width: fit-content;
  `};
`,s=a.label`
  ${({theme:t})=>`
    position: relative;
    width: ${o}px;
    height: 24px;
    border-radius: ${n}px;
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
`,i=a.input`
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
      transform: translateX(${o/2}px);
    }

    & ~ span {
      ${t.fontStyles.bodyMdRegular};
      cursor: ${e?"not-allowed":"pointer"};
      color: ${e?t.palette.content.light:t.palette.content.default};
      user-select: none;
    }
  `}
`;export{r as T,i as a,s as b};
