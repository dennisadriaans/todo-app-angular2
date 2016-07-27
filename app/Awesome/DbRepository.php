<?php namespace App\Awesome;

use DB;

abstract class DbRepository {

    public function index()
    {
        return $this->model->all();
    }

    public function show($id)
    {
        return $this->model->find($id);
    }

    public function store($request)
    {
        $newModelInstance = $this->model->create($request['data']);
        return $newModelInstance;
    }

    public function update($request, $id)
    {
        $this->model->find($id)->update($request['todo']);
        return $request['todo'];
    }

    public function delete($id)
    {
        return $this->model->destroy($id);
    }
}