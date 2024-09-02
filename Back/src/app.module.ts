import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { AuhController } from './auh/auh.controller';

@Module({
  imports: [TasksModule, AuthModule, UsersModule, ProjectsModule],
  controllers: [AppController, AuhController],
  providers: [AppService],
})
export class AppModule {}
