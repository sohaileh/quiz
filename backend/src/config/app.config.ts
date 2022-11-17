import { env } from "process"

export default()=>({
    appSecret:env.JWT_SECRET
    
})
