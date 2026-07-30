var v=Object.defineProperty;var d=(a,o)=>v(a,"name",{value:o,configurable:!0});function m(a){for(var o=[],c=1;c<arguments.length;c++)o[c-1]=arguments[c];var n=Array.from(typeof a=="string"?[a]:a);n[n.length-1]=n[n.length-1].replace(/\r?\n([\t ]*)$/,"");var s=n.reduce(function(t,u){var i=u.match(/\n([\t ]+|(?!\s).)/g);return i?t.concat(i.map(function(f){var r,e;return(e=(r=f.match(/[\t ]/g))===null||r===void 0?void 0:r.length)!==null&&e!==void 0?e:0})):t},[]);if(s.length){var h=new RegExp(`
[	 ]{`+Math.min.apply(Math,s)+"}","g");n=n.map(function(t){return t.replace(h,`
`)})}n[0]=n[0].replace(/^\r?\n/,"");var g=n[0];return o.forEach(function(t,u){var i=g.match(/(?:^|\n)( *)$/),f=i?i[1]:"",r=t;typeof t=="string"&&t.includes(`
`)&&(r=String(t).split(`
`).map(function(e,l){return l===0?e:""+f+e}).join(`
`)),g+=r+n[u+1]}),g}d(m,"dedent");export{m as d};
