<?php

namespace App;

enum LeaveStatus: int
{
    case created = 0;
    case forwarded = 1;
    case accepted = 2;
    case declined = 3;
}
