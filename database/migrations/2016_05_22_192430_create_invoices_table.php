<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInvoicesTable extends Migration
{
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->integer('project_id');
            $table->integer('client_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('invoices');
    }
}
