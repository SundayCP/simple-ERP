const isDebug=true

export function debug(...args) {
  if(isDebug){
    args.map(item=>{
      console.log(item)
    })
  }
}
