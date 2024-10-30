// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.5
//   protoc               v5.28.3
// source: proto/user.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export enum Gender {
  MALE = 0,
  FEMALE = 1,
  UNRECOGNIZED = -1,
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatarUrl: string;
  profile: string;
  location: string;
  website: string;
  birthDate: string;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  avatarUrl?: string | undefined;
  profile?: string | undefined;
  location?: string | undefined;
  website?: string | undefined;
  birthDate?: string | undefined;
  gender: Gender;
}

export interface CreateUserResponse {
  user: User | undefined;
}

export interface GetUserRequest {
  id: string;
}

export interface GetUserResponse {
  user: User | undefined;
}

export interface UpdateUserRequest {
  id: string;
  username?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  password?: string | undefined;
  avatarUrl?: string | undefined;
  profile?: string | undefined;
  location?: string | undefined;
  website?: string | undefined;
  birthDate?: string | undefined;
  gender?: Gender | undefined;
}

export interface UpdateUserResponse {
  user: User | undefined;
}

export interface DeleteUserRequest {
  id: string;
}

export interface DeleteUserResponse {
  success: boolean;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  createUser(request: CreateUserRequest, metadata: Metadata, ...rest: any): Observable<CreateUserResponse>;

  getUser(request: GetUserRequest, metadata: Metadata, ...rest: any): Observable<GetUserResponse>;

  updateUser(request: UpdateUserRequest, metadata: Metadata, ...rest: any): Observable<UpdateUserResponse>;

  deleteUser(request: DeleteUserRequest, metadata: Metadata, ...rest: any): Observable<DeleteUserResponse>;
}

export interface UserServiceController {
  createUser(
    request: CreateUserRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<CreateUserResponse> | Observable<CreateUserResponse> | CreateUserResponse;

  getUser(
    request: GetUserRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse;

  updateUser(
    request: UpdateUserRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<UpdateUserResponse> | Observable<UpdateUserResponse> | UpdateUserResponse;

  deleteUser(
    request: DeleteUserRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<DeleteUserResponse> | Observable<DeleteUserResponse> | DeleteUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "getUser", "updateUser", "deleteUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";