import { Module, Global } from "@nestjs/common";
import { HttpModule as NestHttpModule } from "@nestjs/axios";

@Global()
@Module({
  imports: [NestHttpModule],
  providers: [],
  exports: [NestHttpModule],
})
export class AxiosModule {}
