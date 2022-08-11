<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    public function index()
    {
        // no of records per page
        $pagination_no_per_page = env('PAGINATION_NO_PER_PAGE');

        // get all data from room model, Rooms  db table
        //$rooms = Room::all();
        //return Inertia::render('Rooms/Index', ['rooms' => $rooms]);

        //$rooms = DB::table('rooms')->get();
        /*
        foreach ($rooms as $room) {
            echo $room->name . " ";
        } */

        // get each room with their category
        $rooms_with_categories = DB::table('rooms')
            ->select('rooms.id', DB::raw('rooms.name, is_view, floor, no_places, categories.name as category_name'))
            ->leftJoin('categories', 'rooms.category_id', '=', 'categories.id')
            //->get();
            ->paginate($pagination_no_per_page);

        /*
        foreach ($rooms_with_categories as $room_category) {
            echo $room_category->category_name . " ";
        }
         */
        //print_r($rooms_and_categories);

        return Inertia::render('Rooms/Index', ['rooms' => $rooms_with_categories]);
    }

    public function create()
    {
        //$categories = Category::all("id", "name");
        //$categories = Category::all()->map->only(['id', 'name']);

        $categories = Category::query()->get(['id', 'name'])
            ->map(function ($cat) {
                return [
                    'value' => $cat->id,
                    'label' => $cat->name,
                ];
            })
            ->toArray();

        return Inertia::render('Rooms/Create', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        // save data from create form, create route

        // validate pipe format '|'
        /* */
        $this->validate($request, [
            'name' => 'required|min:2|max:150',
            'floor' => 'required|integer|gt:0',
            'no_places' => 'required|integer|gt:0',
            'category_id' => 'required',
            'note' => 'required|max:255'
        ]);
        /* */

        // validate pipe format '|'
        /* *
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:2|max:150',
            'floor' => 'required|integer|gt:0',
            'no_places' => 'required|integer|gt:0',
            'category_id' => 'required|integer',
            'note' => 'required|max:255'
        ])->validate();
        /* */

        // validate array format ['','']
        /* *

        Validator::make($request->all(), [
            'name' => ['required'],
            'floor' => ['required'],
            'no_places' => ['required'],
            'category_id' => ['required'],
            'note' => ['required'],
        ])->validate();
        /* */

        Room::create($request->all());
        return redirect()->route('rooms.index');
    }

    public function edit(Room $room)
    {
        $categories = Category::query()->get(['id', 'name'])
            ->map(function ($cat) {
                return [
                    'value' => $cat->id,
                    'label' => $cat->name,
                ];
            })
            ->toArray();

        return Inertia::render('Rooms/Edit', ['room' => $room, 'categories' => $categories]);
    }

    public function update($id, Request $request)
    {
        // validate pipe format '|'
        /* */
        $this->validate($request, [
            'name' => 'required|min:2|max:150',
            'is_view' => 'required|integer',
            'floor' => 'required|integer|gt:0',
            'no_places' => 'required|integer|gt:0',
            'category_id' => 'required',
            'note' => 'required|max:255'
        ]);

        Room::find($id)->update($request->all());
        return redirect()->route('rooms.index');
    }

    public function destroy($id)
    {
        Room::find($id)->delete();
        return redirect()->route('rooms.index');
    }
}
