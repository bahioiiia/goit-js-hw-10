import{i as s}from"./vendor-d07556bb.js";document.querySelector(".form").addEventListener("submit",function(r){r.preventDefault();const t=parseInt(document.querySelector('input[name="delay"]').value),i=document.querySelector('input[name="state"]:checked').value;new Promise((e,n)=>{setTimeout(()=>{i==="fulfilled"?e(t):n(t)},t)}).then(e=>{s.success({title:"Success",message:`✅ Fulfilled promise in ${e} ms`})}).catch(e=>{s.error({title:"Error",message:`❌ Rejected promise in ${e} ms`})})});
//# sourceMappingURL=2-snackbar-9c1a8129.js.map
