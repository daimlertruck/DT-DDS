var g=Object.defineProperty;var i=(e,t)=>g(e,"name",{value:t,configurable:!0});import{o as C}from"./rolldown-runtime-CzYk_CEw.js";import{t as y}from"./react-HNhQAnN4.js";import{o as w,t as d,u as R}from"./emotion-styled.browser.esm-BD_8_ENF.js";import{t as h}from"./src-Cgsrikn0.js";import{t as $}from"./jsx-runtime-Br4tQxt1.js";import"./icon-BVKwuEsa.js";import{t as m}from"./Tooltip-CV1x-ycZ.js";import{i as j,t as S}from"./core-DtZ76Qs_.js";import"./tooltip-B7p4pHEA.js";var B=d.nav`
  ${({theme:e})=>`
    ${e.fontStyles.bodyMdRegular}
    color: ${e.palette.secondary.default};
    overflow: hidden;
  `}
`,I=d.ul`
  padding: 0px;
  margin: 0px;
  width: 100%;
  list-style: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: ${({theme:e})=>e.spacing.spacing_30};
`,T=d.li`
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
`,E=d.div`
  ${({theme:e})=>`
    display: flex;
    align-items: center;
    gap: ${e.spacing.spacing_20};
  `}
`,n=C(y());w();var o=$(),k=i((e,t)=>!!e.current&&!!t.current,"isBreadcrumbRefValid"),M=i(e=>{const t=(0,n.useRef)(null),r=(0,n.useRef)(null),a=R(),s=j(`(min-width: ${a.breakpoints.mq3}px)`),[c,p]=(0,n.useState)(e),_=(0,n.useCallback)(()=>{if(s||!k(t,r)){p(e);return}const u=n.Children.toArray(e);if(r.current.scrollWidth>t.current.clientWidth){const l=u[u.length-1],x=[u[0],(0,o.jsx)(b.Item,{children:(0,o.jsx)(h,{code:"more_horiz"})},"more-icon"),(0,n.isValidElement)(l)?(0,n.cloneElement)(l,{...l.props,style:{overflow:"hidden"}}):l];p(x)}},[e,s,t,r]);return S(_),{visibleChildren:c,breadcrumbRef:t,breadcrumbListRef:r}},"useCollapsedBreadcrumb"),f=30,b=i(({children:e,separator:t="slash"})=>{const{visibleChildren:r,breadcrumbRef:a,breadcrumbListRef:s}=M(e);return(0,o.jsx)(B,{"aria-label":"Breadcrumb","data-testid":"breadcrumb",ref:a,children:(0,o.jsx)(I,{ref:s,children:z(r,t)})})},"Breadcrumb"),A=i(({children:e,style:t})=>{const{truncatedChildren:r,tooltip:a}=v(e);return(0,o.jsx)(T,{style:t,children:(0,o.jsxs)(m,{style:{overflow:"hidden"},children:[(0,o.jsx)(E,{children:r}),(0,o.jsx)(m.Content,{children:a})]})})},"BreadcrumbItem"),L=i(e=>e.length>=f?`${e.substring(0,f)}...`:e,"truncateText"),v=i(e=>{let t="";return{truncatedChildren:n.Children.map(e,r=>{if(typeof r=="string"){const a=L(r);return t=a!==r?r:"",a}else if((0,n.isValidElement)(r)){const{truncatedChildren:a,tooltip:s}=v(r.props.children);return t=s,(0,n.cloneElement)(r,{...r.props,children:a})}else return null}),tooltip:t}},"mapTruncateChildren"),z=i((e,t)=>{const r=i(()=>({slash:(0,o.jsx)("span",{children:"/"}),arrow:(0,o.jsx)(h,{code:"arrow_forward_ios",size:"extra-small"})})[t],"addSeparator"),a=i(s=>n.Children.count(e)-1===s,"isLastBreadcrumb");return n.Children.map(e,(s,c)=>(0,o.jsxs)(o.Fragment,{children:[s,!a(c)&&r()]}))},"withSeparator");b.Item=A;export{b as t};
