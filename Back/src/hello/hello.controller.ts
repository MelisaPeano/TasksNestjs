import { Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { query } from 'express';
import { ValidateuserPipe } from './pipes/validateuser/validateuser.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

@Controller()
export class HelloController {
  
  @Get('tiket/:num') 
  getNumber(@Param('num', ParseIntPipe) num: number) {
   console.log(typeof num);
    return num + 13;
  }

  @Get('active/:status')
  isUserActive(@Param('status', ParseBoolPipe) status: boolean) {
    return status;
  }

  @Get('greet')
  @UseGuards(AuthGuard)
  greet(@Query(ValidateuserPipe) query: { name: string; age: number }) {
    return `Hello ${query.name}! You are ${query.age} years old`;
  }



}
