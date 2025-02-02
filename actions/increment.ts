'use server';
import prisma from "@/config/db";


export async function increment() {
    let counter = await prisma.counter.findFirst();
    if (!counter) {
        counter = await prisma.counter.create({
            data: {
                count: 1
            }
        })
    } else {
        counter = await prisma.counter.update({
            where: {
                id: counter.id
            },
            data: {
                count: {
                    increment: 1
                }
            }
        })
    }
    return counter.count;
}




export async function getMessages() {
    return await prisma.message.findMany({
        orderBy: { createdAt: "desc" },
    });
}


export async function addMessage(name: string, email: string, message: string) {
    if (!name || !email || !message) {
        throw new Error("All fields are required.");
    }

    return await prisma.message.create({
        data: { name, email, message },
    });
}
