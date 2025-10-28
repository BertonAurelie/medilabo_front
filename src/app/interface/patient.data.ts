export interface Patient {
    id: string;
    lastName: string;
    firstName: string;
    birthday: string;
    age?: number;
    gender: string;
    address: string;
    phoneNumber: string; 
    isEditable: boolean;
}
