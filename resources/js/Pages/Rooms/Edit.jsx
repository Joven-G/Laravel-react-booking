import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head, useForm, usePage, Link } from "@inertiajs/inertia-react";

import Select from "react-select";

export default function Rooms(props) {
    const { room } = usePage().props;

    const { data, setData, put, errors } = useForm({
        name: room.name || "",
        is_view: room.is_view || 0,
        floor: room.floor || "",
        no_places: room.no_places || "",
        category_id: room.category_id || "",
        note: room.note || "",
    });

    // react-select with react hooks
    const [selectedOption, setSelectedOption] = useState(null);

    // serch in categories by category_id and return object item for react-select
    const categorySearch = (options, value, tempObj = {}) => {
        if (options && value != null) {
            options.find((node) => {
                if (node.value === value) {
                    tempObj.found = node;
                    return node;
                }
                return categorySearch(node.options, value, tempObj);
            });
            if (tempObj.found) {
                return tempObj.found;
            }
        }
        return undefined;
    };

    // set selected value from react-select to data.category_id on form data object that will be sent to Laravel
    if (selectedOption !== null) {
        data.category_id = selectedOption.value;
    }

    //alert(JSON.stringify(data.category_id));
    //alert(JSON.stringify(categorySearch(props.categories, data.category_id)));

    function handleSubmit(e) {
        e.preventDefault();

        put(route("rooms.update", room.id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit room
                </h2>
            }
        >
            <Head title="Rooms" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("rooms.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Is view </label>

                                        <input
                                            type="checkbox"
                                            className="py-2"
                                            label="Is view"
                                            name="is_view"
                                            selectedvalue={data.is_view}
                                            onChange={(e) =>
                                                setData(
                                                    "is_view",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.is_view}
                                        </span>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">Floor</label>

                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Floor"
                                            name="floor"
                                            errors={errors.floor}
                                            value={data.floor}
                                            onChange={(e) =>
                                                setData("floor", e.target.value)
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.floor}
                                        </span>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">No places</label>

                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="No places"
                                            name="floor"
                                            errors={errors.no_places}
                                            value={data.no_places}
                                            onChange={(e) =>
                                                setData(
                                                    "no_places",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.no_places}
                                        </span>
                                    </div>

                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label className="">
                                                    Category
                                                </label>
                                            </div>
                                            <div className="col-md-6">
                                                <Select
                                                    options={props.categories}
                                                    defaultValue={
                                                        selectedOption
                                                    }
                                                    // dynamic search set value
                                                    value={categorySearch(
                                                        props.categories,
                                                        data.category_id
                                                    )}
                                                    /* // manual set value
                                                    value={{
                                                        label: "Some value",
                                                        value: 1,
                                                    }}
                                                    */
                                                    onChange={setSelectedOption}
                                                    //placeholder="Choose option..."
                                                    label="Category"
                                                    name="category_id"
                                                    errors={errors.category_id}
                                                />
                                                <span className="text-red-600">
                                                    {errors.category_id}
                                                </span>
                                            </div>
                                            <div className="col-md-4"></div>
                                        </div>
                                    </div>

                                    <div className="mb-0">
                                        <label className="">Note</label>

                                        <textarea
                                            type="text"
                                            className="w-full rounded"
                                            label="Note"
                                            name="note"
                                            errors={errors.note}
                                            value={data.note}
                                            onChange={(e) =>
                                                setData("note", e.target.value)
                                            }
                                        />

                                        <span className="text-red-600">
                                            {errors.note}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
