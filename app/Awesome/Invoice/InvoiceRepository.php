<?php namespace App\Awesome\Invoice;

use App\Invoice;
use App\Awesome\DbRepository;
use App\Todo;
use App\Project;

class InvoiceRepository extends DbRepository implements InvoiceInterface {

    public $model;

    public function __construct(Invoice $invoice)
    {
        $this->model = $invoice;
    }

    public function index()
    {
        return $this->model->with('client')
            ->with('todos')
            ->get();
    }

    public function store($request)
    {

        $projectId = $request['data'][0]['project_id'];
        $project = Project::find($projectId);

        $newInvoice = new Invoice();
        $newInvoice->client_id = $project->client_id;
        $newInvoice->save();

        foreach($request['data'] as $todo) {
            $todo = Todo::find($todo['id']);
            $todo->invoiced = $newInvoice->id;
            $todo->save();
        }
        return $request['data'];
    }

    public function generatePDF($data)
    {
        $project = Project::where('id', '=', $data['data'][0]['project_id'])->with('client')->first();

        $data = [
            'todos' => $data['data'],
            'project' => $project
        ];

        $pdf = \PDF::loadView('invoice_generator.invoice',compact('data'))->save(public_path().'/my_stored_file.pdf');
        return $pdf;
    }
}