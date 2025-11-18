import{f as e}from"./emotion-styled.browser.esm-DBghOYGd.js";const o={Letter:"letter",Collapsed:"collapsed",Thumbnail:"thumbnail",Photo:"photo"},c=e.div`
  ${({theme:t,type:s,size:l})=>{let a=`
      & > * {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        border-radius: ${t.radius.radius_500};
      }
    `;const r={small:`
        width: 20px;
        height: 20px;
        ${t.fontStyles.bodyXsBold};
      `,medium:`
        width: ${t.spacing.spacing_60};
        height: ${t.spacing.spacing_60};
        ${t.fontStyles.bodyXsBold};
      `,large:`
        width: ${t.spacing.spacing_70};
        height: ${t.spacing.spacing_70};
        ${t.fontStyles.bodySmBold};
      `};switch(a+=r[l],s){case o.Letter:a+=`
          color: ${t.palette.content.contrast};
          
          & > * {
            background-color: ${t.palette.primary.default};
          }
        `;break;case o.Collapsed:a+=`
          color: ${t.palette.content.medium};
          
          & > * {
            background-color: ${t.palette.content.contrast};
          }
        `;break;case o.Thumbnail:a+=`
          color: ${t.palette.content.contrast};
          
          & > * {
            background-color: ${t.palette.primary.default};
          }
        `;break;case o.Photo:break}return a}}
`;export{o as A,c as a};
