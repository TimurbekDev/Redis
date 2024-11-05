import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { RedisCustomModule } from './client/redis.module';
import { AuthModule } from './modules';

@Module({
  imports: [
    RedisModule.forRoot({
      type : 'single',
      options : {
        port : 6379,
        host : 'localhost'
      }
    }),
    RedisCustomModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
