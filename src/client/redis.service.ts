import { InjectRedis } from "@nestjs-modules/ioredis";
import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
    constructor(
        @InjectRedis() private redis: Redis
    ) { }

    async getItem(key: string): Promise<any> {
        return this.redis.get(key)
    }

    async setItem(payload: { key: string, value: any, expireTime?: number }): Promise<any> {
        if (payload.expireTime)
            return await this.redis.setex(payload.key, payload.expireTime, payload.value)

        return await this.redis.set(payload.key, payload.value)
    }

    async deleteItem(key: string): Promise<any> {
        return this.redis.del(key)
    }
}