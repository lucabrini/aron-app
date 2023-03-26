import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';
import { PocketCollections } from './config';

export const pb = new PocketBase('https://aron-app.pockethost.io');

export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    console.log("authStore changed", auth);
    currentUser.set(pb.authStore.model);
})


export async function getStudentInfo(studentId: string):
    Promise<App.StudentDTO & App.ExpandInstrument> {
    return await pb.collection(PocketCollections.students)
        .getOne<App.StudentDTO & App.ExpandInstrument>(studentId, { expand: "instrument" });
}

export async function getStudentLessons(studentId: string):
    Promise<App.LessonDTO[]> {
    return (await pb.collection(PocketCollections.lessons)
        .getFullList<App.LessonDTO>({
            sort: "date",
            filter: "student=\"" + studentId + "\""
        })).reverse();
}

export async function addLesson(body: App.LessonDTO) {
    return await pb.collection('lessons').create(body);
}