import{n as o}from"./emotion-styled.browser.esm-Dv69Fly8.js";const a=48,n=20,r=o.div`
  ${({theme:t,hasLabel:e})=>`
    display: flex;
    gap: ${e?t.spacing["5xs"]:t.spacing.none};
    border-radius: ${n}px;
    align-items: center;
    width: fit-content;

    :focus-visible {
      outline: 2px solid ${t.palette.primary.default};
      outline-offset: 2px;
    }
  `};
`,i=o.label`
  ${({theme:t})=>`
    position: relative;
    width: ${a}px;
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
`,s=o.input`
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;

  ${({theme:t,disabled:e})=>`
    & + label {
      background: ${e?t.palette.surface.default:t.palette.surface.medium};
      cursor: ${e?"not-allowed":"pointer"};
    }

    &:checked + label {
      background: ${e?t.palette.accent.light:t.palette.accent.default};
    }

    &:checked + label::after {
      transform: translateX(${a/2}px);
    }

    & ~ span {
      ${t.fontStyles.body2};
      cursor: ${e?"not-allowed":"pointer"};
      color: ${e?t.palette.content.light:t.palette.content.default};
      user-select: none;
    }
  `}
`;export{r as T,s as a,i as b};
