/* eslint-disable prettier/prettier */
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Identity } from './identity.interface';
import { IdentityService } from './identity.service';

@Controller('identity')
export class IdentityController {
  constructor(
    @Inject(IdentityService)
    private readonly identityService: IdentityService,
  ) {}

  @Post('process')
  async processIdentity(@Body('bvn') bvn: string): Promise<Identity> {
    return this.identityService.processIdentity(bvn);
  }
}
