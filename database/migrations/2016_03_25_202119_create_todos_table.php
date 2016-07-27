<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTodosTable extends Migration
{
    public function up()
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->integer('project_id')->unsigned();
            $table->integer('done');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::drop('todos');
    }
}
