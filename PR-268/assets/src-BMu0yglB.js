var Qe=Object.defineProperty;var n=(e,a)=>Qe(e,"name",{value:a,configurable:!0});import{n as o,o as De}from"./rolldown-runtime-CzYk_CEw.js";import{t as E}from"./react-HNhQAnN4.js";import{c as _e,f as ye,n as S,t as k}from"./emotion-styled.browser.esm-Wn4chyPq.js";import{t as A}from"./jsx-runtime-Br4tQxt1.js";import{r as pe,t as Ze}from"./src-CWG58mNI.js";import{t as ea}from"./Typography-DNIQVTD9.js";import{a as O,l as xe,t as T}from"./core-DmiSeBqo.js";import{n as aa}from"./Avatar-B_3f8Sge.js";import{t as ta}from"./src-CYYpCRzL.js";import{t as na}from"./box-Dhy-LEcB.js";import{t as ra}from"./typography-C8wNpR33.js";function Se(){return(Se=o((()=>{aa()})))()}n(Se,"init_src");function ia(){return(ia=o((()=>{Se()})))()}n(ia,"init_avatar");var ke,p;function m(){return(m=o((()=>{ke="calc(100% / 3)",p={NAVIGATION:"AppHeader.Navigation",APP_NAME:"AppHeader.AppName",LOGO:"AppHeader.Logo",ACTIONS:"AppHeader.Actions"}})))()}n(m,"init_constants");var Te;function Ce(){return(Ce=o((()=>{k(),m(),Te=S.header`
  ${({theme:e,isMobile:a})=>{const t=e.spacing.spacing_60;return`
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: ${e.spacing.spacing_50};
      width: 100%;
      height: ${a?"72px":"64px"};
      overflow: hidden;
      padding: 0 ${t};
      position: fixed;
      top: 0;
      z-index: 1;
      background: ${e.palette.surface.contrast};
    `}}
`})))()}n(Ce,"init_AppHeader_styled");var B,ce,z,P,C;function ve(){return(ve=o((()=>{B=E(),ce=A(),z=(0,B.createContext)(null),P=n(({value:e,children:a})=>(0,ce.jsx)(z.Provider,{value:e,children:a}),"AppHeaderContextProvider"),C=n(()=>{const e=(0,B.useContext)(z);if(!e)throw new Error("AppHeader compound components must be used within AppHeader");return e},"useAppHeaderContext");try{P.displayName="AppHeaderContextProvider",P.__docgenInfo={description:"",displayName:"AppHeaderContextProvider",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/app-header/src/context/AppHeaderContext.tsx",methods:[],props:{value:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/context/AppHeaderContext.tsx",name:"AppHeaderContextProviderProps"}],description:"",name:"value",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/context/AppHeaderContext.tsx",name:"AppHeaderContextProviderProps"},required:!0,tags:{},type:{name:"AppHeaderContextValue"}}},tags:{}}}catch{}})))()}n(ve,"init_AppHeaderContext");function D(){return(D=o((()=>{ve()})))()}n(D,"init_context");var He,$e;function we(){return(we=o((()=>{He=n((e,a,t,r)=>({isStandard:e==="standard",isCompact:e==="compact",isNavCenter:a==="center",isNavLeft:a==="left",isNavRight:a==="right",isNavCompact:e==="compact"||!t,hasAppName:!!t,isActionsPositionRight:r}),"computeHeaderState"),$e=n((e,a)=>e==="standard"&&!!a,"shouldCenterLogo")})))()}n(we,"init_headerState");var u,h,$,Z,Pe,be,ee,te;function ne(){return(ne=o((()=>{u=De(E()),h=n(e=>e.type?.displayName,"getDisplayName"),$=n((e,a)=>{const t=u.Children.toArray(e);for(const r of t)if(u.isValidElement(r)){if(a(r))return r;const i=r.props;if(i?.children){const s=$(i.children,a);if(s)return s}}return null},"findChildRecursive"),Z=n((e,a)=>$(e,t=>h(t)===a),"findChildByType"),Pe=n((e,a,t,r)=>$(e,i=>{if(h(i)!==a)return!1;const s=i.props;return t in s&&s[t]===r}),"findChildByTypeAndProp"),be=n((e,a,t,r)=>u.Children.toArray(e).findIndex(i=>{if(!u.isValidElement(i)||h(i)!==a)return!1;const s=i.props;return t in s&&s[t]===r}),"findChildIndexByTypeAndProp"),ee=n((e,a,t)=>{if(!u.isValidElement(e))return t;const r=e.props;return a in r&&r[a]!==void 0?r[a]:t},"extractProp"),te=n((e,a)=>{const t={};return u.Children.toArray(e).forEach((r,i)=>{if(u.isValidElement(r)){const s=h(r);s&&a.includes(s)&&(t[s]=i)}}),t},"findChildIndices")})))()}n(ne,"init_children");var y,de,b,ae,I,L;function Ie(){return(Ie=o((()=>{y=De(E()),na(),Ze(),m(),ne(),de=A(),b=n((e,a)=>Math.abs(e-a)===1,"areSiblings"),ae=n((e,a,t,r)=>{const i=y.Children.toArray(e),s=[];let c=0;for(;c<i.length;){const d=i[c],l=c+1<i.length?i[c+1]:null;if(y.isValidElement(d)&&y.isValidElement(l)){const g=h(d),f=h(l);if(g&&f&&a.includes(g)&&a.includes(f)&&b(c,c+1)){s.push((0,de.jsxs)(ta,{style:{display:"flex",flexWrap:"nowrap",flexDirection:t?"column":"row",alignItems:t?"flex-start":"center",justifyContent:t?"center":"flex-start",height:t?"48px":"auto",gap:t?pe.spacing.spacing_0:pe.spacing.spacing_30,...r},children:[d,l]},`group-${c}`)),c+=2;continue}}s.push(d),c++}return s},"groupSiblingComponents"),I=n(e=>!e.isNavRight||!e.isActionsPositionRight?!1:e.isCompact||e.isStandard&&!e.hasAppName,"shouldGroupNavigationAndActions"),L=n((e,a,t)=>{const r=e,i=te(r,[p.NAVIGATION,p.ACTIONS])[p.NAVIGATION]??-1,s=be(r,p.ACTIONS,"position","right");return i!==-1&&s!==-1&&b(i,s)?ae(r,[p.NAVIGATION,p.ACTIONS],a,{position:"fixed",right:t.spacing.spacing_60}):Array.isArray(e)?e:y.Children.toArray(e)},"groupNavigationAndActionsIfSiblings");try{I.displayName="shouldGroupNavigationAndActions",I.__docgenInfo={description:"",displayName:"shouldGroupNavigationAndActions",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/app-header/src/utils/composition.tsx",methods:[],props:{isStandard:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"}],description:"",name:"isStandard",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"},required:!0,tags:{},type:{name:"boolean"}},isCompact:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"}],description:"",name:"isCompact",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"},required:!0,tags:{},type:{name:"boolean"}},isNavCenter:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"}],description:"",name:"isNavCenter",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"},required:!0,tags:{},type:{name:"boolean"}},isNavLeft:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"}],description:"",name:"isNavLeft",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"},required:!0,tags:{},type:{name:"boolean"}},isNavRight:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"}],description:"",name:"isNavRight",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"},required:!0,tags:{},type:{name:"boolean"}},isNavCompact:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"}],description:"",name:"isNavCompact",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"},required:!0,tags:{},type:{name:"boolean"}},hasAppName:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"}],description:"",name:"hasAppName",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"},required:!0,tags:{},type:{name:"boolean"}},isActionsPositionRight:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"}],description:"",name:"isActionsPositionRight",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/utils/headerState.ts",name:"HeaderState"},required:!0,tags:{},type:{name:"boolean"}}},tags:{}}}catch{}try{L.displayName="groupNavigationAndActionsIfSiblings",L.__docgenInfo={description:`Applies fixed positioning when
grouping Navigation and Actions with position="right".
Accepts either ReactNode or ReactNode[] and always returns ReactNode[].`,displayName:"groupNavigationAndActionsIfSiblings",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/app-header/src/utils/composition.tsx",methods:[],props:{},tags:{}}}catch{}})))()}n(Ie,"init_composition");function Le(){return(Le=o((()=>{we(),ne(),Ie()})))()}n(Le,"init_utils");var W,U,V;function Ve(){return(Ve=o((()=>{W=E(),_e(),T(),Ce(),m(),D(),Le(),U=A(),V=n(({type:e="standard",style:a,children:t,...r})=>{const i=ye(),s=xe(`(max-width: ${i.breakpoints.mq3}px)`),c=ee(Z(t,p.NAVIGATION),"position","center"),d=ee(Z(t,p.APP_NAME),"name",void 0),l=te(t,[p.APP_NAME,p.LOGO,p.NAVIGATION,p.ACTIONS]),g=l[p.APP_NAME]??-1,f=l[p.LOGO]??-1,v=$e(e,d),H=g!==-1&&f!==-1&&b(g,f),M=Pe(t,p.ACTIONS,"position","right")!==null,N=He(e,c,d,M),R=(0,W.useMemo)(()=>({state:N,shouldCenterLogo:v,hasAppNameAsSibling:H,isMobile:s}),[N,v,H,s]),G=(0,W.useMemo)(()=>{let _=ae(t,[p.APP_NAME,p.LOGO],s);return I(N)&&(_=L(_,s,i)),_},[t,N,s,i]);return(0,U.jsx)(P,{value:R,children:(0,U.jsx)(Te,{isMobile:s,style:a,...r,children:G})})},"AppHeader$1");try{V.displayName="AppHeader",V.__docgenInfo={description:"",displayName:"AppHeader",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/app-header/src/AppHeader.tsx",methods:[],props:{type:{defaultValue:{value:"standard"},declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/AppHeader.tsx",name:"AppHeaderProps"}],description:"",name:"type",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/AppHeader.tsx",name:"AppHeaderProps"},required:!1,tags:{},type:{name:"HeaderType | undefined"}}},tags:{}}}catch{}})))()}n(Ve,"init_AppHeader");var le,ue,me,j;function je(){return(je=o((()=>{k(),m(),le=n((e,a)=>e==="left"?"relative":a.isNavRight?a.isStandard&&a.hasAppName?"fixed":"relative":"fixed","getActionsPosition"),ue=n((e,a,t)=>{if(a==="left")return"auto";const r=e.spacing.spacing_60;return t.isNavRight?t.isStandard&&t.hasAppName?r:0:r},"getActionsRight"),me=n((e,a)=>{if(a==="left")return"auto";const{isNavLeft:t,isStandard:r,hasAppName:i}=e;return t&&r&&!i?"auto":ke},"getActionsMinWidth"),j=S.div`
  ${({theme:e,state:a,position:t="right"})=>`
      display: flex;
      align-items: center;
      position: ${le(t,a)};
      right: ${ue(e,t,a)};
      min-width: ${me(a,t)};
      flex-direction: row;
      justify-content: ${t==="left"?"flex-start":"flex-end"};
      gap: ${e.spacing.spacing_50};
    `}
`;try{j.displayName="ActionsContainer",j.__docgenInfo={description:"",displayName:"ActionsContainer",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/app-header/src/components/Actions/Actions.styled.tsx",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},state:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/components/Actions/Actions.styled.tsx",name:"ActionsContainerProps"}],description:"",name:"state",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/components/Actions/Actions.styled.tsx",name:"ActionsContainerProps"},required:!0,tags:{},type:{name:"HeaderState"}},isMobile:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/components/Actions/Actions.styled.tsx",name:"ActionsContainerProps"}],description:"",name:"isMobile",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/components/Actions/Actions.styled.tsx",name:"ActionsContainerProps"},required:!0,tags:{},type:{name:"boolean"}},position:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/components/Actions/Actions.styled.tsx",name:"ActionsContainerProps"}],description:"",name:"position",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/components/Actions/Actions.styled.tsx",name:"ActionsContainerProps"},required:!1,tags:{},type:{name:'"left" | "right" | undefined'}}},tags:{}}}catch{}})))()}n(je,"init_Actions_styled");var ge,F,qe;function Ee(){return(Ee=o((()=>{_e(),T(),je(),D(),ge=A(),F=n(({children:e,position:a="right",...t})=>{const r=ye(),i=xe(`(max-width: ${r.breakpoints.mq3}px)`),{state:s}=C();return(0,ge.jsx)(j,{isMobile:i,position:a,state:s,...t,children:e})},"ActionsBase"),F.displayName="AppHeader.Actions",qe=O(F)})))()}n(Ee,"init_Actions");function re(){return(re=o((()=>{Ee()})))()}n(re,"init_Actions$1");var x;function Oe(){return(Oe=o((()=>{k(),m(),x=S.div`
  ${({theme:e,state:a,isMobile:t})=>`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: auto;
      width: auto;
      max-width: 170px;
      max-height: 50px;
      
      ${t&&a.isStandard?"justify-content: flex-start;":""}

      @media screen and (min-width: ${e.breakpoints.mq3}px) {
        max-width: 250px;
      }
      
      > * {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
     
    `}
`;try{x.displayName="AppNameContainer",x.__docgenInfo={description:"",displayName:"AppNameContainer",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/app-header/src/components/AppName/AppName.styled.tsx",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},state:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/components/AppName/AppName.styled.tsx",name:"AppNameContainerProps"}],description:"",name:"state",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/components/AppName/AppName.styled.tsx",name:"AppNameContainerProps"},required:!0,tags:{},type:{name:"HeaderState"}},isMobile:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/components/AppName/AppName.styled.tsx",name:"AppNameContainerProps"}],description:"",name:"isMobile",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/components/AppName/AppName.styled.tsx",name:"AppNameContainerProps"},required:!0,tags:{},type:{name:"boolean"}}},tags:{}}}catch{}})))()}n(Oe,"init_AppName_styled");var w,J,Me;function Re(){return(Re=o((()=>{T(),ra(),Oe(),D(),w=A(),J=n(({name:e,children:a,...t})=>{const{state:r,isMobile:i}=C(),s=r.isStandard?"h5":"h5Bold",c=i?"h6Bold":s,d=a??e;return d?a?(0,w.jsx)(x,{isMobile:i,state:r,...t,children:d}):(0,w.jsx)(x,{isMobile:i,state:r,...t,children:(0,w.jsx)(ea,{color:"primary.default",element:"span",fontStyles:c,children:d})}):null},"AppNameBase"),J.displayName="AppHeader.AppName",Me=O(J)})))()}n(Re,"init_AppName");function ie(){return(ie=o((()=>{Re()})))()}n(ie,"init_AppName$1");var q;function Ge(){return(Ge=o((()=>{k(),m(),q=S.div`
  ${({shouldCenterLogo:e})=>`
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      min-width: auto;
      height: auto;
      
      img,
      [data-nextjs-image],
      svg,
      > * {
        display: flex;
        max-height: 54px;
        width: auto;
        height: auto;
        object-fit: contain;
      }

      ${e?`
      width: auto;
      min-width: auto;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    `:""}
    `}
`;try{q.displayName="LogoContainer",q.__docgenInfo={description:"",displayName:"LogoContainer",filePath:"/home/runner/work/DT-DDS/DT-DDS/packages/react-packages/app-header/src/components/Logo/Logo.styled.tsx",methods:[],props:{theme:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"theme",required:!1,tags:{},type:{name:"Theme | undefined"}},as:{defaultValue:null,declarations:[{fileName:"DT-DDS/node_modules/@emotion/styled/dist/declarations/src/index.d.ts",name:"TypeLiteral"}],description:"",name:"as",required:!1,tags:{},type:{name:"ElementType<any, keyof IntrinsicElements> | undefined"}},shouldCenterLogo:{defaultValue:null,declarations:[{fileName:"DT-DDS/packages/react-packages/app-header/src/components/Logo/Logo.styled.tsx",name:"LogoContainerProps"}],description:"",name:"shouldCenterLogo",parent:{fileName:"DT-DDS/packages/react-packages/app-header/src/components/Logo/Logo.styled.tsx",name:"LogoContainerProps"},required:!0,tags:{},type:{name:"boolean"}}},tags:{}}}catch{}})))()}n(Ge,"init_Logo_styled");var fe,X,Be;function ze(){return(ze=o((()=>{T(),Ge(),D(),fe=A(),X=n(({children:e,...a})=>{const{shouldCenterLogo:t,isMobile:r}=C();return(0,fe.jsx)(q,{shouldCenterLogo:t&&!r,...a,children:e})},"LogoBase"),X.displayName="AppHeader.Logo",Be=O(X)})))()}n(ze,"init_Logo");function se(){return(se=o((()=>{ze()})))()}n(se,"init_Logo$1");var Y,K,he,Ae,We;function Ue(){return(Ue=o((()=>{k(),m(),Y={absoluteCenter:`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    max-width: calc(100% - 400px); // hardcoded value to avoid layout shift
    min-width: 0;
    overflow: hidden;
  `,autoMargins:`
    margin-left: auto;
    margin-right: auto;
  `},K=n(e=>e.isNavCenter?e.isNavCompact||!e.hasAppName:!1,"shouldUseAbsoluteCenter"),he=n(e=>K(e)?Y.absoluteCenter:e.isNavCenter?Y.autoMargins:"","getNavigationCenteringStyles"),Ae=n((e,a,t)=>e?"center":a?"flex-start":t?"flex-end":"center","getJustifyContent"),We=S.nav`
  ${({theme:e,state:a})=>{const{isStandard:t,hasAppName:r,isNavCompact:i,isNavLeft:s,isNavRight:c}=a,d=t&&r,l=K(a),g=d?"fixed":"relative",f=i?0:"64px",v=i?"auto":"100%",H=i?"auto":"52px",M=l?"absolute":g,N=l?"50%":f,R=l?"50%":"0",G=l?"auto":"0",_=l?"auto":v,Ye=Ae(l,s,c),Ke=he(a);return`
      position: ${M};
      top: ${N};
      left: ${R};
      right: ${G};
      z-index: 1;
      width: ${_};
      min-height: ${H};
      height: auto;
      background-color: ${e.palette.surface.contrast};
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: ${Ye};
      padding: 0 ${e.spacing.spacing_60};

      ${Ke}
    `}}
`})))()}n(Ue,"init_Navigation_styled");var Ne,Q,Fe;function Je(){return(Je=o((()=>{T(),Ue(),D(),Ne=A(),Q=n(({children:e,...a})=>{const{state:t}=C();return(0,Ne.jsx)(We,{state:t,...a,children:e})},"NavigationBase"),Q.displayName="AppHeader.Navigation",Fe=O(Q)})))()}n(Je,"init_Navigation");function oe(){return(oe=o((()=>{Je()})))()}n(oe,"init_Navigation$1");function Xe(){return(Xe=o((()=>{se(),ie(),oe(),re()})))()}n(Xe,"init_components");var sa;function oa(){return(oa=o((()=>{Ve(),re(),ie(),se(),oe(),Xe(),sa=Object.assign(V,{Logo:Be,AppName:Me,Navigation:Fe,Actions:qe})})))()}n(oa,"init_src$1");export{oa as n,ia as r,sa as t};
