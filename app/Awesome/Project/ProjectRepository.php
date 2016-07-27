<?php namespace App\Awesome\Project;

use App\Project;
use App\Awesome\DbRepository;

class ProjectRepository extends DbRepository implements ProjectInterface {

    public $model;
    public function __construct(Project $project)
    {
        $this->model = $project;
    }

    public function index()
    {
        return $this->model->with([
            'todos' => function($query) {
                $query->where('done', '=', '0');
        }])->get();
    }

    public function show($id, $propValue = '')
    {
        return $this->model
            ->where('id', '=', $id)->with('todos')->first();
    }
}