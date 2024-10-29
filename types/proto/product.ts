// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.5
//   protoc               v5.28.3
// source: proto/product.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

export interface Product {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  inventoryQuantity: number;
  createdAt: string;
  updatedAt: string;
}

/** 商品服务的请求和响应 */
export interface CreateProductRequest {
  name: string;
  description: string;
  unitPrice: number;
  inventoryQuantity: number;
}

export interface CreateProductResponse {
  product: Product | undefined;
}

export interface GetProductRequest {
  id: string;
}

export interface GetProductResponse {
  product: Product | undefined;
}

export interface UpdateProductRequest {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  inventoryQuantity: number;
}

export interface UpdateProductResponse {
  product: Product | undefined;
}

export interface DeleteProductRequest {
  id: string;
}

export interface DeleteProductResponse {
  success: boolean;
}

export const PRODUCT_PACKAGE_NAME = "product";

export interface ProductServiceClient {
  createProduct(request: CreateProductRequest, metadata: Metadata, ...rest: any): Observable<CreateProductResponse>;

  getProduct(request: GetProductRequest, metadata: Metadata, ...rest: any): Observable<GetProductResponse>;

  updateProduct(request: UpdateProductRequest, metadata: Metadata, ...rest: any): Observable<UpdateProductResponse>;

  deleteProduct(request: DeleteProductRequest, metadata: Metadata, ...rest: any): Observable<DeleteProductResponse>;
}

export interface ProductServiceController {
  createProduct(
    request: CreateProductRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<CreateProductResponse> | Observable<CreateProductResponse> | CreateProductResponse;

  getProduct(
    request: GetProductRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<GetProductResponse> | Observable<GetProductResponse> | GetProductResponse;

  updateProduct(
    request: UpdateProductRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<UpdateProductResponse> | Observable<UpdateProductResponse> | UpdateProductResponse;

  deleteProduct(
    request: DeleteProductRequest,
    metadata: Metadata,
    ...rest: any
  ): Promise<DeleteProductResponse> | Observable<DeleteProductResponse> | DeleteProductResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createProduct", "getProduct", "updateProduct", "deleteProduct"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
