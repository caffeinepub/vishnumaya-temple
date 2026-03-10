import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    status: string;
    bookingId: bigint;
    preferredDate: string;
    createdTimestamp: Time;
    poojaId: bigint;
    phoneNumber: string;
    devoteeName: string;
}
export type Time = bigint;
export interface Pooja {
    fee: bigint;
    descriptionEnglish: string;
    timing: string;
    descriptionMalayalam: string;
    nameEnglish: string;
    availableDays: Array<string>;
    poojaId: bigint;
    nameMalayalam: string;
}
export interface User {
    phoneNumber: string;
    name: string;
    registeredAt: Time;
}
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getAllPoojas(): Promise<Array<Pooja>>;
    submitBooking(devoteeName: string, phoneNumber: string, poojaId: bigint, preferredDate: string): Promise<bigint>;
    updateBookingStatus(bookingId: bigint, newStatus: string): Promise<void>;
    requestOTP(phoneNumber: string, name: string): Promise<string>;
    verifyOTP(phoneNumber: string, otp: string): Promise<boolean>;
    isRegistered(phoneNumber: string): Promise<boolean>;
    getUser(phoneNumber: string): Promise<Option<User>>;
}
