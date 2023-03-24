import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

export const pb = new PocketBase('https://aron-app.pockethost.io');

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log("authStore changed", auth);
    currentUser.set(pb.authStore.model);
})

export async function getStudentInfo(studentId: string) {
    return await pb.collection("students").getOne(studentId);
}
export interface addLessonBody {
    teacher: string,
    student: string,
    date: string,
    duration: number
}

export async function addLesson(body: addLessonBody) {
    return await pb.collection('lessons').create(body);
}