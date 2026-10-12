<?php

use App\LeaveStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leaves', function (Blueprint $table) {
            $table->id();
            $table->foreignId('requester_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('supervisor_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('manager_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('type_id')->constrained('leave_types')->cascadeOnDelete();
            $table->date('start_on');
            $table->date('end_on')->nullable();
            $table->string('reason', 1024);
            $table->tinyInteger('status')->default(LeaveStatus::created);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leaves');
    }
};
