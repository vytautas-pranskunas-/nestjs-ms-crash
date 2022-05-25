export const configuration = () => ({
    production: process.env.NODE_ENV === 'production',
    /*  rabbitMQUrl: 'amqp://localhost:5672',
     redisUrl: 'redis://localhost:6379?defaultDatabase=0', */
    rabbitMQUrl: 'amqp://rabbitmq:5672',
    redisUrl: 'redis://redis-db:6379?defaultDatabase=0',
    db: {
        host: process.env.DB_HOST || '127.0.0.1',
        database: process.env.DB_DATABASE || 'seven_seven',
        username: process.env.DB_USERNAME || '',
        password: process.env.DB_PASSWORD || '',
        port: parseInt(process.env.DATABASE_PORT, 10) || 27017
    }
});
