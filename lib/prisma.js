import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production"){
    globalThis.prisma = db;
}


// globalThis.prisma : this global variable ensures that the Prisma client instance is 
// resued accross hot reloads during development. Without trhis, each time your appllication

// reloads, a new instnace of the prisma client would be created, potentially leading to connections issues. 