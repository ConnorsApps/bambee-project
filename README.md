# Task Manager

## Tech Stack
- Language 
	> Node.js with Typescript
	It'll be easy to share types with the frontend to catch simple errors at runtime.

	Jest is the most popular testing framework. I'll use this as well as modular code to especially make sure the "Bussniess Logic" is done right the first time.

 - Database 
 	> Postgres with Prisma. 
	Prisma does the heavy lifting and is especially good for a time sensitive task like this.

- Framework
	> Express.
	If I had more time I'd pick Nest, but I've often spent longer than I want to admit debugging issues in my nest projects for the little value the framework offers.
 
- UI
	> React with Typescript
	Using a component library like [MatUI](https://mui.com/) will do most of the heavy lifting.

	Cypress can test native react components as well as be an end-to-end testing suite. Integration tests are where you get the most bang for your buck on the frontend. 

