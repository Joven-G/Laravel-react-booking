<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    public function index()
    {
        // no of records per page
        $pagination_no_per_page = env('PAGINATION_NO_PER_PAGE');

        // $clients = Client::all();
        $clients = DB::table('clients')
            ->paginate($pagination_no_per_page);

        return Inertia::render('Clients/Index', ['clients' => $clients]);
    }

    public function create()
    {
        return Inertia::render('Clients/Create');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:5|max:150',
            'identification' => 'required|integer|gt:0',
            'address' => 'required|max:255',
            'telephone' => 'required|numeric',
            'email' => 'required|email'
        ]);
        /* */

        Client::create($request->all());
        return redirect()->route('clients.index');
    }

    public function edit(Client $client)
    {
        return Inertia::render('Clients/Edit', [
            'client' => $client
        ]);
    }

    public function update($id, Request $request)
    {
        $this->validate($request, [
            'name' => 'required|min:5|max:150',
            'identification' => 'required|integer|gt:0',
            'address' => 'required|max:255',
            'telephone' => 'required|numeric',
            'email' => 'required|email'
        ]);

        Client::find($id)->update($request->all());
        return redirect()->route('clients.index');
    }

    public function destroy($id)
    {
        Client::find($id)->delete();
        return redirect()->route('clients.index');
    }
}
