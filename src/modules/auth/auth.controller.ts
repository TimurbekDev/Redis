import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';



class  LoginDto {
  @ApiProperty({
    description: 'Login email',
    example : 'timurbek@gmail.com'
  })
  email: string;
}

class CheckOtp {
  @ApiProperty({
    description: 'Login email',
    example : 'timurbek@gmail.com',
    type : String
  })
  email: string;

  @ApiProperty({
    description: 'OTP',
    example : 188283,
    type : Number
  })
  otp: number;
}


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login( @Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email);
  }

  @Post('check')
  checkOtp(@Body() checkOtp: CheckOtp){
    return this.authService.checkOtp(checkOtp.otp,checkOtp.email);
  }
}
