import { Injectable, NotFoundException } from '@nestjs/common';
import { RedisService } from 'src/client/redis.service';

declare interface User {
  id: number
  email: string
}

@Injectable()
export class AuthService {

  constructor(
    private redisService: RedisService
  ) { }
  private users: User[] = [{
    id: 1,
    email: 'timurbek@gmail.com'
  }]

  async login(email: string) {
    const user = this.users.find(u => u.email == email)

    if (!user)
      throw new NotFoundException('Not found')

    const otp = this.generateOtp()

    await this.redisService.setItem({
      key: email,
      value: otp,
      expireTime: 120
    })

    return {
      message: 'OTP',
      otp,
      len: otp.toString().length
    }
  }

  private generateOtp() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async checkOtp(otp:number,email:string){
    const userOtp = await this.redisService.getItem(email)
    if(userOtp==otp)
      return true
    return false
  }
}
