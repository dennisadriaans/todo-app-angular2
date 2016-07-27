<?php

namespace App\Http\Controllers;
use App\Project;

use App\Awesome\Todo\TodoInterface as TodoRepo;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class TodoController extends Controller
{
    private $todoRepo;

    public function __construct(TodoRepo $todoRepo)
    {
        $this->todoRepo = $todoRepo;
    }

    public function index()
    {
        return $this->todoRepo->index();
    }

    public function create(TodoRepo $todoRepo)
    {
        //

        $urls = ['website/url/for/image/image.jpg', 'another/url/image.jpg'];

        foreach ($urls as $url) {
            echo 'a href="http://'.$url.'"> Click </a>';
        }

    }

    public function store(Request $request)
    {
        return $this->todoRepo->store($request->input());
    }

    public function show($id)
    {
        return $this->todoRepo->show($id);
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        return $this->todoRepo->update($request->input(), $id);
    }

    public function destroy($id)
    {
        return $this->todoRepo->delete($id);
    }

    public function test()
    {
        $projects = Project::groupBy('color')->get();
        return $projects->groupBy('color');
    }
}
