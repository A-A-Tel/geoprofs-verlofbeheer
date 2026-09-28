<?php

namespace App;

enum RoleLevel
{
    case Employee;
    case Manager;
    case DepartmentManager;
    case OfficeManager;
    case Administrator;
}
