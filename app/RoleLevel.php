<?php

namespace App;

enum RoleLevel: int
{
    case Employee = 1;
    case Manager = 2;
    case DepartmentManager = 3;
    case OfficeManager = 4;
    case Administrator = 5;
}
