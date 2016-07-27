<?php

namespace App\Http\Controllers;

use App\Awesome\Project\ProjectInterface as ProjectRepo;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class ProjectController extends Controller
{
    private $projectRepo;

    public function __construct(ProjectRepo $projectRepo)
    {
        $this->projectRepo = $projectRepo;
    }

    public function index()
    {
        return $this->projectRepo->index();
    }

    public function create(TodoRepo $todoRepo)
    {
        //
    }

    public function store(Request $request)
    {
        return $this->projectRepo->store($request->input());
    }

    public function show($id)
    {
        return $this->projectRepo->show($id);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
