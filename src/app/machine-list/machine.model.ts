export interface Machine{
    name: string;
    status: Status;
    time?: Date;
    type: MachineType
}

export enum MachineType{
    w = 'Washing machine',
    d = 'Tumble dryer'
}
export enum Status{
    o = 'Occupied',
    f = 'Free'
}