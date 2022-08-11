import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import { Head, usePage, Link } from "@inertiajs/inertia-react";
import Pagination from "@/Components/Pagination";

export default function Rooms(props) {
    const { rooms } = usePage().props;

    function destroy(e) {
        if (confirm("Are you sure you want to delete this room?")) {
            Inertia.delete(route("rooms.destroy", e.currentTarget.id));
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Rooms
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
                                    className="px-6 py-2 text-white bg-green-500 rounded-md focus:outline-none"
                                    href={route("rooms.create")}
                                >
                                    Create room
                                </Link>
                            </div>

                            <table className="table-fixed w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-2">No.</th>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2 w-20">
                                            Is view
                                        </th>
                                        <th className="px-4 py-2">Floor</th>
                                        <th className="px-4 py-2">No places</th>
                                        <th className="px-4 py-2">Category</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {rooms.data.map(
                                        ({
                                            id,
                                            name,
                                            is_view,
                                            floor,
                                            no_places,
                                            category_name,
                                            note,
                                        }) => (
                                            <tr>
                                                <td className="border px-4 py-2 text-right">
                                                    {id}
                                                </td>
                                                <td className="border px-4 py-2 text-right">
                                                    {name}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {is_view ? "Yes" : "No"}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {floor}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    {no_places}
                                                </td>
                                                <td className="border px-4 py-2 text-right">
                                                    {category_name}
                                                </td>
                                                <td className="border px-4 py-2 text-center">
                                                    <Link
                                                        tabIndex="1"
                                                        className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
                                                        href={route(
                                                            "rooms.edit",
                                                            id
                                                        )}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={destroy}
                                                        id={id}
                                                        tabIndex="-1"
                                                        type="button"
                                                        className="mx-1 px-4 py-2 text-sm text-white bg-red-500 rounded"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    )}

                                    {rooms.length === 0 && (
                                        <tr>
                                            <td
                                                className="px-6 py-4 border-t"
                                                colSpan="4"
                                            >
                                                No rooms found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <Pagination class="mt-6" links={rooms.links} />
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
