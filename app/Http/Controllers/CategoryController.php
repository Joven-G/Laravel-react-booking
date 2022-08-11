<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    public function index()
    {
        //$categories = Category::all();
        // no of records per page
        $pagination_no_per_page = env('PAGINATION_NO_PER_PAGE');

        // get categories of rooms
        $categories = DB::table('categories')
            ->paginate($pagination_no_per_page);

        return Inertia::render('Categories/Index', ['categories' => $categories]);
    }

    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request)
    {
        // validate pipe '|' format
        /* */
        $this->validate($request, [
            'name' => 'required|min:2|max:150',
            'price' => 'required|integer|gt:0'
        ]);
        /*/

        // validate array ['',''] format
        /* *
        Validator::make($request->all(), [
            'name' => ['required', 'min:2', 'max:150'],
            'price' => ['required', 'integer', 'gt:0'],
        ])->validate();
        /* */

        Category::create($request->all());
        return redirect()->route('categories.index');
    }

    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    public function update($id, Request $request)
    {
        // validate pipe format '|'
        /* */
        $this->validate($request, [
            'name' => 'required|min:2|max:150',
            'price' => 'required|integer|gt:0'
        ]);
        /*/

        // validate array format ['','']
        /* *
        Validator::make($request->all(), [
            'name' => ['required', 'min:2', 'max:150'],
            'price' => ['required', 'integer', 'gt:0'],
        ])->validate();
        /* */

        Category::find($id)->update($request->all());
        return redirect()->route('categories.index');
    }

    public function destroy($id)
    {
        Category::find($id)->delete();
        return redirect()->route('categories.index');
    }
}
