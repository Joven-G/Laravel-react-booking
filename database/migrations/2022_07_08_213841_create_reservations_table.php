<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            // if your table name does not match the convention, you may specify the table name by passing it as an argument to the constrained method
            //$table->foreignId('client_id')->constrained('clients')->onDelete('cascade');
            $table->foreignId('room_id')->constrained()->onDelete('cascade');
            //$table->foreignId('room_id')->constrained('rooms')->onDelete('cascade');
            $table->date('date');
            $table->integer('no_days');
            $table->integer('no_persons');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};
