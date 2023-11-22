const Questions = require("../models/Questions")

const calculate_m= async (q_id,r_id)=>{
    let sum=0
    let new_qs=[]
    const qs=await Questions.find({r_id:r_id},{questions:{_id:1,ans:1},'_id':0})
    qs.forEach(q=>new_qs.push(q))
    keys = []
    for (k in q_id[0]) {
        if (q_id[0].hasOwnProperty(k)) {
          keys.push(k);
        }
      }
    const ordered = Object.keys(q_id[0]).sort().reduce(
        (obj, key) => { 
          obj[key] = q_id[0][key]; 
          return obj;
        }, 
        {}
      );
    for(i=0;i<new_qs[0]['questions'].length;i++){
         if(new_qs[0]['questions'][i]['ans']==ordered[keys[i]]){
               sum=sum+1
         }
     }
     return sum
}

module.exports=calculate_m
