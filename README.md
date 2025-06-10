# nestjs-auth-demo

A NestJS project demonstrating user authentication with:

- User registration (email/username + password + confirmation)  
- JWT token issuance and validation  
- User login with JWT token response  
- PostgreSQL database via TypeORM  
- End-to-end tests for auth flows  
- Swagger docs for API exploration  

---

## Setup

1. Clone the repo:

```bash
git clone <your-repo-url>
cd nestjs-auth-demo

### Install Dependencies
npm install

####CReate .env file
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_name
JWT_SECRET=your_jwt_secret


npm run start:dev

#####Set up Swagger API Docs
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('User registration and login with JWT')
    .setVersion('1.0')
    .addBearerAuth()  // Adds "Authorize" button for JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

testing:
npm run test

npm run test:e2e

#LICENSE


---

This README clearly explains your project, how to set it up, run it, test it, and use Swagger.

**To add Swagger docs to your project (if you haven’t already), just add this to your `src/main.ts`:**

```ts
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('User registration and login with JWT')
    .setVersion('1.0')
    .addBearerAuth()  // Adds "Authorize" button for JWT token input
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();


###########FINAL STEP: visit local host : port 3000 
http://localhost:3000/docs



