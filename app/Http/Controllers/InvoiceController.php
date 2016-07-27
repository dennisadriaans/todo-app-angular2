<?php

namespace App\Http\Controllers;

use App\Awesome\Invoice\InvoiceInterface as InvoiceRepo;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

class InvoiceController extends Controller
{
    private $invoiceRepo;

    public function __construct(InvoiceRepo $invoiceRepo)
    {
        $this->invoiceRepo = $invoiceRepo;
    }

    public function index()
    {
        return $this->invoiceRepo->index();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {

        $this->invoiceRepo->generatePDF($request->input());
        return $this->invoiceRepo->store($request->input());
    }

    public function show($id)
    {
        //
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

    public function testPdf()
    {
        $data = [123];
        $pdf = \PDF::loadView('invoice_generator.invoice', $data);
        $pdf->save(public_path().'/my_stored_file.pdf');
    }

    public function testPdfView()
    {
        return View('invoice_generator.invoice');
    }
}
