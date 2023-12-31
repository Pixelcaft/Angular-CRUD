export class User {
    public id?: string;
    public firstname!: string;
    public infix?: string;
    public lastname!: string;
    public streetname!: string;
    public housenumber!: number;
    public addition?: string;
    public residence!: string;
    public postalcode!: string;

    constructor(obj: any) {        
        this.id = obj.id;
        this.firstname = obj.firstname;
        this.infix = obj.infix;
        this.lastname = obj.lastname;
        this.streetname = obj.streetname;
        this.housenumber = obj.housenumber;
        this.addition = obj.addition;
        this.residence = obj.residence;
        this.postalcode = obj.postalcode;
    }

    public get fullName(): string {
        if (this.infix) {
            return `${this.firstname} ${this.infix} ${this.lastname}`
        } else {
            return `${this.firstname} ${this.lastname}`
        }
    }

    public get addressLine(): string {
        if (this.addition) {
            return `${this.streetname} ${this.housenumber} ${this.addition}`
        } else {
            return `${this.streetname} ${this.housenumber}`
        }
    }

    public get location(): string {
        return `${this.postalcode} ${this.residence}`
    }
}