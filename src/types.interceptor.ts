import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { XMLBuilder } from 'fast-xml-parser';
import { Request } from 'express';

@Injectable()
export class TypesInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const shouldConvert = req.headers['accept'] === 'application/xml';

    return next.handle().pipe(
      map((data) => {
        if (!shouldConvert) {
          return data;
        }
        const builder = new XMLBuilder({});
        const xmlContent = builder.build(data);
        return xmlContent;
      }),
    );
  }
}
