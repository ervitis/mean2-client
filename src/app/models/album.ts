export class Album {
    constructor(
        public _id: string = null,
        public title: string = null,
        public description: string = null,
        public image: string = 'No image',
        public year: number = null,
        public artist: string = null
    ){}
}