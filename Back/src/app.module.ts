import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TasksModule } from "./tasks/tasks.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ProjectsModule } from "./projects/projects.module";
import { HelloModule } from "./hello/hello.module";
import { ConfigModule } from "@nestjs/config";
import { AuthService } from "./auth/auth.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      // Variables de entorno globales
      isGlobal: true,
    }),
    TasksModule,
    AuthModule,
    UsersModule,
    ProjectsModule,
    HelloModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
