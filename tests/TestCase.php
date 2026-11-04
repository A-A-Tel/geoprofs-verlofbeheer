<?php

namespace Tests;

use Database\Seeders\TestDatabaseSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    protected bool $seed = true;

    protected string $seeder = TestDatabaseSeeder::class;
}
