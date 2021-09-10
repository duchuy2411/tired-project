import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';
import jwt_decode from "jwt-decode";
import  { UsersService } from "./users.service";

import { split } from 'lodash';

export const UserDecor = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const service = Inject(UsersService);

    const request = ctx.switchToHttp().getRequest();
    const headers = request.headers;
    console.log(headers);
    const token = split(headers.authorization, ' ');
    const decode = jwt_decode(token[1]);
    const user = await service.findOne(decode.username);

    return request.headers;
  },
);