import { Metadata } from '@grpc/grpc-js'
import { Controller, Logger } from '@nestjs/common'
import { Observable } from 'rxjs'
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  GetUserRequest,
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserServiceController
} from 'types/proto/user'
import { UserService } from './user.service'

@Controller()
export class UserController implements UserServiceController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger
  ) {}
  createUser(
    request: CreateUserRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ):
    | Promise<CreateUserResponse>
    | Observable<CreateUserResponse>
    | CreateUserResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }
  getUser(
    request: GetUserRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ): Promise<GetUserResponse> | Observable<GetUserResponse> | GetUserResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }
  updateUser(
    request: UpdateUserRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ):
    | Promise<UpdateUserResponse>
    | Observable<UpdateUserResponse>
    | UpdateUserResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }
  deleteUser(
    request: DeleteUserRequest,
    metadata: Metadata,
    ...rest: unknown[]
  ):
    | Promise<DeleteUserResponse>
    | Observable<DeleteUserResponse>
    | DeleteUserResponse {
    console.log(request, metadata, rest)
    throw new Error('Method not implemented.')
  }
}
