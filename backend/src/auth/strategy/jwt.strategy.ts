import {PassportStrategy} from '@nestjs/passport';
import { ExtractJwt,Strategy } from 'passport-jwt';
import appConfig from 'src/config/app.config';

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){ 
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:appConfig().appSecret
        });
    }
    async validate(payload: any) {
        return {userId: payload.sub, username: payload.username}
    }
}