// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {

		type Id = string;

		interface InstrumentDTO {
			id : Id,
			name : string,
			emoticon : string
		};
		interface LessonDTO {
			id : Id,
			teacher : Id,
			student : Id,
			date : string,
			duration : number
		};

		interface StudentDTO {
			id : Id,
			name : string,
			phone : string,
			instrument : Id[],
			teacher : Id
		};

		interface TeacherDTO {
			id : Id,
			name : string,
			phone : string,
			instrument : Id[],
			admin : boolean
		};

		interface ExpandInstrument {
			expand : {
				instrument : InstrumentDTO[]
			}
		};

		interface ExpandStudent{
			expand : {
				student : StudentDTO 
			}
		};

		interface ExpandTeacher{
			expand : {
				teacher : TeacherDTO | TeacherDTO[]
			}
		};

	}
}

export {};
