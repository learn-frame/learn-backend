// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.5
//   protoc               v5.28.3
// source: proto/cart.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "cart";

export interface Cart {
  id: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetCartRequest {
  userId: number;
}

export interface GetCartResponse {
  cart: Cart | undefined;
}

export interface CreateCartRequest {
  userId: string;
}

export interface UpdateCartRequest {
  userId: string;
  items: CartItem[];
}

export interface CreateCartResponse {
  cart: Cart | undefined;
}

export interface UpdateCartResponse {
  cart: Cart | undefined;
}

export interface DeleteCartRequest {
  userId: number;
}

export interface DeleteCartResponse {
  success: boolean;
}

export const CART_PACKAGE_NAME = "cart";

export interface CartServiceClient {
  getCart(request: GetCartRequest, metadata: Metadata, ...rest: any): Observable<GetCartResponse>;

  createCart(request: CreateCartRequest, metadata: Metadata, ...rest: any): Observable<CreateCartResponse>;

  updateCart(request: UpdateCartRequest, metadata: Metadata, ...rest: any): Observable<UpdateCartResponse>;

  deleteCart(request: DeleteCartRequest, metadata: Metadata, ...rest: any): Observable<DeleteCartResponse>;
}

export interface CartServiceController {
  getCart(
    request: GetCartRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<GetCartResponse> | Observable<GetCartResponse> | GetCartResponse;

  createCart(
    request: CreateCartRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<CreateCartResponse> | Observable<CreateCartResponse> | CreateCartResponse;

  updateCart(
    request: UpdateCartRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<UpdateCartResponse> | Observable<UpdateCartResponse> | UpdateCartResponse;

  deleteCart(
    request: DeleteCartRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<DeleteCartResponse> | Observable<DeleteCartResponse> | DeleteCartResponse;
}

export function CartServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getCart", "createCart", "updateCart", "deleteCart"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CartService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CartService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CART_SERVICE_NAME = "CartService";