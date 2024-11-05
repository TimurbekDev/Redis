import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";
import Redis from "ioredis";

@Module({
    providers: [RedisService],
})
export class RedisCustomModule {}