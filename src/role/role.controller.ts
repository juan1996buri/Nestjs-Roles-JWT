import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller()
export class RoleControllador {
  constructor(private roleService: RoleService) {}
}
