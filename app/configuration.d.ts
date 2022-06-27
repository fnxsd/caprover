#!/usr/bin/env node
import { default as chalk } from "chalk";
import * as path from "path";
import * as fs from "fs-extra";
export { path, fs, chalk };
export declare const PUBLIC = "public";
export declare const pathOfPublic: string;
export declare const pathOfVersion: string;
export declare const pathOfApps: string;
export declare const pathOfLogos: string;
export interface Instructions {
    start?: string;
    end?: string;
}
export interface Variable {
    id?: string;
    label?: string;
    defaultValue?: string;
    description?: string;
    validRegex?: string;
}
export interface CaproverOneClickApp {
    instructions?: Instructions;
    displayName?: string;
    isOfficial?: boolean;
    description?: string;
    variables?: Variable[];
    baseUrl?: string;
    documentation?: string;
}
export interface CapAppnameCaproverExtra {
    containerHttpPort?: string | number;
    notExposeAsWebApp?: boolean | string;
}
export interface Environment {
    [key: string]: string | number | boolean;
}
export declare type CaproverItem = any;
export interface CapAppnameClientClass {
    tty?: CaproverItem;
    stdin_open?: CaproverItem;
    image: string;
    restart?: CaproverItem;
    environment?: Environment;
    depends_on?: string[];
    volumes?: string[];
    caproverExtra?: CapAppnameCaproverExtra;
    command?: CaproverItem;
    ports?: number[];
    entrypoint?: CaproverItem;
}
export interface Service {
    $$cap_appname: CapAppnameClientClass;
    [key: string]: CapAppnameClientClass;
}
export interface CapApp {
    captainVersion?: number | string;
    services?: Service[];
    caproverOneClickApp?: CaproverOneClickApp;
}
export declare const AppTemplate: (name: string) => {
    captainVersion: string;
    caproverOneClickApp: {
        description: string;
        instructions: {
            start: string;
            end: string;
        };
        variables: {
            id: string;
            description: string;
            defaultValue: string;
            label: string;
        }[];
        displayName: string;
        isOfficial: boolean;
        documentation: string;
    };
    services: {
        $$cap_appname: {
            image: string;
            volumes: string[];
            environment: never[];
            caproverExtra: {
                containerHttpPort: string;
            };
        };
    };
};
