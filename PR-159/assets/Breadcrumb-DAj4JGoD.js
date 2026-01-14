var y=Object.defineProperty;var l=(e,t)=>y(e,"name",{value:t,configurable:!0});import{j as o}from"./jsx-runtime-Cgz2XvFB.js";import{r as s}from"./index-CwbBKW39.js";import{I as h}from"./Icon-BWIy_dZb.js";import{T as m}from"./Tooltip-D4LphEms.js";import{f as c,d as R}from"./emotion-styled.browser.esm-CIRWz9XU.js";import"./typography-B3nKKPHm.js";import"./index-q5AR_KnG.js";import"./index-DV-VXEUn.js";import{u as w}from"./useMedia-CRgJMRRc.js";import{u as $}from"./useDebounceResize-DUrVLZxz.js";const j=c.nav`
  ${({theme:e})=>`
    ${e.fontStyles.bodyMdRegular}
    color: ${e.palette.secondary.default};
    overflow: hidden;
  `}
`,v=c.ul`
  padding: 0px;
  margin: 0px;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: ${({theme:e})=>e.spacing.spacing_30};
`,B=c.li`
  ${({theme:e})=>`
    display: flex;

    &:not(:last-child) {
      ${e.fontStyles.linkMdRegular}
      color: ${e.palette.accent.default};
      cursor: pointer;

      svg {
        color: ${e.palette.accent.default};
      }
      
      & * {
        text-decoration: underline;
      }
      
      &:hover {
        color: ${e.palette.accent.dark};

        svg {
          color: ${e.palette.accent.dark};
        }
      }
    }

    a {
      color: inherit;
    }

    svg {
      color: ${e.palette.secondary.default};
    }

    &:last-child * {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `}
`,T=c.div`
  ${({theme:e})=>`
    display: flex;
    align-items: center;
    gap: ${e.spacing.spacing_20};
  `}
`,I=l((e,t)=>!!e.current&&!!t.current,"isBreadcrumbRefValid"),S=l(e=>{const t=s.useRef(null),r=s.useRef(null),n=R(),a=w(`(min-width: ${n.breakpoints.mq3}px)`),[d,p]=s.useState(e),g=s.useCallback(()=>{if(a||!I(t,r)){p(e);return}const u=s.Children.toArray(e);if(r.current.scrollWidth>t.current.clientWidth){const i=u[u.length-1],C=[u[0],o.jsx(b.Item,{children:o.jsx(h,{code:"more_horiz"})},"more-icon"),s.isValidElement(i)?s.cloneElement(i,{...i.props,style:{overflow:"hidden"}}):i];p(C)}},[e,a,t,r]);return $(g),{visibleChildren:d,breadcrumbRef:t,breadcrumbListRef:r}},"useCollapsedBreadcrumb"),f=30,b=l(({children:e,separator:t="slash"})=>{const{visibleChildren:r,breadcrumbRef:n,breadcrumbListRef:a}=S(e);return o.jsx(j,{"aria-label":"Breadcrumb","data-testid":"breadcrumb",ref:n,children:o.jsx(v,{ref:a,children:_(r,t)})})},"Breadcrumb"),E=l(({children:e,style:t})=>{const{truncatedChildren:r,tooltip:n}=x(e);return o.jsx(B,{style:t,children:o.jsxs(m,{style:{overflow:"hidden"},children:[o.jsx(T,{children:r}),o.jsx(m.Content,{children:n})]})})},"BreadcrumbItem"),L=l(e=>e.length>=f?`${e.substring(0,f)}...`:e,"truncateText"),x=l(e=>{let t="";return{truncatedChildren:s.Children.map(e,r=>{if(typeof r=="string"){const n=L(r);return t=n!==r?r:"",n}else if(s.isValidElement(r)){const{truncatedChildren:n,tooltip:a}=x(r.props.children);return t=a,s.cloneElement(r,{...r.props,children:n})}else return null}),tooltip:t}},"mapTruncateChildren"),_=l((e,t)=>{const r=l(()=>({slash:o.jsx("span",{children:"/"}),arrow:o.jsx(h,{code:"arrow_forward_ios",size:"extra-small"})})[t],"addSeparator"),n=l(a=>s.Children.count(e)-1===a,"isLastBreadcrumb");return s.Children.map(e,(a,d)=>o.jsxs(o.Fragment,{children:[a,!n(d)&&r()]}))},"withSeparator");b.Item=E;export{b as B};
