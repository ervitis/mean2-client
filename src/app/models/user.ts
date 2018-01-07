export class User {
    constructor(
        public _id: string = null,
        public name: string = null,
        public surname: string = null,
        public email: string = null,
        public password: string = null,
        public rol: string = 'ROLE_USER',
        public image: string = 'No image'
    ){}
}
