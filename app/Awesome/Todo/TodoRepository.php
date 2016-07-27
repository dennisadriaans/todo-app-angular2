<?php namespace App\Awesome\Todo;

use App\Project;
use App\Todo;
use App\Awesome\DbRepository;

class TodoRepository extends DbRepository implements TodoInterface {

    public $model;

    public function __construct(Todo $todo)
    {
        $this->model = $todo;
    }

}