import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { PrismaModule } from './common/modules/prisma/prisma.module';
import { ConfigModule } from '@common/config';
import { ConfigSchema } from './config/config.schema';

@Module({
  imports: [
    ConfigModule.register(ConfigSchema),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    PrismaModule,
    BooksModule,
    AuthorsModule,
    PrismaModule,
  ],
})
export class AppModule {}
