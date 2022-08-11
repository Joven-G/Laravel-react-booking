<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Client;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ReservationController extends Controller
{
    public function index()
    {
        // no of records per page
        $pagination_no_per_page = env('PAGINATION_NO_PER_PAGE');

        // get clients with rooms reservations
        $reservations_clients_with_rooms = DB::table('reservations')
            ->select('reservations.id', DB::raw('rooms.name as room_name, clients.name as client_name,
            reservations.date, reservations.no_days, reservations.no_persons, ((categories.price * reservations.no_persons) * reservations.no_days) as reservation_price'))
            ->leftJoin('rooms', 'reservations.room_id', '=', 'rooms.id')
            ->leftJoin('clients', 'reservations.client_id', '=', 'clients.id')
            ->leftJoin('categories', 'rooms.category_id', '=', 'categories.id')
            //->get();
            ->paginate($pagination_no_per_page);
        // dump data
        //dd($reservations_clients_with_rooms);

        return Inertia::render('Reservations/Index', ['reservations' => $reservations_clients_with_rooms]);
    }

    public function create()
    {
        $clients = Client::query()->get(['id', 'name'])
            ->map(function ($cl) {
                return [
                    'value' => $cl->id,
                    'label' => $cl->name,
                ];
            })
            ->toArray();

        $rooms = Room::query()->get(['id', 'name'])
            ->map(function ($ro) {
                return [
                    'value' => $ro->id,
                    'label' => $ro->name,
                ];
            })
            ->toArray();

        return Inertia::render('Reservations/Create', ['clients' => $clients, 'rooms' => $rooms]);
    }

    public function store(Request $request)
    {
        // Laravel's dd() function is a helper function, which is used to dump a variable's contents to the browser and prevent the further script execution [dd - dump data].
        //dd($request);

        // format date for validation
        $request['date'] = date('Y-m-d', strtotime($request['date']));
        //dd($request['date']);

        // validate pipe format '|'
        /* */

        $validator = Validator::make($request->all(), [
            'client_id' => 'required|integer|gt:0',
            'room_id' => 'required|integer|gt:0',
            'date' => 'required|date',
            'no_days' => 'required|integer|gt:0',
            'no_persons' => 'required|integer|gt:0',
        ])->validate();
        /* */

        // validate array format ['','']
        /* * /
        Validator::make($request->all(), [
            'client_id' => ['required'],
            'room_id' => ['required'],
            'date' => ['required'],
            'no_days' => ['required'],
            'no_persons' => ['required'],
        ])->validate();
        */

        Reservation::create($request->all());
        return redirect()->route('reservations.index');
    }

    public function edit(Reservation $reservation)
    {
        $clients = Client::query()->get(['id', 'name'])
            ->map(function ($cl) {
                return [
                    'value' => $cl->id,
                    'label' => $cl->name,
                ];
            })
            ->toArray();

        $rooms = Room::query()->get(['id', 'name'])
            ->map(function ($ro) {
                return [
                    'value' => $ro->id,
                    'label' => $ro->name,
                ];
            })
            ->toArray();

        return Inertia::render('Reservations/Edit', [
            'reservation' => $reservation, 'clients' => $clients, 'rooms' => $rooms
        ]);
    }

    public function update($id, Request $request)
    {
        // format date for validation
        $request['date'] = date('Y-m-d', strtotime($request['date']));

        // validate pipe format '|'
        /* */
        $validator = Validator::make($request->all(), [
            'client_id' => 'required|integer|gt:0',
            'room_id' => 'required|integer|gt:0',
            'date' => 'required|date',
            'no_days' => 'required|integer|gt:0',
            'no_persons' => 'required|integer|gt:0',
        ])->validate();
        /* */

        Reservation::find($id)->update($request->all());
        return redirect()->route('reservations.index');
    }

    public function destroy($id)
    {
        Reservation::find($id)->delete();
        return redirect()->route('reservations.index');
    }
}
