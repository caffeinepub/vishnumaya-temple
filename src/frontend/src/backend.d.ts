import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Notification {
    id: bigint;
    message: string;
    timestamp: Time;
}
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
export interface User {
    name: string;
    phoneNumber: string;
    registeredAt: Time;
}
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
export interface Token {
    tokenNumber: bigint;
    name: string;
    phoneNumber: string;
    bookedAt: Time;
}
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getAllPoojas(): Promise<Array<Pooja>>;
    getNotifications(): Promise<Array<Notification>>;
    getOptedInUsers(): Promise<Array<string>>;
    getUser(phoneNumber: string): Promise<User | null>;
    getUserNotificationPreference(phoneNumber: string): Promise<boolean>;
    isRegistered(phoneNumber: string): Promise<boolean>;
    publishNotification(message: string, adminPassword: string): Promise<boolean>;
    requestOTP(phoneNumber: string, name: string): Promise<string>;
    setNotificationPreference(phoneNumber: string, enabled: boolean): Promise<void>;
    submitBooking(devoteeName: string, phoneNumber: string, poojaId: bigint, preferredDate: string): Promise<bigint>;
    updateBookingStatus(bookingId: bigint, newStatus: string): Promise<void>;
    verifyOTP(phoneNumber: string, otp: string): Promise<boolean>;
    bookToken(name: string, phoneNumber: string): Promise<bigint>;
    getAllTokens(): Promise<Array<Token>>;
    getTokenByPhone(phoneNumber: string): Promise<Token | null>;
}
