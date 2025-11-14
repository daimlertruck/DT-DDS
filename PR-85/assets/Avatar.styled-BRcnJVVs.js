import{f as l}from"./emotion-styled.browser.esm-DBghOYGd.js";const o={Letter:"letter",Collapsed:"collapsed",Thumbnail:"thumbnail",Photo:"photo"},e={Small:"small",Medium:"medium",Large:"large"},n={[e.Small]:"s",[e.Medium]:"m",[e.Large]:"l"},i=l.div`
  ${({theme:a,type:s,size:r})=>{let t=`
      & > * {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        text-transform: uppercase;
        border-radius: ${a.radius.radius_500};
      }
    `;switch(r){case e.Small:t+=`
          width: 20px;
          height: 20px;
          ${a.fontStyles.bodyXsBold};
        `;break;case e.Medium:t+=`
          width: ${a.spacing.spacing_60};
          height: ${a.spacing.spacing_60};
          ${a.fontStyles.bodyXsBold};
        `;break;case e.Large:t+=`
          width: ${a.spacing.spacing_70};
          height: ${a.spacing.spacing_70};
          ${a.fontStyles.bodySmBold};
        `;break}switch(s){case o.Letter:t+=`
          color: ${a.palette.content.contrast};
          
          & > * {
            background-color: ${a.palette.primary.default};
          }
        `;break;case o.Collapsed:t+=`
          color: ${a.palette.content.medium};
          
          & > * {
            background-color: ${a.palette.content.contrast};
          }
        `;break;case o.Thumbnail:t+=`
          color: ${a.palette.content.contrast};
          
          & > * {
            background-color: ${a.palette.primary.default};
          }
        `;break;case o.Photo:break}return t}}
`;export{e as A,n as I,o as a,i as b};
