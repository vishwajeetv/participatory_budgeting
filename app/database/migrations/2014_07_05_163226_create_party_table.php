<?php

use Illuminate\Database\Migrations\Migration;

class CreatePartyTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('party', function($table) {
            $table->increments('party_id');
            $table->string('party_address', 255)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('party');
    }

}