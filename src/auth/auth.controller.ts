import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dto';
import { Tokens } from 'src/types';
import { RtGuard } from 'src/common/guards';
import { Auth, GetCurrentUser } from 'src/common/decorators';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto);
  }

  @Auth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUser('sub') sub: string) {
    return this.authService.logout(+sub);
  }

  @UseGuards(RtGuard)
  @ApiOkResponse({ description: 'should send refresh token as Bearer header.' })
  @ApiBearerAuth()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@GetCurrentUser() user: any) {
    return this.authService.refresh(+user['sub'], user['refreshToken']);
  }
}
